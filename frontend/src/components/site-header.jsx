"use client";

import { SidebarIcon } from "lucide-react";

// import { SearchForm } from "@/components/search-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { ButtonGroupDemo } from "@/components/button-group";
import { ToggleGroupOutline } from "@/components/toggle-group";
import { useState } from "react";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const [toggleProject, setToggleProject] = useState("all");

  return (
    <>
      <header className="sticky top-0 z-50 flex w-full items-center border-b bg-background">
        <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
          <Button
            className="h-8 w-8"
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
          >
            <SidebarIcon />
          </Button>
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb className="hidden sm:block">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Input
            className="w-full sm:ml-auto sm:w-auto"
            type="search"
            placeholder="Search..."
          />
        </div>
      </header>
      {/* <div className="">
        <div className=" fixed top-(--header-height) z-50 flex w-full items-center  bg-background">
          <div className=" gap-2 flex h-[50px]   items-center justify-between border-b px-5 bg-background ">
            <ToggleGroupOutline setToggleProject={setToggleProject} />
            <ButtonGroupDemo />
          </div>
        </div>
      </div> */}
    </>
  );
}
