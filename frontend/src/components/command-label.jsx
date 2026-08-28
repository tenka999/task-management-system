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
  CommandShortcut,
} from "@/components/ui/command";
import {
  IconAlertSquareFilled,
  IconAntennaBars1,
  IconAntennaBars3,
  IconAntennaBars4,
  IconAntennaBars5,
  IconCheck,
  IconCircleFilled,
} from "@tabler/icons-react";

export function CommandLabel({ label, setLabel, setOpen, labels }) {
  // const handleSelect = (id, name, color, count) => {
  //   setLabel({ id, name, color, count });
  // };

  const handleSelect = (val) => {
    if (label.map((item) => item.id).includes(val.id)) {
      console.log(label.filter((item) => item.id !== val.id));
      setLabel(label.filter((item) => item.id !== val.id));
    } else {
      setLabel([...label, val]);
    }
    console.log(label);
  };

  return (
    <Command className="px-1 py-1 pt-2 ">
      <CommandInput placeholder="Set Icon" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {labels.map((item) => (
            <CommandItem
              onSelect={() =>
                handleSelect({
                  id: item.id,
                  name: item.name,
                  color: item.color,
                  count: item.count,
                })
              }
              key={item.id}
              value={item.id}
              className="gap-2 text-sm"
            >
              <IconCircleFilled color={item.color} className="size-5" />
              <span>{item.name}</span>
              <CommandShortcut className="flex gap-2">
                {label.map((i) => i.name).includes(item.name) && <IconCheck />}
                <span>{item.count}</span>
              </CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
