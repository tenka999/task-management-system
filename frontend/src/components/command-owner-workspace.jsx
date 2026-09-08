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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function CommandOwnerWorkspace({
  unassigned,
  setAvatar,
  setOpen,
  avatars,
}) {
  const [loading, setLoading] = React.useState(false);

  const handleSelect = (id, username, avatar, initial) => {
    setOpen(false);
    setAvatar({ id, username, avatar, initial });
  };
  const handleTranferWorkspaceOwner = (id, username, avatarUrl) => {
    console.log("asd");
    setOpen(false);
    setAvatar({ id, username, avatarUrl });
  };
  return (
    <Command className="px-1 py-1 pt-2 ">
      <CommandInput placeholder="Assign to..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup className="">
          {unassigned && (
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
          )}
          {avatars.map((item) => (
            <AlertDialog key={item.id}>
              <AlertDialogTrigger
                render={
                  <button className="w-full">
                    <CommandItem
                      // onSelect={() =>
                      //   handleSelect(
                      //     item.id,
                      //     item.username,
                      //     item.avatar,
                      //     item.initial,
                      //   )
                      // }
                      key={item.id}
                      value={item.id}
                      className="gap-2 mb-2 p-0 text-sm"
                    >
                      <Avatar>
                        <AvatarImage
                          src={item.avatarUrl}
                          alt="@shadcn"
                          className="grayscale"
                        />
                        <AvatarFallback>
                          {item.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span>{item.username}</span>
                    </CommandItem>
                  </button>
                }
              ></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tranfer ownership of workspace
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to change the workspace owner?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() =>
                      handleTranferWorkspaceOwner(
                        item.id,
                        item.username,
                        item.avatarUrl,
                      )
                    }
                    className={"bg-destructive hover:bg-destructive/90"}
                    disabled={loading}
                  >
                    Tranfer Ownership
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
