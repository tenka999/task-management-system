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
const sprints = [
  {
    id: 1,
    name: "Core Components",
    count: 2,
    icon: Tools,
    items: [
      {
        id: 1,
        order: 1,
        name: "Foundation",
        goal: "Setup the core foundation for the UI",
        startDate: new Date().toString(),
        endDate: new Date().toString(),
        icon: Box,
        tag: {
          label: "UI Enhancement",
          color: "purple",
        },
        isActive: true,
        createdBy: "John Doe",
        health: "unknown",
        priority: "high",
        status: 80,
      },
      {
        id: 2,
        order: 2,
        name: "Authentication Flow",
        goal: "Implement the authentication flow for the UI",
        startDate: new Date().toString(),
        endDate: new Date().toString(),
        icon: Lock,
        tag: {
          label: "Bug",
          color: "red",
        },
        isActive: true,
        createdBy: "John Doe",
        health: "unknown",
        priority: "high",
        status: 80,
      },
    ],
  },
  {
    id: 5,
    name: "Authentication Flow",
    count: 2,
    icon: Lock,
    items: [
      {
        id: 3,
        order: 1,
        name: "Foundation",
        goal: "Setup the core foundation for the UI",
        startDate: new Date().toString(),
        endDate: new Date().toString(),
        icon: Box,
        tag: {
          label: "UI Enhancement",
          color: "purple",
        },
        isActive: true,
        createdBy: "John Doe",
        health: "unknown",
        priority: "high",
        status: 80,
      },
      {
        id: 4,
        order: 2,
        name: "Authentication Flow",
        goal: "Implement the authentication flow for the UI",
        startDate: new Date().toString(),
        endDate: new Date().toString(),
        icon: Lock,
        tag: {
          label: "Bug",
          color: "red",
        },
        isActive: true,
        createdBy: "John Doe",
        health: "unknown",
        priority: "high",
        status: 80,
      },
    ],
  },
];

export function ItemSprint() {
  const [variaty, setVariaty] = useState(null);

  return (
    <div className="flex w-full flex-col ">
      {sprints.map((sprint) => (
        <Item className="p-0 gap-0" key={sprint.id}>
          <Item variant="muted" className="rounded-none">
            <ItemMedia>
              <sprint.icon className="size-4" />
            </ItemMedia>
            <ItemContent className="">
              <ItemTitle>
                {sprint.name}
                <ItemDescription>{sprint.count}</ItemDescription>
              </ItemTitle>
            </ItemContent>
          </Item>
          {sprint.items.map((item) => (
            <Item
              key={item.id}
              className="rounded-none"
              size="sm"
              variant={variaty === item.id ? "muted" : "default"}
              onMouseEnter={() => setVariaty(item.id)}
              onMouseLeave={() => setVariaty(null)}
            >
              <ItemContent>
                <ItemTitle className=" flex w-full justify-between">
                  {/* <div className="flex"></div> */}
                  <div className="w-[70%] flex gap-2">
                    <Button variant="link" className="gap-2">
                      <item.icon className="size-4" />
                      {item.order ? `Sprint ${item.order} - ` : null}
                      {item.name}{" "}
                    </Button>
                    <Badge variant="secondary">
                      <IconCircleFilled color={item.tag.color} />
                      {item.tag.label}
                    </Badge>
                  </div>
                  <div className="w-[12%] ">
                    <PopoverBasic item={item} />
                  </div>
                  <div className="w-[6%]  opacity-60">
                    {/* <Button variant="outline" size="icon">
                      <IconAlertSquareFilled className="size-5" />
                    </Button> */}
                    <PopoverPriority item={item} />
                  </div>
                  <div className="w-[12%]  ">
                    <PopoverStatus
                      showLabel={false}
                      showPercent={true}
                      item={item}
                    />
                  </div>
                </ItemTitle>
              </ItemContent>
            </Item>
          ))}
        </Item>
      ))}
    </div>
  );
}
