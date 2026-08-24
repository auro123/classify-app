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

export interface CountryOption {
  value: string;
  label: string;
}

interface CountryMultiSelectProps {
  options: CountryOption[];
  selected: string[];
  onSelectedChange: (values: string[]) => void;
  placeholder?: string;
}

export function CountryMultiSelect({
  options,
  selected,
  onSelectedChange,
  placeholder = "Select countries…",
}: CountryMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const labelByValue = new Map(options.map((option) => [option.value, option.label]));

  function toggleCountry(value: string) {
    if (selected.includes(value)) {
      onSelectedChange(selected.filter((v) => v !== value));
    } else {
      onSelectedChange([...selected, value]);
    }
  }

  function removeCountry(value: string) {
    onSelectedChange(selected.filter((v) => v !== value));
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
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    data-checked={selected.includes(option.value)}
                    onSelect={() => toggleCountry(option.value)}
                  >
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selected.map((value) => (
            <Badge key={value} variant="secondary" className="gap-1 pr-1">
              {labelByValue.get(value) ?? value}
              <button
                type="button"
                onClick={() => removeCountry(value)}
                className="rounded-full p-0.5 hover:bg-foreground/10"
              >
                <X className="size-3" />
                <span className="sr-only">Remove {labelByValue.get(value) ?? value}</span>
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
