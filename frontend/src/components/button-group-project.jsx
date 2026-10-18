"use client";
import * as React from "react";
import {
  ArchiveIcon,
  ArrowLeftIcon,
  CalendarPlusIcon,
  ClockIcon,
  ListFilterIcon,
  MailCheckIcon,
  MoreHorizontalIcon,
  TagIcon,
  Trash2Icon,
  ListFilter,
  SlidersHorizontal,
  ChartColumn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PopoverFilter } from "./popover-filter";
import TaskDialog from "./task-dialog";
import ProjectDialog from "./project-dialog";
import { useWorkspace } from "@/hooks/useWorkspace";
import SecureStorage from "@/helpers/SecureStorage";
export function ButtonGroupProject() {
  const [label, setLabel] = React.useState("personal");
  const handleSuccess = () => {};
  const { activeWorkspace } = useWorkspace();
  const use = SecureStorage.getStorage("user");
  return (
    <ButtonGroup>
      <ButtonGroup className="hidden sm:flex">
        <ProjectDialog
          mode="create"
          workspaceId={activeWorkspace?.id}
          createdById={use?.id}
          onSuccess={handleSuccess}
        />
      </ButtonGroup>
      <ButtonGroup className="hidden sm:flex">
        <PopoverFilter />
      </ButtonGroup>
      <ButtonGroup className="hidden sm:flex">
        <Button variant="outline" size="icon" aria-label="Go Back">
          <SlidersHorizontal />
        </Button>
      </ButtonGroup>
      <ButtonGroup className="hidden sm:flex">
        <Button variant="outline" size="icon" aria-label="Go Back">
          <ChartColumn />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
}
