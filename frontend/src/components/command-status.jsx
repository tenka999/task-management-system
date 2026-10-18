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
import { useTaskApi } from "@/presentation/logics/app/useTask";
import { useProjectApi } from "@/presentation/logics/app/useProject";
import { toast } from "./ui/toast";

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

export function CommandStatus({ setStatus, setOpen, open, field, item }) {
  const { updateTaskStatus } = useTaskApi();
  const { updateProjectStatus } = useProjectApi();

  const handleSelect = async (id, label) => {
    setOpen(false);
    setStatus({ id, label });
    if (!item) field?.onChange(id);
    if (field?.name) {
      try {
        await updateProjectStatus.mutateAsync({
          id: field.id,
          payload: { status: id },
        });
        toast.add({
          title: "Success",
          description: "Project Status updated successfully",
        });
      } catch (e) {
        console.log("error", e);
      }
    } else if (field?.title) {
      console.log("update", id, label);
      await updateTaskStatus.mutateAsync({
        id: field.id,
        payload: { status: id },
      });
      toast.add({
        title: "Success",
        description: "Task status updated successfully",
      });
    }
  };
  console.log("f", field);

  return (
    <Command className="px-1  py-1 pt-2  w-[210px]">
      <CommandInput placeholder="Set Priority" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              onSelect={() => {
                handleSelect(status.id, status.label);
              }}
              key={status.id}
              value={status.id}
              className="gap-2 text-sm"
            >
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
