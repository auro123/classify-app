import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { nanoid } from "nanoid";
import ws from "ws";

import { PrismaClient } from "@/lib/generated/prisma/client";

// @neondatabase/serverless only has native WebSocket support on Node 22+;
// this polyfill keeps it working on older Node runtimes too.
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const adapter = new PrismaNeon({ connectionString });

function createPrismaClient() {
  return new PrismaClient({ adapter }).$extends({
    query: {
      $allModels: {
        create({ args, query }) {
          args.data = { id: nanoid(), ...args.data };
          return query(args);
        },
        createMany({ args, query }) {
          const records = Array.isArray(args.data) ? args.data : [args.data];
          args.data = records.map((record) => ({
            id: nanoid(),
            ...record,
          })) as typeof args.data;
          return query(args);
        },
      },
    },
  });
}

declare global {
  var prismaGlobal: ReturnType<typeof createPrismaClient> | undefined;
}

const prisma = globalThis.prismaGlobal ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
