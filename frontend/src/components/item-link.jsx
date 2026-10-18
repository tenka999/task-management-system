import {
  ChevronRightIcon,
  CircleHelp,
  ExternalLinkIcon,
  PanelsTopLeft,
  Settings,
} from "lucide-react";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  Accessible,
  Box,
  Circle,
  CircleCheck,
  LayoutGrid,
  Lock,
  PlayerPlay,
  Tools,
} from "tabler-icons-react";
import {
  IconPalette,
  Icon123,
  IconCircleFilled,
  IconAlertSquareFilled,
} from "@tabler/icons-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Toggle } from "./ui/toggle";
import { useState } from "react";
import { PopoverBasic } from "./popover-basic";
import { PopoverPriority } from "./popover-priority";
import { PopoverStatus } from "./popover-status";
import { useProjectApi } from "@/presentation/logics/app/useProject";
import { useWorkspace } from "@/hooks/useWorkspace";
import { useNavigate } from "react-router";
const projects = [
  {
    id: 1,
    name: "LNDev Core",
    count: 4,
    icon: Tools,
    items: [
      {
        id: 1,
        workspace: "LNDev UI",

        name: "Core Components",
        icon: Box,
        tag: {
          label: "UI Enhancement",
          color: "purple",
        },
        health: "unknown",
        priority: "high",
        status: 80,
      },
      {
        id: 2,
        workspace: "LNDev UI",
        name: "Authentication Flow",
        icon: Lock,
        tag: {
          label: "Bug",
          color: "red",
        },
        health: "unknown",
        priority: "none",
        status: 75,
      },
      {
        id: 3,
        workspace: "LNDev UI",

        name: "Cards",
        icon: LayoutGrid,
        tag: {
          label: "Design",
          color: "pink",
        },
        health: "good",
        priority: "none",
        status: 0,
      },
      {
        id: 4,
        workspace: "LNDev UI",

        name: "Accessibility Features",
        icon: Accessible,
        tag: {
          label: "Security",
          color: "gray",
        },
        health: "unknown",
        priority: "none",
        status: 60,
      },
    ],
  },

  {
    id: 2,
    name: "Design System",
    count: 4,
    icon: IconPalette,
    items: [
      {
        id: 5,
        workspace: "LNDev UI",

        name: "Media Player",
        icon: PlayerPlay,
        tag: {
          label: "Accessibility",
          color: "purple",
        },
        health: "warning",
        priority: "high",
        status: 20,
      },
      {
        id: 6,
        workspace: "LNDev UI",

        name: "Theming",
        icon: PanelsTopLeft,
        tag: {
          label: "Bug",
          color: "red",
        },
        health: "warning",
        priority: "none",
        status: 50,
      },
      {
        id: 7,
        workspace: "LNDev UI",

        name: "User Preferences",
        icon: Settings,
        tag: {
          label: "Feature",
          color: "green",
        },
        health: "good",
        priority: "medium",
        status: 10,
      },
      {
        id: 8,
        workspace: "LNDev UI",

        name: "Tooltip",
        icon: CircleHelp,
        tag: {
          label: "Security",
          color: "gray",
        },
        health: "warning",
        priority: "none",
        status: 0,
      },
    ],
  },
];

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

export function ItemLink() {
  const [variaty, setVariaty] = useState(null);
  const { activeWorkspace } = useWorkspace();
  const { useAllProjects } = useProjectApi();
  const { data: projects } = useAllProjects({
    workspaceId: activeWorkspace?.id,
  });

  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col ">
      {/* {projects.map((project) => (
        <Item className="p-0 gap-0" key={project.id}>
          <Item variant="muted" className="rounded-none">
            <ItemMedia>
              <project.icon className="size-4" />
            </ItemMedia>
            <ItemContent className="">
              <ItemTitle>
                {project.name}
                <ItemDescription>{project.count}</ItemDescription>
              </ItemTitle>
            </ItemContent>
          </Item> */}
      {projects?.map((item) => {
        const ProjectIcon = PROJECT_ICONS[item.icon] || Box;
        console.log("item", item);
        return (
          <Item
            key={item.id}
            className="rounded-none"
            size="sm"
            variant={variaty === item.id ? "muted" : "default"}
            onMouseEnter={() => setVariaty(item.id)}
            onMouseLeave={() => setVariaty(null)}
          >
            <ItemContent>
              <ItemTitle className="flex w-full justify-between">
                <div className="w-[70%] flex items-center gap-2 overflow-hidden ">
                  <Button
                    variant="link"
                    className="gap-2"
                    onClick={() => navigate(`/app/project/${item.id}`)}
                  >
                    <ProjectIcon className="size-4" />
                    {item.workspace.name} - {item.name}
                  </Button>

                  <div className="flex  ">
                    {item.labels.map((label) => (
                      <Badge
                        className=""
                        variant="secondary"
                        key={label.labelId}
                      >
                        <IconCircleFilled color={label.label.color} />

                        {label.label.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="w-[12%]">
                  <PopoverBasic item={item} />
                </div>

                <div className="w-[6%] opacity-60">
                  <PopoverPriority field={item} />
                </div>

                <div className="w-[12%]">
                  <PopoverStatus
                    showLabel={false}
                    showPercent={true}
                    field={item}
                  />
                </div>
              </ItemTitle>
            </ItemContent>
          </Item>
        );
      })}
      {/* </Item>
      ))} */}
    </div>
  );
}
