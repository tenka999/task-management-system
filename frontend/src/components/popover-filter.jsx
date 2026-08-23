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
import { ListFilter } from "lucide-react";
import { CommandFilter } from "./command-filter";

export function PopoverFilter({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Popover className=" ">
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              size="default"
              className="gap-3"
              aria-label="Go Back"
            >
              <ListFilter />
              Filter
            </Button>
          }
        />
        <PopoverContent align="center" className="w-max p-0 " side="bottom">
          <CommandFilter />
        </PopoverContent>
      </Popover>
    </>
  );
}
