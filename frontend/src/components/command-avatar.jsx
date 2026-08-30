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
  IconUser,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function CommandAvatar({ setAvatar, setOpen, avatars }) {
  const handleSelect = (id, username, avatar, initial) => {
    setOpen(false);
    setAvatar({ id, username, avatar, initial });
  };
  return (
    <Command className="px-1 py-1 pt-2 ">
      <CommandInput placeholder="Assign to..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup className="">
          <CommandItem
            onSelect={() => handleSelect(null, "unassigned", null, null)}
            key={"unassigned"}
            value={"unassigned"}
            className="gap-2 mb-2 p-0 text-sm"
          >
            <Avatar>
              <AvatarFallback>
                <IconUser className="grayscale" />
              </AvatarFallback>
            </Avatar>
            <span>{"Unassigned"}</span>
          </CommandItem>
          {avatars.map((item) => (
            <CommandItem
              onSelect={() =>
                handleSelect(item.id, item.username, item.avatar, item.initial)
              }
              key={item.id}
              value={item.id}
              className="gap-2 mb-2 p-0 text-sm"
            >
              <Avatar>
                <AvatarImage
                  src={item.avatar}
                  alt="@shadcn"
                  className="grayscale"
                />
                <AvatarFallback>{item.initial}</AvatarFallback>
              </Avatar>
              <span>{item.username}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
