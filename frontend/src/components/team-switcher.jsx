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
  AudioWaveform,
  BookOpen,
  Bot,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Calendar,
  Calendar1,
  CalendarDays,
  Files,
  Home,
  ArrowLeftIcon,
} from "lucide-react";

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
import { toast } from "@/components/ui/toast";
import { useWorkspaceApi } from "@/presentation/logics/app/useWorkspaceApi";

import {
  Accessible,
  Box,
  Circle,
  LayoutGrid,
  Lock,
  PlayerPlay,
  Tools,
} from "tabler-icons-react";

import { IconPalette, Icon123, IconCircleFilled } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const icons = [
  {
    id: "box",
    icon: Box,
    label: "Box",
  },
  {
    id: "layout-grid",
    icon: LayoutGrid,
    label: "Layout Grid",
  },
  {
    id: "lock",
    icon: Lock,
    label: "Lock",
  },
  {
    id: "player-play",
    icon: PlayerPlay,
    label: "Player Play",
  },
  {
    id: "tools",
    icon: Tools,
    label: "Tools",
  },
  {
    id: "accessible",
    icon: Accessible,
    label: "Accessible",
  },
  {
    id: "palette",
    icon: IconPalette,
    label: "Palette",
  },
];

export function TeamSwitcher({ teams }) {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  console.log("active", activeTeam);
  const ActiveTeamLogo =
    activeTeam?.logoUrl &&
    `http://localhost:5000/api/workspace-logo/${activeTeam?.logoUrl}`;
  const ActiveTeamIcon = icons.find(
    (item) => item.id === activeTeam?.icon,
  )?.icon;

  const {
    useAllWorkspace,
    createWorkspace,
    useWorkspaceBySlug,
    deleteWorkspace,
    deleteWorkspaces,
  } = useWorkspaceApi();

  const handleCreateWorkspace = async (values) => {
    setIsSubmitting(true);
    try {
      await createWorkspace.mutateAsync(values);
      toast.add({
        title: "Success",
        description: "Workspace created successfully",
      });
      // fetchData();
    } catch (error) {
      toast.add({
        title: "Error",
        description: "Failed to create workspace",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setShowModal(false);
    }
  };
  function DropdownWorkspace() {
    {
      teams.map((team, index) => {
        const Icon = icons.find((item) => item.id === team.icon)?.icon;

        return (
          <DropdownMenuItem
            key={team.id}
            onClick={() => setActiveTeam(team)}
            className="gap-2 p-2"
          >
            <div className="flex size-6 items-center justify-center rounded-md border">
              {Icon && <Icon className="size-3.5 shrink-0" />}
            </div>

            <span>{team.name}</span>

            <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
          </DropdownMenuItem>
        );
      });
    }
  }
  function capitalizeFirstLetter(str) {
    if (!str) return "";
    return str.charAt(0) + str.slice(1).toLowerCase();
  }

  React.useEffect(() => {
    if (teams.length > 0 && !activeTeam) {
      setActiveTeam(teams[0]);
    }
  }, [teams, activeTeam]);
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
                  {activeTeam?.logoUrl ? (
                    <Avatar size="lg">
                      <AvatarImage
                        src={`http://localhost:5000/api/workspace-logo/${activeTeam.logoUrl}`}
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="flex size-6 items-center justify-center rounded-md border">
                      {ActiveTeamLogo && (
                        <ActiveTeamLogo className="size-3.5 shrink-0" />
                      )}
                    </div>
                  )}
                  {/* <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <ActiveTeamIcon className="size-4" />
                  </div> */}

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {activeTeam?.name}
                    </span>

                    <span className="truncate text-xs">
                      {capitalizeFirstLetter(activeTeam?.type)}
                    </span>
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
                    Switch workspacce
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="rounded-lg">
                      <DropdownMenuItem className="rounded-lg">
                        {/* <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                          <ActiveTeamIcon className="size-4" />
                        </div> */}
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-medium">
                            {activeTeam?.name}
                          </span>

                          <span className="truncate text-xs">
                            {activeTeam?.type}
                          </span>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-secondary-foreground opacity-20" />

                      {/* {teams.map((team, index) => (
                        <DropdownMenuItem
                          key={team.id}
                          onClick={() => setActiveTeam(team)}
                          className="gap-2 p-2"
                        >
                          <div className="flex size-6 items-center justify-center rounded-md border">
                            {icons.find((item) => item.id === team.icon)?.icon}
                            <team.icon className="size-3.5 shrink-0" />
                          </div>
                          {team.name}
                          <DropdownMenuShortcut>
                            ⌘{index + 1}
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>
                      ))} */}
                      {teams.map((team, index) => {
                        const Icon = icons.find(
                          (item) => item.id === team.icon,
                        )?.icon;

                        return (
                          <DropdownMenuItem
                            key={team.id}
                            onClick={() => setActiveTeam(team)}
                            className="gap-2 p-2"
                          >
                            {team?.logoUrl ? (
                              <Avatar size="sm">
                                <AvatarImage
                                  src={`http://localhost:5000/api/workspace-logo/${team.logoUrl}`}
                                  alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className="flex size-6 items-center justify-center rounded-md border">
                                {Icon && <Icon className="size-3.5 shrink-0" />}
                              </div>
                            )}
                            {/* <div className="flex size-6 items-center justify-center rounded-md border">
                              {Icon && <Icon className="size-3.5 shrink-0" />}
                            </div> */}

                            <span>{team.name}</span>

                            <DropdownMenuShortcut>
                              ⌘{index + 1}
                            </DropdownMenuShortcut>
                          </DropdownMenuItem>
                        );
                      })}
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
          <DialogContent className="sm:max-w-3xl bg-background">
            {/* <ScrollArea className="w-full h-[60vh]"> */}
            <DialogHeader>
              <DialogTitle className="text-3xl font-semibold">
                Create Workspace
              </DialogTitle>
            </DialogHeader>
            <WorkspaceForm
              onSubmit={handleCreateWorkspace}
              isLoading={isSubmitting}
            />
            {/* </ScrollArea> */}
          </DialogContent>
        </Dialog>
      </SidebarMenu>
    </>
  );
}
