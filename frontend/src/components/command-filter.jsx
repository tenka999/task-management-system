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

export function CommandFilter() {
  return (
    <Command className="p-0 py-1  ">
      <CommandList>
        <CommandGroup>
          <CommandItem>
            <IconAntennaBars1 className="size-5" />
            Health
          </CommandItem>
          <CommandItem>
            <IconAlertSquareFilled className="size-5" />
            Priority
          </CommandItem>
          <CommandItem>
            <IconAntennaBars5 className="size-5" />
            Sort by
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
