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

export function CommandBasic() {
  return (
    <Command className="px-1 py-1  ">
      <CommandInput placeholder="Set Priority" className="" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          <CommandItem>
            <IconAntennaBars1 className="size-5" />
            No Priority
          </CommandItem>
          <CommandItem>
            <IconAlertSquareFilled className="size-5" />
            Urgent
          </CommandItem>
          <CommandItem>
            <IconAntennaBars5 className="size-5" />
            High
          </CommandItem>
          <CommandItem>
            <IconAntennaBars4 className="size-5" />
            Medium
          </CommandItem>
          <CommandItem>
            <IconAntennaBars3 className="size-5" />
            Low
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
