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
  Tags,
} from "tabler-icons-react";

import {
  IconPalette,
  Icon123,
  IconCircleFilled,
  IconPlus,
} from "@tabler/icons-react";

import { CircleCheck } from "tabler-icons-react";
import { Separator } from "./ui/separator";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IconAlertSquareFilled } from "@tabler/icons-react";
import { CommandBasic } from "./command-basic";
import { useState } from "react";
import { StatusIcon } from "./status-icon";
import { CommandStatus } from "./command-status";
import { CommandIcon } from "./command-icon";
import { CommandEmpty } from "./ui/command";
import { CommandLabel } from "./command-label";
const labels = [
  {
    id: "ui-enhancement",
    name: "UI Enhancement",
    color: "#8b008f",
    count: 34,
  },
  {
    id: "bug",
    name: "Bug",
    color: "#ff0000",
    count: 40,
  },
  {
    id: "feature",
    name: "Feature",
    color: "#008000",
    count: 52,
  },
  {
    id: "documentation",
    name: "Documentation",
    color: "#0000ff",
    count: 37,
  },
  {
    id: "refactor",
    name: "Refactor",
    color: "#ffff00",
    count: 33,
  },
  {
    id: "performance",
    name: "Performance",
    color: "#ffa500",
    count: 37,
  },
  {
    id: "design",
    name: "Design",
    color: "#ffb6c1",
    count: 35,
  },
  {
    id: "security",
    name: "Security",
    color: "#808080",
    count: 26,
  },
  {
    id: "accessibility",
    name: "Accessibility",
    color: "#5c008f",
    count: 36,
  },
];

export function PopoverLabelTask({
  variant = "outline",
  item,
  showLabel = false,
}) {
  const [label, setLabel] = useState([]);

  const [open, setOpen] = useState(false);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen} className="">
        <PopoverTrigger
          className=""
          render={
            <div className="flex gap-2 items-center">
              <IconPlus
                onClick={() => setOpen(!open)}
                variant={variant}
                className="opacity-50 hover:opacity-100
                border-2
                w-5
                h-5
                
                "
              />
            </div>
          }
        />
        <PopoverContent align="center" className="w-full p-0 " side="bottom">
          <CommandLabel
            label={label}
            labels={labels}
            setLabel={setLabel}
            open={open}
            setOpen={setOpen}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
