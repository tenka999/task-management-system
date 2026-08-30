import { ItemLink } from "@/components/item-link";
import { ToggleGroupOutline } from "@/components/toggle-group";
import { Button } from "@/components/ui/button";
import { PanelLeft, Plus } from "lucide-react";
import { useState } from "react";
import * as React from "react";
// import { ProjectFilterProvider } from "@/context/ProjectFilterContext";

import { ProjectFilterProvider } from "@/context/FilterProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProjectDialog from "@/components/project-dialog";
import { ButtonGroupSprint } from "@/components/button-group-sprint";
export default function SprintPage() {
  // const [healthFilter, setHealthFilter] = React.useState([]);

  const handleSuccess = () => {};
  const [toggleProject, setToggleProject] = useState("all");
  return (
    <ProjectFilterProvider>
      <div className="sticky top-(--header-height) z-50  flex flex-col w-full items-center bg-background">
        <div className="flex h-[50px]   items-center  w-full border-b px-5  ">
          <div className="flex  w-full justify-between  ">
            <ToggleGroupOutline setToggleProject={setToggleProject} />
            <ButtonGroupSprint />
          </div>
        </div>
        <div className="flex h-[30px]   items-center  w-full border-b  px-5  ">
          <div className=" flex  w-full justify-between   ">
            <p className="text-sm font-light opacity-50 w-[70%] pl-7  ">Name</p>
            <p className="text-sm font-light opacity-50 w-[12%]  ">Health</p>
            <p className="text-sm font-light opacity-50 w-[6%] ">Priority</p>
            <p className="text-sm font-light opacity-50 w-[12%] pl-3 ">
              Status
            </p>
          </div>
        </div>
      </div>
      <div className=" w-full  ">
        <ScrollArea className="w-full h-[calc(100vh-140px)]">
          <ItemLink />
        </ScrollArea>
      </div>
    </ProjectFilterProvider>
  );
}
