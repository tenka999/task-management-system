import {
  ChevronRightIcon,
  CircleHelp,
  ExternalLinkIcon,
  PanelsTopLeft,
  Plus,
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
  IconPlus,
} from "@tabler/icons-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Toggle } from "./ui/toggle";
import { useState } from "react";
import { PopoverBasic } from "./popover-basic";
import { PopoverPriority } from "./popover-priority";
import { PopoverStatus } from "./popover-status";
import { StatusIcon } from "./status-icon";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";
const tasks = [
  {
    id: "inProgress",
    status: "In Progress",
    statusColor: "yellow",
    count: 1,
    items: [
      {
        id: "LNUI-773",
        title: "Calendar: multi-month view with linked navigation",
        icon: "alert",
        status: "in-progress",
        statusColor: "yellow",

        labels: [
          {
            name: "Accessibility",
            color: "purple",
          },
          {
            name: "UI Enhancement",
            color: "purple",
          },
        ],

        cycle: "Cycle 21",
        dueDate: "Aug 02",
        createdDate: "Jul 26",

        priority: "high",
        priorityColor: "yellow",

        assignee: {
          name: "John Doe",
          avatar: null,
        },
      },
    ],
  },

  {
    id: "technicalReview",
    status: "Technical Review",
    statusColor: "green",
    count: 1,
    items: [
      {
        id: "LNUI-783",
        title: "Combobox: windowed list rendering above 1k options",
        icon: "alert",
        status: "technical-review",
        statusColor: "green",

        labels: [
          {
            name: "Bug",
            color: "red",
          },
          {
            name: "Refactor",
            color: "yellow",
          },
        ],

        cycle: "Cycle 21",
        dueDate: null,
        createdDate: "Jul 22",

        priority: "high",
        priorityColor: "green",

        assignee: {
          name: "John Doe",
          avatar: null,
        },
      },
    ],
  },

  {
    id: "paused",
    status: "Paused",
    statusColor: "cyan",
    count: 1,
    items: [
      {
        id: "LNUI-744",
        title: "Audit Dialog scroll locking on iOS Safari",
        icon: "chart",
        status: "paused",
        statusColor: "cyan",

        labels: [
          {
            name: "Bug",
            color: "red",
          },
          {
            name: "Accessibility",
            color: "purple",
          },
          {
            name: "LNDev UI - Modals",
            color: "gray",
          },
        ],

        cycle: "Cycle 22",
        dueDate: null,
        createdDate: "Jul 25",

        priority: "medium",
        priorityColor: "cyan",

        assignee: {
          name: "John Doe",
          avatar: null,
        },
      },
    ],
  },

  {
    id: "product-feedback",
    status: "Product Feedback",
    statusColor: "orange",
    count: 2,
    items: [
      {
        id: "LNUI-793",
        title: "Data grid: header menu discoverability is low in testing",
        icon: "alert",
        status: "product-feedback",
        statusColor: "orange",

        labels: [
          {
            name: "Performance",
            color: "yellow",
          },
          {
            name: "Accessibility",
            color: "purple",
          },
        ],

        cycle: "Cycle 21",
        dueDate: null,
        createdDate: "Jul 31",

        priority: "medium",
        priorityColor: "orange",

        assignee: {
          name: "John Doe",
          avatar: null,
        },
      },

      {
        id: "LNUI-701",
        title: "Combobox: keyboard selection skips",
        icon: "chart",
        status: "product-feedback",
        statusColor: "orange",

        labels: [
          {
            name: "UI Enhancement",
            color: "purple",
          },
          {
            name: "Accessibility",
            color: "purple",
          },
          {
            name: "LNDev UI - Core Components",
            color: "gray",
          },
        ],

        cycle: "Cycle 21",
        dueDate: null,
        createdDate: "Jul 21",

        priority: "medium",
        priorityColor: "orange",

        assignee: {
          name: "John Doe",
          avatar: null,
        },
      },
    ],
  },

  {
    id: "todo",
    status: "Todo",
    statusColor: "gray",
    count: 5,
    items: [
      {
        id: "LNUI-763",
        title: "Avatar: fallback gradient derived from the user id hash",
        icon: "alert",
        status: "todo",
        statusColor: "gray",

        labels: [
          {
            name: "Refactor",
            color: "yellow",
          },
          {
            name: "Security",
            color: "gray",
          },
        ],

        cycle: "Cycle 21",
        dueDate: null,
        createdDate: "Jul 30",

        priority: "low",
        priorityColor: "gray",

        assignee: {
          name: "John Doe",
          avatar: null,
        },
      },

      {
        id: "LNUI-723",
        title: "Sidebar: double-click on rail to collapse to icons",
        icon: "chart",
        status: "todo",
        statusColor: "gray",

        labels: [
          {
            name: "Feature",
            color: "green",
          },
          {
            name: "LNDev UI - Sidebar",
            color: "gray",
          },
        ],

        cycle: "Cycle 21",
        dueDate: null,
        createdDate: "Jul 30",

        priority: "medium",
        priorityColor: "gray",

        assignee: {
          name: "John Doe",
          avatar: null,
        },
      },

      {
        id: "LNUI-923",
        title: "Theme: ship a first-class high-contrast preset",
        icon: "alert",
        status: "todo",
        statusColor: "gray",

        labels: [
          {
            name: "Refactor",
            color: "yellow",
          },
          {
            name: "Security",
            color: "gray",
          },
        ],

        cycle: "Cycle 22",
        dueDate: null,
        createdDate: "Jul 29",

        priority: "low",
        priorityColor: "gray",

        assignee: {
          name: "John Doe",
          avatar: null,
        },
      },

      {
        id: "LNUI-933",
        title: "Icons: per-icon dynamic import codemod",
        icon: "alert",
        status: "todo",
        statusColor: "gray",

        labels: [
          {
            name: "Accessibility",
            color: "purple",
          },
          {
            name: "UI Enhancement",
            color: "purple",
          },
        ],

        cycle: "Cycle 22",
        dueDate: null,
        createdDate: "Jul 25",

        priority: "medium",
        priorityColor: "gray",

        assignee: {
          name: "John Doe",
          avatar: null,
        },
      },

      {
        id: "LNUI-752",
        title: "Publish theming recipes for brand palette import",
        icon: "alert",
        status: "todo",
        statusColor: "gray",

        labels: [
          {
            name: "UI Enhancement",
            color: "purple",
          },
          {
            name: "Documentation",
            color: "blue",
          },
        ],

        cycle: "Cycle 21",
        dueDate: null,
        createdDate: "Jul 24",

        priority: "low",
        priorityColor: "gray",

        assignee: {
          name: "John Doe",
          avatar: null,
        },
      },
    ],
  },
];

