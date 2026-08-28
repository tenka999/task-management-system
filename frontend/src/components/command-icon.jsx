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

export function CommandIcon({ setIcon, setOpen, icons }) {
  const handleSelect = (id, icon, label) => {
    setOpen(false);
    setIcon({ id, icon, label });
  };
  return (
    <Command className="px-1 py-1 pt-2 ">
      <CommandInput placeholder="Set Icon" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {icons.map((item) => (
            <CommandItem
              onSelect={() => handleSelect(item.id, item.icon, item.label)}
              key={item.id}
              value={item.id}
              className="gap-2 text-sm"
            >
              <item.icon className="size-5" />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
