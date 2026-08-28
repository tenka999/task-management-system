"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  IconAlertSquareFilled,
  IconAntennaBars1,
  IconAntennaBars3,
  IconAntennaBars4,
  IconAntennaBars5,
} from "@tabler/icons-react";

export function CommandBasic({ setPriority, setOpen, priorities }) {
  const handleSelect = (id, label) => {
    setOpen(false);
    setPriority({ id, label });
  };
  return (
    <Command className="px-1 py-1 pt-2 ">
      <CommandInput placeholder="Set Priority" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {priorities.map((priority) => (
            <CommandItem
              onSelect={() => handleSelect(priority.id, priority.label)}
              key={priority.id}
              value={priority.id}
              className="gap-2 text-sm"
            >
              <priority.icon className="size-5" />
              <span>{priority.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
