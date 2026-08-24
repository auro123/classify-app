<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project notes for agents working on classify-app

Next.js **16.3.2** (App Router, Turbopack), React 19.2.8, Prisma **7.9.1** with the Neon
serverless adapter, TypeScript, Tailwind v4 + shadcn/ui. These are notes from things that
actually broke while building this app, not general Next.js documentation — read
`node_modules/next/dist/docs/` for that, per the block above.

## Server Actions ("use server" files)

- A file with `"use server"` at the top may only export **async functions** at runtime. You
  can still `export type` / `export interface` from the same file (erased at compile time,
  so it doesn't count), but no other value exports — no constants, no synchronous helpers.
- Background work kicked off from a Server Action **without `await`ing it** does not
  reliably survive past the point the action returns. On Vercel, the serverless function
  backing the request is frozen/torn down as soon as the response is sent — a bare
  `void (async () => { ... })()` can get cut off mid-flight, silently leaving whatever it
  was updating (e.g. a DB row) stuck in a "processing" state forever. This does **not**
  reproduce locally with `next dev`, since the dev server is a long-running process — it
  only shows up once deployed.
  - Fix: wrap the background callback in `after()` from `"next/server"` (stable since
    Next 15.1) instead of firing it bare. `after()` tells the platform to keep the
    invocation alive until the callback settles. If `after()` isn't available/working for
    some reason, `waitUntil()` from `@vercel/functions` is the lower-level primitive it's
    built on.
  - Every `after()` callback that updates a DB row on failure should itself be wrapped in a
    nested try/catch. Nothing awaits the callback, so if the "mark this failed" update
    itself throws (e.g. a transient DB blip), that's an unhandled rejection — and on some
    Node versions an unhandled rejection kills the whole process, taking down every other
    in-flight background task with it. Catch and `console.error` instead of letting that
    propagate.
- Adding a new dynamic route (e.g. `app/compare/[groupId]/page.tsx`) requires running
  `npx next typegen` before `PageProps<"/compare/[groupId]">` resolves — otherwise `tsc`
  fails with a type error even though the route works fine at runtime.

## pdf-parse (v2)

- Requires `serverExternalPackages: ["pdf-parse"]` in `next.config.ts`, **and**
  `await import("pdf-parse/worker")` dynamically before `await import("pdf-parse")`,
  inside whatever server function actually parses a PDF. Skipping either one produces a
  Turbopack SSR bundling error at runtime ("Setting up fake worker failed: Cannot find
  module pdf.worker.mjs"), not a build-time failure.
- The API is `new PDFParse({ data: buffer })` → `await parser.getText()` → `{ text }` →
  `await parser.destroy()`. This is a full rewrite from pdf-parse v1 — don't trust v1
  usage examples.

## Prisma 7 + Neon adapter

- `schema.prisma`'s `datasource` block no longer accepts `url`/`directUrl`. Connection
  strings for Migrate now live in `prisma.config.ts` (`defineConfig({ datasource: { url:
  env("DATABASE_URL") } })`), which needs its own `import "dotenv/config"` since the
  Prisma CLI reads `.env`, **not** `.env.local` (Next.js reads `.env.local` at runtime —
  keep `DATABASE_URL` in both files).
- The `generator client` block needs `provider = "prisma-client"` (not the old
  `prisma-client-js`) plus an explicit `output` path. The generator emits raw `.ts` source
  under that path, not a compiled package — import from `<output>/client`, e.g.
  `@/lib/generated/prisma/client`, not the bare output directory (there's no index barrel).
- IDs are nanoid, not the schema default. This is done via a Prisma Client Extension in
  `lib/prisma.ts` (`$extends({ query: { $allModels: { create, createMany } } })`) that
  injects `id: nanoid()` before every create. The `@default(uuid())` left on `id` in the
  schema is a type-level placeholder only, so generated `CreateInput` types treat `id` as
  optional — it's never actually reached at runtime.
- A nullable `Json?` field is **not** optional on `.create()` the way other nullable
  scalars are — omitting it throws `PrismaClientValidationError: Argument result is
  missing`. You must pass `Prisma.JsonNull` explicitly when you want it to start out null
  (see `Analysis.result` for comparison rows/batch rows created before their analysis
  finishes).
- After editing `schema.prisma` and running `prisma migrate dev`, also run
  `npx prisma generate` explicitly before restarting `next dev` — otherwise the already-running
  dev server can keep the previously-generated client loaded and you'll see confusing
  "Argument X is missing" errors for fields that clearly exist in the schema.

## Other things that bit us

- `toLocaleDateString(undefined, {...})` inside a Client Component that's also
  server-rendered (anything not marked `"use client"`-only) can format differently between
  the Node server locale and the browser's locale, producing a hydration mismatch even
  with identical `Intl` options. Pin an explicit locale (e.g. `"en-US"`) instead of
  `undefined` wherever a formatted date is rendered by a hydrated Client Component.
- Turbopack on Windows has occasionally panicked outright after long dev-server uptime
  across many hot reloads ("Jest worker encountered N child process exceptions" or a fatal
  "node process exited... exit code: 0xc0000142" when spawning a worker for
  `globals.css`). Not caused by application code — killing the dev server, deleting
  `.next`, and restarting has resolved it every time it happened.
- `git config` should never be run by an agent unprompted (see repo-level safety rules) —
  if commits fail with "Author identity unknown", ask the user for the exact
  `git config --global user.name/user.email` values rather than guessing or setting them
  unilaterally.
