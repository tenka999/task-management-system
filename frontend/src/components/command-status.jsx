"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  IconAlertSquareFilled,
  IconAntennaBars1,
  IconAntennaBars3,
  IconAntennaBars4,
  IconAntennaBars5,
} from "@tabler/icons-react";
import { StatusIcon } from "./status-icon";

const statuses = [
  {
    id: "inProgress",
    label: "In Progress",
  },
  {
    id: "technicalReview",
    label: "Technical Review",
  },
  {
    id: "done",
    label: "Done",
  },
  {
    id: "paused",
    label: "Paused",
  },
  {
    id: "todo",
    label: "Todo",
  },
  {
    id: "backlog",
    label: "Backlog",
  },
  {
    id: "triage",
    label: "Triage",
  },
  {
    id: "idea",
    label: "Idea",
  },
  {
    id: "product-feedback",
    label: "Product Feedback",
  },
  {
    id: "blocked",
    label: "Blocked",
  },
  {
    id: "shipped",
    label: "Shipped",
  },
];

export function CommandStatus() {
  return (
    <Command className="px-1 py-1  ">
      <CommandInput placeholder="Set Priority" className="" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem key={status.id} value={status.label} className="gap-2">
              <StatusIcon status={status.id} size={20} />

              <span>{status.label}</span>

              {/* {currentStatus === status.id && (
                <Check className="ml-auto size-4" />
              )} */}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
