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
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  IconAlertSquareFilled,
  IconAntennaBars1,
  IconAntennaBars3,
  IconAntennaBars4,
  IconAntennaBars5,
} from "@tabler/icons-react";
import { useMemberFilter } from "@/hooks/useMemberFilter";

export function CommandMembers({ memberStatus, setOpen }) {
  const { memberFilter, setMemberFilter } = useMemberFilter();

  const countAllUsers = memberStatus
    .map((status) => status.count)
    .reduce((a, b) => a + b, 0);

  const handleSelect = (status) => {
    setMemberFilter(status);
    setOpen(false);
  };
  return (
    <Command className="p-0">
      <CommandList>
        <CommandGroup>
          {memberStatus.map((status) => (
            <>
              <CommandItem
                onSelect={() => handleSelect(status.id)}
                key={status.id}
                value={status.label}
                className="gap-2"
              >
                <span>{status.label}</span>
                <CommandShortcut>
                  <span className="ml-auto">
                    {status.label === "All User" ? countAllUsers : status.count}
                  </span>
                </CommandShortcut>
              </CommandItem>
              {status.id === "all-users" && (
                <CommandSeparator className="bg-secondary-foreground opacity-20" />
              )}
            </>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
