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

// const memberStatus = [
//   {
//     id: "all-users",
//     label: "All User",
//     count: 0,
//   },
//   {
//     id: "admin",
//     label: "Admins",
//     count: 2,
//   },
//   {
//     id: "member",
//     label: "Members",
//     count: 4,
//   },
//   {
//     id: "guest",
//     label: "Guests",
//     count: 1,
//   },
// ];

export function PopoverMembers({
  item,
  roleFilter,
  setRoleFilter,
  memberStatus,
}) {
  const { memberFilter, setMemberFilter } = useMemberFilter();
  const [open, setOpen] = useState(false);
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
              {memberStatus.find((status) => status.id === memberFilter).count})
            </Button>
          }
        />
        <PopoverContent align="start" className="w-max p-0 " side="bottom">
          <CommandMembers
            memberStatus={memberStatus}
            setOpen={setOpen}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            // setActiveMemberStatus={setActiveMemberStatus}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
