"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
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

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Tools } from "tabler-icons-react";
import { NavTeams } from "./nav-team";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { useUserApi } from "@/presentation/logics/app/useUser";
import SecureStorage from "@/helpers/SecureStorage";

export function AppSidebar({ ...props }) {
  const user = SecureStorage.getStorage("user");
  // console.log("User from SecureStorage:", user);
  const { useUserById } = useUserApi();
  const { data: userData, isLoading: userLoading } = useUserById(user.id);
  const workspaces =
    userData?.workspaceMembers?.map((workspace) => workspace.workspace) || [];
  // console.log("wk", workspaces);

  // This is sample data.
  const data = {
    user: {
      name: userData?.username,
      email: userData?.email,
      avatar: userData?.avatarUrl,
    },
    workspaces: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/app",
        icon: Home,
      },

      {
        title: "My Tasks",
        url: "/app/tasks",
        icon: Files,
      },
      {
        title: "Calender",
        url: "/app/",
        icon: CalendarDays,
      },
      {
        title: "Agent",
        url: "#",
        icon: Bot,
      },
      // {
      //   title: "Agent",
      //   url: "#",
      //   icon: Bot,
      //   items: [
      //     {
      //       title: "General",
      //       url: "#",
      //     },
      //     {
      //       title: "Team",
      //       url: "#",
      //     },
      //     {
      //       title: "Billing",
      //       url: "#",
      //     },
      //     {
      //       title: "Limits",
      //       url: "#",
      //     },
      //   ],
      // },
    ],
    projects: [
      {
        name: "Projects",
        url: "/app/projects",
        icon: Frame,
      },
      {
        name: "Sprint",
        url: "/app/sprint",
        icon: Calendar,
      },
      {
        name: "Teams",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Members",
        url: "#",
        icon: Map,
      },
    ],
    teams: [
      {
        title: "LNDev Core",
        url: "#",
        icon: Tools,
        isActive: true,
        items: [
          {
            title: "Home",
            url: "#",
          },
          {
            title: "Task",
            url: "#",
          },
          {
            title: "Sprint",
            url: "#",
          },
          {
            title: "Project",
            url: "#",
          },
          {
            title: "Members",
            url: "#",
          },
        ],
      },
    ],
  };

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <TeamSwitcher teams={workspaces} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavTeams items={data.teams} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
