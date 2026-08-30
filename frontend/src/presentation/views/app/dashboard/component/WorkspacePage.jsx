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
              {/* <SimpleDataTable /> */}
              <DataTableDemo inputMember={inputMember} />
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
