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

export function PopoverPriority({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Popover className=" ">
        <PopoverTrigger
          render={
            <Button
              onClick={() => setOpen(!open)}
              variant="outline"
              size="icon"
            >
              <IconAlertSquareFilled className="size-5" />
            </Button>
          }
        />
        <PopoverContent align="center" className="w-max p-0 " side="bottom">
          <CommandBasic />
        </PopoverContent>
      </Popover>
    </>
  );
}