const statuses = [
  {
    id: "inProgress",
    label: "In Progress",
  },
  {
    id: "technicalReview",
    label: "Technical Review",
  },
  {
    id: "done",
    label: "Done",
  },
  {
    id: "paused",
    label: "Paused",
  },
  {
    id: "todo",
    label: "Todo",
  },
  {
    id: "backlog",
    label: "Backlog",
  },
  {
    id: "triage",
    label: "Triage",
  },
  {
    id: "idea",
    label: "Idea",
  },
  {
    id: "product-feedback",
    label: "Product Feedback",
  },
  {
    id: "blocked",
    label: "Blocked",
  },
  {
    id: "shipped",
    label: "Shipped",
  },
];

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

export function ItemTask() {
  const [variaty, setVariaty] = useState(null);

  //   const z = statuses.concat(tasks);
  const z = statuses.map((status) =>
    tasks.filter(
      (task) => task.status !== status.label && statuses.concat(tasks),
    ),
  );
  const a = statuses.map((status) =>
    tasks.filter((task) => task.status === status.label),
  );
  // .map((item) => item.id);
  const b = statuses
    .map((status) => tasks.filter((task) => task.status === status.label))
    .map((item) => item[0]);
  const c = statuses
    .map((status) => tasks.filter((task) => task.status === status.label))
    .map((item) => item[0])
    .map((items) => (items ? items.items : []));

  return (
    <div className="relative  flex w-full flex-col  ">
      {tasks.map((task) => (
        <div key={task.id}>
          <Item className="p-0 gap-0" key={task.id}>
            <Item variant="muted" size="xs" className="rounded-none  ">
              <ItemContent className="">
                <ItemTitle className="flex w-full justify-between px-5">
                  <div className="flex items-center gap-2">
                    <StatusIcon status={task.id} size={18} />
                    {task.status}
                    <ItemDescription>0</ItemDescription>
                  </div>
                  <ItemActions>
                    <Plus
                      size={20}
                      className=" p-0.5 border rounded-xs hover:bg-muted active:translate-y-0.5 transition-all duration-300 ease-in-out"
                    />
                  </ItemActions>
                </ItemTitle>
              </ItemContent>
            </Item>

            {task.items.map((item) => (
              <Item
                key={item.id}
                className="rounded-none "
                size="xs"
                variant={variaty === item.id ? "muted" : "default"}
                onMouseEnter={() => setVariaty(item.id)}
                onMouseLeave={() => setVariaty(null)}
              >
                <ItemContent>
                  <div className="flex">
                    <ItemTitle className="flex w-full px-3  justify-between ">
                      <div className="flex-10 flex gap-1 items-center w-0 ">
                        <p className="opacity-60 flex items-center shrink-0">
                          <PopoverPriority item={item} />
                          {item.id}
                        </p>{" "}
                        <PopoverStatus />
                        <div
                          variant="link"
                          className="gap-2 truncate cursor-pointer"
                        >
                          {item.title}
                        </div>
                      </div>
                    </ItemTitle>
                    <ItemActions className="gap-2 mr-7 ">
                      <Badge variant="outline" className="p-2.5 ">
                        <IconCircleFilled color="green" />
                        <p className="opacity-60 text-xs">Performance</p>
                      </Badge>
                      <Badge variant="outline" className="p-2.5 ">
                        <IconCircleFilled color="red" />

                        <p className="opacity-60 text-xs">Bug</p>
                      </Badge>
                      <Badge variant="outline" className="p-2.5 ">
                        <IconCircleFilled color="purple" />
                        <p className="opacity-60 text-xs">Accessibility</p>
                      </Badge>
                      <Badge variant="outline" className="p-3 ">
                        <p className="opacity-60 text-xs">LNDev UI - Modals</p>
                      </Badge>
                      <Badge variant="outline" className="p-2.5  ">
                        <p className="opacity-50 text-xs">Cycle 10</p>
                      </Badge>
                      <p className="opacity-50 shrink-0">Jul 27</p>
                      <Avatar>
                        <AvatarImage src={item.avatar} />
                        <AvatarFallback>LN</AvatarFallback>
                        <AvatarBadge />
                      </Avatar>
                    </ItemActions>
                  </div>
                </ItemContent>
              </Item>
            ))}
          </Item>
        </div>
      ))}
    </div>
  );
}
