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
import { useEffect, useState } from "react";
import { StatusIcon } from "./status-icon";
import { CommandStatus } from "./command-status";

const STATUS_CONFIG = {
  inProgress: {
    id: "inProgress",
    color: "#facc15",
    type: "progress",
  },

  technicalReview: {
    id: "technicalReview",
    color: "#22c55e",
    type: "review",
  },

  done: {
    id: "done",
    color: "#6366f1",
    type: "check",
  },

  paused: {
    id: "paused",
    color: "#06b6d4",
    type: "pause",
  },

  todo: {
    id: "todo",
    color: "#94a3b8",
    type: "empty",
  },

  backlog: {
    id: "backlog",
    color: "#94a3b8",
    type: "dotted",
  },

  triage: {
    id: "triage",
    color: "#f97316",
    type: "arrow",
  },

  idea: {
    id: "idea",
    color: "#6366f1",
    type: "dotted",
  },

  "product-feedback": {
    id: "product-feedback",
    color: "#f59e0b",
    type: "feedback",
  },

  blocked: {
    id: "blocked",
    color: "#ef4444",
    type: "blocked",
  },

  shipped: {
    id: "shipped",
    color: "#34d399",
    type: "check",
  },
};

export function PopoverStatus({
  variant = "outline",
  item,
  showLabel = false,
  showPercent = false,
  size = "sm",
  field,
}) {
  // if (!field) return;

  const [status, setStatus] = useState({
    id: "inProgress",
    label: "In Progress",
  });

  console.log("status", status);

  const [open, setOpen] = useState(false);
  console.log(field);
  useEffect(() => {
    if (field?.status) {
      setStatus(STATUS_CONFIG[field.status]);
      console.log("status", STATUS_CONFIG[field.status]);
    } else {
      setStatus({
        id: "inProgress",
        label: "In Progress",
      });
    }
  }, [field?.status]);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen} className="">
        <PopoverTrigger
          className=""
          render={
            <Button
              onClick={() => setOpen(!open)}
              variant={variant}
              size={size}
              className=" gap-2 text-xs ml-1"
            >
              {/* <CircleCheck className="size-4" /> */}
              <StatusIcon status={status.id} />
              {showLabel && status.label}
              {showPercent && "70%"}
            </Button>
          }
        />
        <PopoverContent align="center" className="w-full p-0 " side="bottom">
          <CommandStatus
            setStatus={setStatus}
            open={open}
            setOpen={setOpen}
            field={field}
            item={field?.status}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
