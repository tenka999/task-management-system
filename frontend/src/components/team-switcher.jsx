"use client";

import * as React from "react";
import { ChevronsUpDown, Plus, SearchIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSubTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

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
  IconChevronRight,
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon } from "./ui/input-group";

export function TeamSwitcher({ teams }) {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);

  if (!activeTeam) {
    return null;
  }

  const ActiveTeamLogo = activeTeam.logo;

  return (
    <SidebarMenu className="">
      <SidebarMenuItem className="">
        <DropdownMenu className=" ">
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className=" data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <ActiveTeamLogo className="size-4" />
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {activeTeam.name}
                  </span>

                  <span className="truncate text-xs">{activeTeam.plan}</span>
                </div>

                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            }
          />
          <DropdownMenuContent
            className=" p-1 w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            {/* <DropdownMenuGroup>
              {teams.map((team, index) => {
                const TeamLogo = team.logo;
                return (
                  <DropdownMenuItem
                    inset
                    key={team.name}
                    onClick={() => setActiveTeam(team)}
                    className="gap-2 p-2"
                  >
                    <div className="flex size-6 items-center justify-center rounded-md border">
                      <TeamLogo className="size-3.5 shrink-0" />
                    </div>
                    {team.name}
                    <DropdownMenuShortcut className="">
                      ⌘{index + 1}
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator className="" />
              <DropdownMenuItem inset className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Add team
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup> */}
            {/* <Command className="p-0  ">
              <CommandList>
                <CommandGroup>
                  <CommandItem className="rounded-md">
                    <IconAntennaBars1 className="size-5" />
                    Settings
                  </CommandItem>
                  <CommandItem className="rounded-md">
                    <IconAlertSquareFilled className="size-5" />
                    Invite and manage members
                  </CommandItem>
                  <CommandSeparator className="bg-secondary-foreground opacity-20" />

                  <CommandItem
                    className="rounded-md relative  "
                    onMouseEnter={() => setWorkspaceHover(true)}
                    onMouseLeave={() => setWorkspaceHover(false)}
                  >
                    <IconAntennaBars5 className="size-5" />
                    Switch Workspace
                    <CommandShortcut>
                      <IconChevronRight className="size-5" />
                    </CommandShortcut>
                  </CommandItem>
                  {workspaceHover && (
                    <CommandItem
                      onMouseEnter={() => setWorkspaceHover(true)}
                      onMouseLeave={() => setWorkspaceHover(false)}
                      className=" absolute -right-48 border bottom-0 bg-card w-[200px] rounded-lg"
                    >
                      <div className="flex flex-col">
                        <div className="flex">
                          <div className=" bg-destructive">a</div>
                          sa
                        </div>
                        <p>Create workspace </p>
                        <p>Create workspace</p>
                      </div>
                    </CommandItem>
                  )}
                </CommandGroup>
              </CommandList>
            </Command> */}
            <DropdownMenuGroup>
              <DropdownMenuItem className="rounded-lg">
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-secondary-foreground opacity-20" />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="rounded-lg">
                  Swith workspacce
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="rounded-lg">
                    <DropdownMenuItem className="rounded-lg">
                      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <ActiveTeamLogo className="size-4" />
                      </div>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">
                          {activeTeam.name}
                        </span>

                        <span className="truncate text-xs">
                          {activeTeam.plan}
                        </span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-secondary-foreground opacity-20" />

                    {teams.map((team, index) => (
                      <DropdownMenuItem
                        key={team.name}
                        onClick={() => setActiveTeam(team)}
                        className="gap-2 p-2"
                      >
                        <div className="flex size-6 items-center justify-center rounded-md border">
                          <team.logo className="size-3.5 shrink-0" />
                        </div>
                        {team.name}
                        <DropdownMenuShortcut>
                          ⌘{index + 1}
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator className="bg-secondary-foreground opacity-20" />

                    <DropdownMenuItem className="rounded-lg">
                      Create workspace
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg">
                      Join workspace
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-secondary-foreground opacity-20" />

            <DropdownMenuGroup>
              <DropdownMenuItem className="rounded-lg">
                Invite members
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg">
                Manage members
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
