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
import { IconAlertSquareFilled, IconFilter } from "@tabler/icons-react";
import { CommandBasic } from "./command-basic";
import { useState } from "react";
import { ListFilter } from "lucide-react";
import { CommandFilter } from "./command-filter";

import { useMemberFilter } from "@/hooks/useMemberFilter";
import { CommandMembers } from "./command-members";

const memberStatus = [
  {
    id: "all-users",
    label: "All User",
    count: 0,
  },
  {
    id: "admin",
    label: "Admins",
    count: 2,
  },
  {
    id: "member",
    label: "Members",
    count: 4,
  },
  {
    id: "guest",
    label: "Guests",
    count: 1,
  },
];

export function PopoverMembers({ item }) {
  const { memberFilter, setMemberFilter } = useMemberFilter();
  const [open, setOpen] = useState(false);
  const countAllUsers = memberStatus
    .map((status) => status.count)
    .reduce((a, b) => a + b, 0);
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              variant="secondary"
              size="default"
              className="gap-3 relative"
              aria-label="Go Back"
            >
              <IconFilter />
              {memberFilter !== "all-users" &&
                memberStatus.find((status) => status.id === memberFilter).label}
              {memberFilter === "all-users" && "All Users"} (
              {memberFilter !== "all-users" &&
                memberStatus.find((status) => status.id === memberFilter).count}
              {memberFilter === "all-users" && countAllUsers})
            </Button>
          }
        />
        <PopoverContent align="start" className="w-max p-0 " side="bottom">
          <CommandMembers
            memberStatus={memberStatus}
            setOpen={setOpen}
            // setActiveMemberStatus={setActiveMemberStatus}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
