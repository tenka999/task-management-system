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

import { useProjectFilter } from "@/hooks/useHealthFilter";

export function PopoverFilter({ item }) {
  const { healthFilter, priorityFilter } = useProjectFilter();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Popover className=" ">
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              size="default"
              className="gap-3 relative"
              aria-label="Go Back"
            >
              <ListFilter />
              Filter
              {priorityFilter.length > 0 || healthFilter.length > 0 ? (
                <span
                  className="
                absolute
                -right-1.5
                -top-1.5
                flex
                size-4.5
                items-center
                justify-center
                rounded-full
                border
                bg-foreground
                text-background
                text-[11px]
                font-medium
                leading-none
                shadow-sm
              "
                >
                  {priorityFilter.length + healthFilter.length}
                </span>
              ) : null}
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
