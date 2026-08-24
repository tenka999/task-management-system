import { ButtonGroupDemo } from "@/components/button-group";
import { ItemLink } from "@/components/item-link";
import { ToggleGroupOutline } from "@/components/toggle-group";
import { Button } from "@/components/ui/button";
import { PanelLeft, Plus } from "lucide-react";
import { useState } from "react";
import * as React from "react";
// import { ProjectFilterProvider } from "@/context/ProjectFilterContext";

import { ProjectFilterProvider } from "@/context/FilterProvider";
export default function ProjectPage() {
  // const [healthFilter, setHealthFilter] = React.useState([]);

  const [toggleProject, setToggleProject] = useState("all");
  return (
    <ProjectFilterProvider>
      <div className="sticky top-(--header-height) z-50  flex flex-col w-full items-center bg-background">
        <div className="flex h-[50px]   items-center  w-full border-b px-5  ">
          <div className="flex  w-full justify-between  ">
            <ToggleGroupOutline setToggleProject={setToggleProject} />
            <ButtonGroupDemo />
          </div>
        </div>
        <div className="flex h-[30px]   items-center  w-full border-b px-5  ">
          <div className="flex  w-full justify-between  ">
            <p className="text-sm font-light opacity-50 flex-10">Name</p>
            <p className="text-sm font-light opacity-50 flex-2">Health</p>
            <p className="text-sm font-light opacity-50 flex-1">Priority</p>
            <p className="text-sm font-light opacity-50 flex-2">Status</p>
          </div>
        </div>
      </div>
      <div className=" w-full  ">
        <ItemLink />
      </div>
    </ProjectFilterProvider>
  );
}
