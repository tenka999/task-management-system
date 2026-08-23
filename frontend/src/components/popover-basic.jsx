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

export function PopoverBasic({ item }) {
  return (
    <>
      <Popover className=" ">
        <PopoverTrigger
          render={
            <Button variant="outline" size="icon">
              <CircleCheck className="size-4" />
            </Button>
          }
        />
        <PopoverContent
          align="start"
          className="w-max  min-w-[450px] max-w-[90vw] gap-2 "
          side="left"
        >
          <PopoverHeader className="border-b-2 pb-2  ">
            <PopoverTitle className=" flex  justify-between items-center gap-8">
              <div className="flex text-sm gap-1 items-center">
                <item.icon className="size-4 shrink-0" />
                {item.workspace} - {item.name}
              </div>

              <div className="flex shrink-0 gap-2">
                <Button variant="secondary" size="xs">
                  Subcribe
                </Button>

                <Button variant="outline" size="xs">
                  New Update
                </Button>
              </div>
            </PopoverTitle>
          </PopoverHeader>
          <div className="flex flex-col items-start gap-1 ">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 ">
                <CircleCheck className="size-4" />
                On Track
              </div>
              <div className="flex items-center gap-2  ">
                <Avatar className="size-7">
                  <AvatarImage />
                  <AvatarFallback>as</AvatarFallback>
                </Avatar>
                <div className="opacity-50">mason.carter</div>
              </div>
              •<div className=" opacity-50">2/17/2026</div>
            </div>
            <div className="opacity-50">
              The Project is on track and on schedule
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
