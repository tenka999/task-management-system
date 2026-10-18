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
import { useTaskApi } from "@/presentation/logics/app/useTask";
import { useProjectApi } from "@/presentation/logics/app/useProject";
import { toast } from "./ui/toast";

export function CommandHoursEstimate({
  setPriority,
  setOpen,
  priorities,
  field,
  item,
}) {
  const { useTaskById, updateTaskPriority } = useTaskApi();
  const { useProjectById, updateProjectPriority } = useProjectApi();

  const handleSelect = async (id, label) => {
    setOpen(false);
    setPriority({ id, label });
    if (!item) field?.onChange(id);
    if (field?.name) {
      try {
        await updateProjectPriority.mutateAsync({
          id: field.id,
          payload: { priority: id },
        });
        toast.add({
          title: "Success",
          description: "Project priority updated successfully",
        });
      } catch (e) {
        console.log("error", e);
      }
    } else if (field?.title) {
      console.log("update", id, label);
      await updateTaskPriority.mutateAsync({
        id: field.id,
        payload: { priority: id },
      });
      toast.add({
        title: "Success",
        description: "Task priority updated successfully",
      });
    }
    // (field?.onChange(priority.id),
  };
  return (
    <Command className="px-1 py-1 pt-2 ">
      <CommandInput placeholder="Set Priority" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup defaultvalues={field?.value}></CommandGroup>
      </CommandList>
    </Command>
  );
}
