import { ButtonGroupDemo } from "@/components/button-group";
import { ItemLink } from "@/components/item-link";
import { ToggleGroupOutline } from "@/components/toggle-group";
import { Button } from "@/components/ui/button";
import { PanelLeft, Plus } from "lucide-react";
import { useState } from "react";
import * as React from "react";
// import { ProjectFilterProvider } from "@/context/ProjectFilterContext";

import { ProjectFilterProvider } from "@/context/FilterProvider";
import { ItemTask } from "@/components/item-task";
import { ScrollArea } from "@/components/ui/scroll-area";
export default function TaskPage() {
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
      </div>
      <div className=" w-full  ">
        <ScrollArea className="w-full h-[calc(100vh-140px)]">
          <ItemTask />
        </ScrollArea>
      </div>
    </ProjectFilterProvider>
  );
}
