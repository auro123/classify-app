"use client";

import { useState } from "react";
import { ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CountryMultiSelectProps {
  countries: readonly string[];
  selected: string[];
  onSelectedChange: (countries: string[]) => void;
  placeholder?: string;
}

export function CountryMultiSelect({
  countries,
  selected,
  onSelectedChange,
  placeholder = "Select countries…",
}: CountryMultiSelectProps) {
  const [open, setOpen] = useState(false);

  function toggleCountry(country: string) {
    if (selected.includes(country)) {
      onSelectedChange(selected.filter((c) => c !== country));
    } else {
      onSelectedChange([...selected, country]);
    }
  }

  function removeCountry(country: string) {
    onSelectedChange(selected.filter((c) => c !== country));
  }

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label={placeholder}
            className="w-full justify-between font-normal"
          >
            <span
              className={cn(
                "truncate",
                selected.length === 0 && "text-muted-foreground"
              )}
            >
              {selected.length === 0
                ? placeholder
                : `${selected.length} countr${selected.length === 1 ? "y" : "ies"} selected`}
            </span>
            <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
          <Command>
            <CommandInput placeholder="Search countries…" />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country}
                    value={country}
                    data-checked={selected.includes(country)}
                    onSelect={() => toggleCountry(country)}
                  >
                    {country}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selected.map((country) => (
            <Badge key={country} variant="secondary" className="gap-1 pr-1">
              {country}
              <button
                type="button"
                onClick={() => removeCountry(country)}
                className="rounded-full p-0.5 hover:bg-foreground/10"
              >
                <X className="size-3" />
                <span className="sr-only">Remove {country}</span>
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
