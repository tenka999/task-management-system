import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CircleCheck } from "tabler-icons-react";
import { Separator } from "./ui/separator";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CommandBasic } from "./command-basic";
import { useState } from "react";

import {
  IconAlertSquareFilled,
  IconAntennaBars1,
  IconAntennaBars3,
  IconAntennaBars4,
  IconAntennaBars5,
} from "@tabler/icons-react";

const priorities = [
  {
    id: "noPriority",
    label: "No Priority",
    icon: IconAntennaBars1,
  },
  {
    id: "urgent",
    label: "Urgent",
    icon: IconAlertSquareFilled,
  },
  {
    id: "high",
    label: "High",
    icon: IconAntennaBars5,
  },
  {
    id: "medium",
    label: "Medium",
    icon: IconAntennaBars4,
  },
  {
    id: "low",
    label: "Low",
    icon: IconAntennaBars3,
  },
];

export function PopoverPriority({ item, showLabel = false }) {
  const [open, setOpen] = useState(false);

  const [priority, setPriority] = useState({
    id: "noPriority",
    label: "No Priority",
  });
  const currentIcon = priorities.find(
    (priorities) => priorities.id === priority.id,
  );

  return (
    <>
      <Popover open={open} onOpenChange={setOpen} className=" ">
        <PopoverTrigger
          render={
            <Button onClick={() => setOpen(!open)} variant="outline" size="sm">
              <currentIcon.icon className="size-5" />
              {showLabel && priority.label}
            </Button>
          }
        />
        <PopoverContent align="center" className="w-max p-0 " side="bottom">
          <CommandBasic
            setPriority={setPriority}
            priorities={priorities}
            setOpen={setOpen}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
