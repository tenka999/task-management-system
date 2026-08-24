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

export function PopoverStatus({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Popover className=" ">
        <PopoverTrigger
          render={
            <Button
              onClick={() => setOpen(!open)}
              variant="outline"
              size="sm"
              className="gap-2 text-xs ml-1"
            >
              {/* <CircleCheck className="size-4" /> */}
              <StatusIcon status="inProgress" />
              {/* 60% */}
            </Button>
          }
        />
        <PopoverContent align="center" className="w-max p-0 " side="bottom">
          <CommandStatus />
        </PopoverContent>
      </Popover>
    </>
  );
}
