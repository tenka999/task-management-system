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

import {
  IconPalette,
  Icon123,
  IconCircleFilled,
  IconUser,
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
import { CommandAvatar } from "./command-avatar";
import { CommandProject } from "./command-project";
import { Folder } from "lucide-react";

const projects = [
  {
    id: 1,
    workspace: "LNDev UI",
    name: "Core Components",
    icon: Box,
    count: 10,
  },
  {
    id: 2,
    workspace: "LNDev UI",
    name: "Authentication Flow",
    icon: Lock,
    count: 10,
  },
  {
    id: 3,
    workspace: "LNDev UI",
    name: "Media Player",
    icon: PlayerPlay,
    count: 10,
  },
  {
    id: 4,
    workspace: "LNDev UI",
    name: "Theming",
    icon: Tools,
    count: 10,
  },
];

export function PopoverProject({
  variant = "outline",
  item,
  showLabel = false,
  showPercent = false,
}) {
  const [project, setProject] = useState({
    id: null,
    workspace: null,
    name: "No Project",
    icon: Folder,
    count: 0,
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
              className="gap-2 text-xs ml-1"
            >
              {/* <Avatar size="sm">
                <AvatarImage
                  src={avatar.avatar}
                  alt="@shadcn"
                  className="grayscale"
                />
                <AvatarFallback>
                  {avatar.initial ? avatar.initial : <IconUser />}
                </AvatarFallback>
              </Avatar> */}
              <project.icon className="w-4 h-4" />
              {project.workspace ? `${project.workspace} - ` : null}
              {project.name}
            </Button>
          }
        />
        <PopoverContent align="center" className="w-full p-0 " side="bottom">
          <CommandProject
            projects={projects}
            setProject={setProject}
            open={open}
            setOpen={setOpen}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
