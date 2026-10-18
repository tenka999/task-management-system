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
  IconPalette,
  IconUser,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Folder } from "lucide-react";

import {
  Accessible,
  Box,
  Circle,
  LayoutGrid,
  Lock,
  PlayerPlay,
  Tools,
} from "tabler-icons-react";
import SecureStorage from "@/helpers/SecureStorage";

const PROJECT_ICONS = {
  box: Box,
  layoutGrid: LayoutGrid,
  "layout-grid": LayoutGrid,
  lock: Lock,
  "player-play": PlayerPlay,
  tools: Tools,
  accessible: Accessible,
  palette: IconPalette,
};

export function CommandProject({ setProject, setOpen, projects, field }) {
  const handleSelect = (id, workspace, name, icon, count) => {
    setOpen(false);
    setProject({ id, workspace, name, icon, count });
    field?.onChange(id);
  };

  const user = SecureStorage.getStorage("user");

  const projectsPublic = projects?.filter((project) => project.isPublic);
  const projectsPrivate = projects
    ?.filter((project) => !project.isPublic)
    .filter((project) =>
      project.members.find((member) => member.userId === user?.id),
    );
  const member = projectsPrivate?.filter((project) =>
    project.members.find((member) => member.userId === user?.id),
  );
  const projectsAll = [...projectsPrivate, ...projectsPublic];

  return (
    <Command className="px-1 py-1 pt-2 ">
      <CommandInput placeholder="Set project..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup className="">
          <CommandItem
            onSelect={() => handleSelect(null, null, "No project", Folder, 0)}
            key={"No project"}
            value={"No project"}
            className="gap-2 mb-2 py-2 px-3 text-sm"
          >
            <Folder className="size-5" />
            <span>No Project</span>
          </CommandItem>
          {projectsAll.map((item) => {
            const ProjectIcon = PROJECT_ICONS[item.icon] || Box;
            return (
              <CommandItem
                onSelect={() =>
                  handleSelect(
                    item.id,
                    item.workspace.name,
                    item.name,
                    item.icon,
                    item.count,
                  )
                }
                key={item.id}
                value={item.id}
                className="gap-2 mb-2 py-2 px-3 text-sm"
              >
                <ProjectIcon className="size-5" />
                <span>
                  {item.workspace.name} - {item.name}
                </span>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
