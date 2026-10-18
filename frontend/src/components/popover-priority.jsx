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
import { useEffect, useState } from "react";

import {
  IconAlertSquareFilled,
  IconAntennaBars1,
  IconAntennaBars3,
  IconAntennaBars4,
  IconAntennaBars5,
} from "@tabler/icons-react";

const priorities = [
  {
    id: "NO_PRIORITY",
    label: "No Priority",
    icon: IconAntennaBars1,
  },
  {
    id: "URGENT",
    label: "Urgent",
    icon: IconAlertSquareFilled,
  },
  {
    id: "HIGH",
    label: "High",
    icon: IconAntennaBars5,
  },
  {
    id: "MEDIUM",
    label: "Medium",
    icon: IconAntennaBars4,
  },
  {
    id: "LOW",
    label: "Low",
    icon: IconAntennaBars3,
  },
];

export function PopoverPriority({
  variant = "outline",
  noCommand = false,
  showLabel = false,
  size = "sm",
  field,
}) {
  // if (!field) return;
  const [open, setOpen] = useState(false);
  console.log("field.", field);
  const [priority, setPriority] = useState({
    id: "NO_PRIORITY",
    label: "No Priority",
  });
  const currentIcon = priorities.find(
    (priorities) => priorities.id === priority.id,
  );

  useEffect(() => {
    if (!field) return;
    if (field.value) {
      setPriority(
        priorities.find((priority) => priority.id === field.value) || {},
      );
    } else if (field.priority) {
      setPriority(
        priorities.find((priority) => priority.id === field.priority) || {},
      );
    } else {
      setPriority({
        id: "NO_PRIORITY",
        icon: IconAntennaBars1,
        label: "No Priority",
      });
    }
  }, [field]);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen} className="">
        <PopoverTrigger
          render={
            <Button
              className=""
              onClick={() => setOpen(!open)}
              variant={variant}
              size={size}
            >
              <currentIcon.icon className="size-5" />
              {showLabel && priority.label}
            </Button>
          }
        />
        {!noCommand && (
          <PopoverContent align="center" className="w-max p-0 " side="bottom">
            <CommandBasic
              setPriority={setPriority}
              priorities={priorities}
              setOpen={setOpen}
              field={field}
              item={field?.priority}
            />
          </PopoverContent>
        )}
      </Popover>
    </>
  );
}
