"use client";

import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";

import { IconCheck, IconCircleFilled } from "@tabler/icons-react";

export function CommandLabel({ label = [], setLabel, setOpen, labels = [] }) {
  const handleSelect = (val) => {
    const isSelected = label.some((item) => item.labelId === val.labelId);

    if (isSelected) {
      // Remove label
      setLabel(label.filter((item) => item.labelId !== val.labelId));
    } else {
      // Add label
      setLabel([...label, val]);
    }
  };

  return (
    <Command className="px-1 py-1 pt-2">
      <CommandInput placeholder="Set Label" />

      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup>
          {labels.map((item) => {
            const isSelected = label.some((i) => i.labelId === item.id);
            return (
              <CommandItem
                key={item.id}
                value={item.id}
                onSelect={() =>
                  handleSelect({
                    labelId: item.id,
                    name: item.name,
                    color: item.color,
                    // count: item.count,
                  })
                }
                className="gap-2 text-sm"
              >
                <IconCircleFilled color={item.color} className="size-5" />

                <span>{item.name}</span>

                <CommandShortcut className="flex gap-2">
                  {isSelected && <IconCheck />}

                  {/* <span>{item.count}</span> */}
                </CommandShortcut>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
