import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

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

import { CircleCheck } from "tabler-icons-react";
import { Separator } from "./ui/separator";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IconAlertSquareFilled } from "@tabler/icons-react";
import { CommandBasic } from "./command-basic";
import { useState } from "react";
import { StatusIcon } from "./status-icon";
import { CommandStatus } from "./command-status";
import { CommandIcon } from "./command-icon";

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

export function PopoverIcon({
  field,
  variant = "outline",
  item,
  showLabel = false,
  showPercent = false,
}) {
  const [icon, setIcon] = useState({
    id: "box",
    icon: Box,
    label: "Box",
  });

  const [open, setOpen] = useState(false);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen} className="">
        <PopoverTrigger
          className=""
          render={
            <Button
              onClick={() => setOpen(!open)}
              variant={variant}
              size="sm"
              className=" gap-2 text-xs ml-1"
            >
              {/* <CircleCheck className="size-4" /> */}
              <icon.icon className="size-5" />
              {icon.label}
            </Button>
          }
        />
        <PopoverContent align="center" className="w-full p-0 " side="bottom">
          <CommandIcon
            field={field}
            icons={icons}
            setIcon={setIcon}
            open={open}
            setOpen={setOpen}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
