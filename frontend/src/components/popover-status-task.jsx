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
import { IconAlertSquareFilled } from "@tabler/icons-react";
import { CommandBasic } from "./command-basic";
import { useState } from "react";
import { StatusIcon } from "./status-icon";
import { CommandStatus } from "./command-status";

export function PopoverStatusTask({
  variant = "outline",
  item,
  showLabel = false,
  showPercent = false,
  size = "sm",
}) {
  const [status, setStatus] = useState({
    id: "inProgress",
    label: "In Progress",
  });

  const [open, setOpen] = useState(false);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen} className="">
        <PopoverTrigger
          render={
            <Button
              onClick={() => setOpen(!open)}
              variant={variant}
              size={size}
              className=" gap-2 text-xs"
            >
              {/* <CircleCheck className="size-4" /> */}
              <StatusIcon status={status.id} />
              {showLabel && status.label}
              {showPercent && "70%"}
            </Button>
          }
        />
        <PopoverContent align="center" className="w-full p-0 " side="bottom">
          <CommandStatus setStatus={setStatus} open={open} setOpen={setOpen} />
        </PopoverContent>
      </Popover>
    </>
  );
}
