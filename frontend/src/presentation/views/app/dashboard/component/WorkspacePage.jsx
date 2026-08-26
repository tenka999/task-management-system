import { ButtonGroupDemo } from "@/components/button-group";
import { ItemLink } from "@/components/item-link";
import { ToggleGroupOutline } from "@/components/toggle-group";
import { Button } from "@/components/ui/button";
import { PanelLeft, Plus, PlusIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import * as React from "react";
import { MemberFilterProvider } from "@/context/MemberFilterProvider";
import { ItemTask } from "@/components/item-task";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { IconX } from "@tabler/icons-react";
import { PopoverMembers } from "@/components/popover-members";

export const projects = [
  {
    id: 1,
    name: "Task Management System",
    status: "In Progress",
    members: 5,
    createdAt: "2026-08-20",
  },
  {
    id: 2,
    name: "Company Profile",
    status: "Completed",
    members: 3,
    createdAt: "2026-08-18",
  },
  {
    id: 3,
    name: "E-Commerce Platform",
    status: "Planning",
    members: 8,
    createdAt: "2026-08-15",
  },
  {
    id: 4,
    name: "Mobile Application",
    status: "In Progress",
    members: 6,
    createdAt: "2026-08-12",
  },
  {
    id: 5,
    name: "Mobile Application",
    status: "In Progress",
    members: 6,
    createdAt: "2026-08-12",
  },
  {
    id: 6,
    name: "Mobile Application",
    status: "In Progress",
    members: 6,
    createdAt: "2026-08-12",
  },
  {
    id: 7,
    name: "Mobile Application",
    status: "In Progress",
    members: 6,
    createdAt: "2026-08-12",
  },
  {
    id: 8,
    name: "Mobile Application",
    status: "In Progress",
    members: 6,
    createdAt: "2026-08-12",
  },
];

// import { DataTable } from "@/components/data-table";
// import { columns } from "@/components/column";
// import DataTableDemo from "@/components/datatable-demo";
// import { DataTableDemo } from "@/components/datatable-demo";
import { SimpleDataTable } from "@/components/simple-datatable";
import { DataTableDemo } from "@/components/datatable-demo";

export default function WorkspacePage() {
  const inputRef = React.useRef(null);

  const [inputMember, setInputMember] = useState("");

  function handleInputMember(event) {
    setInputMember(event.target.value);
  }
  const handleClear = () => {
    setInputMember("");
    inputRef.current?.focus();
  };
  const [toggleProject, setToggleProject] = useState("all");
  return (
    <MemberFilterProvider>
      <ScrollArea className="w-full h-[calc(100vh)]">
        <div className="w-full p-[2rem] pt-[3rem]">
          <div className="flex flex-col gap-4">
            <div className="">
              <h1 className="font-bold text-4xl">Manage members</h1>
            </div>
            <div className="">
              <InputGroup className="h-13">
                <InputGroupInput
                  ref={inputRef}
                  className="text-base!"
                  value={inputMember}
                  onChange={(e) => handleInputMember(e)}
                  placeholder="Search or invite by email"
                />
                <InputGroupAddon>
                  <SearchIcon className="size-4 shrink-0 opacity-50" />
                </InputGroupAddon>
                <InputGroupAddon onClick={handleClear} align="inline-end">
                  <InputGroupButton variant="outline" size="icon">
                    <IconX />
                  </InputGroupButton>
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    variant="default"
                    size="sm"
                    className="ml-auto"
                  >
                    <PlusIcon />
                    Invite members
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className="">
              <PopoverMembers />
            </div>
            <div className="">
              {/* <SimpleDataTable /> */}
              <DataTableDemo />
              {/* <DataTable columns={columns} data={projects} /> */}
            </div>
            <div className="dashboard-top-actions">
              <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                  <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="px-4 lg:px-6"></div>
          </div>
        </div>
      </ScrollArea>
    </MemberFilterProvider>
  );
}
