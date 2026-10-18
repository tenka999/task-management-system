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

import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { CommandHoursEstimate } from "./command-hours-estimate";

export function PopoverHour({
  variant = "outline",
  noCommand = false,
  showLabel = false,
  size = "sm",
  field,
}) {
  // if (!field) return;
  const [open, setOpen] = useState(false);
  console.log("acrual", field?.actualTime);
  const [actualHours, setActualHours] = useState(0);

  useEffect(() => {
    if (!field) return;
    if (field?.actualTime !== null) {
      setActualHours(field?.actualTime);
    } else {
      setActualHours(0);
    }
  }, [field]);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen} className="">
        <PopoverTrigger
          render={
            <Button
              className="ml-1 p-2"
              onClick={() => setOpen(!open)}
              variant={variant}
              size={size}
            >
              <IconPlayerPlayFilled className="size-4" />
              {showLabel && actualHours >= 0 && <span>{actualHours}h</span>}
            </Button>
          }
        />
        {!noCommand && (
          <PopoverContent align="center" className="w-max p-0 " side="bottom">
            <CommandHoursEstimate
              setActualHours={setActualHours}
              setOpen={setOpen}
              field={field}
              item={field?.actualHours}
            />
          </PopoverContent>
        )}
      </Popover>
    </>
  );
}
