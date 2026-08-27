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
import { WorkspaceForm } from "@/components/workpace-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
export function TeamSwitcher({ teams }) {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);
  const [showModal, setShowModal] = React.useState(false);
  if (!activeTeam) {
    return null;
  }
  const [createModalOpen, setCreateModalOpen] = React.useState(false);

  const ActiveTeamLogo = activeTeam.logo;

  return (
    <>
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

                      <DropdownMenuItem
                        className="rounded-lg "
                        onClick={() => setShowModal(true)}
                      >
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
                  Invite and manage members
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="sm:max-w-3xl">
            {/* <ScrollArea className="w-full h-[60vh]"> */}
            <DialogHeader>
              <DialogTitle className="text-3xl font-semibold">
                Create Workspace
              </DialogTitle>
            </DialogHeader>
            <WorkspaceForm />
            {/* </ScrollArea> */}
          </DialogContent>
        </Dialog>
      </SidebarMenu>
    </>
  );
}
