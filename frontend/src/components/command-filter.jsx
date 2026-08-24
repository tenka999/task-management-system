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
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  IconAlertSquareFilled,
  IconAntennaBars1,
  IconAntennaBars3,
  IconAntennaBars4,
  IconAntennaBars5,
  IconArrowRight,
  IconArrowsSort,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconFilter2X,
  IconHeartbeat,
} from "@tabler/icons-react";
import {
  ChartColumn,
  CircleAlert,
  CircleCheck,
  CircleQuestionMark,
  CircleX,
} from "lucide-react";
import { Toggle } from "./ui/toggle";

import { useProjectFilter } from "@/hooks/useHealthFilter";
// import { useProjectFilter } from "@/context/ProjectFilterContext";
export function CommandFilter() {
  // const [menu, setMenu] = React.useState(true);
  // const [health, setHealth] = React.useState(false);
  const [priority, setPriority] = React.useState(false);

  const { filterProject, setFilterProject } = useProjectFilter();
  const { healthFilter, setHealthFilter } = useProjectFilter();
  const { priorityFilter, setPriorityFilter } = useProjectFilter();
  const { sortFilter, setSortFilter } = useProjectFilter();

  const toggleHealthFilter = (val) => {
    if (healthFilter.includes(val)) {
      setHealthFilter(healthFilter.filter((item) => item !== val));
    } else {
      setHealthFilter([...healthFilter, val]);
    }
  };

  const togglePriorityFilter = (val) => {
    if (priorityFilter.includes(val)) {
      setPriorityFilter(priorityFilter.filter((item) => item !== val));
    } else {
      setPriorityFilter([...priorityFilter, val]);
    }
  };

  function handleFilterProject(val) {
    setFilterProject([val]);
  }

  function handleClearFilter() {
    setHealthFilter([]);
    setPriorityFilter([]);
    setSortFilter([]);
  }
  return (
    <Command className="px-0 py-1  ">
      <CommandList>
        {filterProject[0] === "menu" ? (
          <CommandGroup className="min-w-[250px]">
            <CommandItem
              onSelect={() => handleFilterProject("health")}
              className=""
            >
              <IconHeartbeat className="size-5 " />
              Health
              <CommandShortcut className="flex items-center">
                {healthFilter.length > 0 ? healthFilter.length : ""}
                <IconChevronRight stroke={2} />
              </CommandShortcut>
            </CommandItem>

            <CommandItem onSelect={() => handleFilterProject("priority")}>
              <ChartColumn className="size-5" />
              Priority
              <CommandShortcut className="flex items-center">
                {priorityFilter.length > 0 ? priorityFilter.length : ""}
                <IconChevronRight stroke={2} />
              </CommandShortcut>
            </CommandItem>

            <CommandItem onSelect={() => handleFilterProject("sort")}>
              <IconArrowsSort className="size-5" />
              Sort by
              <CommandShortcut>
                <IconChevronRight stroke={2} />
              </CommandShortcut>
            </CommandItem>
            {priorityFilter.length > 0 || healthFilter.length > 0 ? (
              <>
                <CommandSeparator className="bg-secondary-foreground opacity-20" />
                <CommandItem onSelect={handleClearFilter}>
                  <IconFilter2X className="size-5" />
                  Clear All Filter
                </CommandItem>
              </>
            ) : null}
          </CommandGroup>
        ) : filterProject[0] === "health" ? (
          <>
            <div className="flex items-center gap-2 px-3 pt-1.5">
              <Button
                variant="outline"
                className="size-7"
                onClick={() => handleFilterProject("menu")}
              >
                <IconChevronLeft stroke={2} />
              </Button>
              Health
            </div>
            <CommandSeparator className="bg-secondary-foreground opacity-20" />

            <CommandInput placeholder="Search health..." />
            <CommandSeparator className="bg-secondary-foreground opacity-20" />

            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup className="min-w-[250px]">
              <CommandItem onSelect={() => toggleHealthFilter("No Update")}>
                <div className="flex  gap-2 ">
                  <CircleQuestionMark color="#94a3b8" className="size-5" />
                  No Update
                </div>
                {healthFilter.includes("No Update") && (
                  <CommandShortcut>
                    <IconCheck />
                  </CommandShortcut>
                )}
              </CommandItem>

              <CommandItem onSelect={() => toggleHealthFilter("Off Track")}>
                <CircleX color="#ef4444" className="size-5" />
                Off Track
                {healthFilter.includes("Off Track") && (
                  <CommandShortcut>
                    <IconCheck />
                  </CommandShortcut>
                )}
              </CommandItem>

              <CommandItem onSelect={() => toggleHealthFilter("On Track")}>
                <CircleCheck color="#22c55e" className="size-5" />
                On Track
                {healthFilter.includes("On Track") && (
                  <CommandShortcut>
                    <IconCheck />
                  </CommandShortcut>
                )}
              </CommandItem>

              <CommandItem onSelect={() => toggleHealthFilter("At Risk")}>
                <CircleAlert color="#f59e0b" className="size-5" />
                At Risk
                {healthFilter.includes("At Risk") && (
                  <CommandShortcut>
                    <IconCheck />
                  </CommandShortcut>
                )}
              </CommandItem>
            </CommandGroup>
          </>
        ) : filterProject[0] === "priority" ? (
          <>
            <div className="flex items-center gap-2 px-3 pt-1.5">
              <Button
                variant="outline"
                className="size-7"
                onClick={() => handleFilterProject("menu")}
              >
                <IconChevronLeft stroke={2} />
              </Button>
              Priority
            </div>
            <CommandSeparator className="bg-secondary-foreground opacity-20" />

            <CommandInput placeholder="Search priority..." />
            <CommandSeparator className="bg-secondary-foreground opacity-20" />

            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup className="min-w-[250px]">
              <CommandItem onSelect={() => togglePriorityFilter("No Priority")}>
                <IconAntennaBars1 className="size-5" />
                No Priority
                {priorityFilter.includes("No Priority") && (
                  <CommandShortcut>
                    <IconCheck />
                  </CommandShortcut>
                )}
              </CommandItem>
              <CommandItem onSelect={() => togglePriorityFilter("Urgent")}>
                <IconAlertSquareFilled className="size-5" />
                Urgent
                {priorityFilter.includes("Urgent") && (
                  <CommandShortcut>
                    <IconCheck />
                  </CommandShortcut>
                )}
              </CommandItem>
              <CommandItem onSelect={() => togglePriorityFilter("High")}>
                <IconAntennaBars5 className="size-5" />
                High
                {priorityFilter.includes("High") && (
                  <CommandShortcut>
                    <IconCheck />
                  </CommandShortcut>
                )}
              </CommandItem>
              <CommandItem onSelect={() => togglePriorityFilter("Medium")}>
                <IconAntennaBars4 className="size-5" />
                Medium
                {priorityFilter.includes("Medium") && (
                  <CommandShortcut>
                    <IconCheck />
                  </CommandShortcut>
                )}
              </CommandItem>
              <CommandItem onSelect={() => togglePriorityFilter("Low")}>
                <IconAntennaBars3 className="size-5" />
                Low
                {priorityFilter.includes("Low") && (
                  <CommandShortcut>
                    <IconCheck />
                  </CommandShortcut>
                )}
              </CommandItem>
            </CommandGroup>
          </>
        ) : (
          <>
            <div className="sticky top-0 bg-card z-10">
              <div className="  flex items-center gap-2 px-3 py-1.5">
                <Button
                  variant="outline"
                  className="size-7"
                  onClick={() => handleFilterProject("menu")}
                >
                  <IconChevronLeft stroke={2} />
                </Button>
                Sort By
              </div>
              <CommandSeparator className="bg-secondary-foreground opacity-20" />
            </div>

            <CommandGroup heading="Title" className="py-0 w-[250px]">
              <CommandItem onSelect={() => setSortFilter(["A to Z"])}>
                A <IconArrowRight /> Z
                {sortFilter.includes("A to Z") && (
                  <CommandShortcut>
                    <IconCheck />
                  </CommandShortcut>
                )}
              </CommandItem>
              <CommandItem onSelect={() => setSortFilter(["Z to A"])}>
                Z <IconArrowRight /> A
                {sortFilter.includes("Z to A") && (
                  <CommandShortcut>
                    <IconCheck />
                  </CommandShortcut>
                )}
              </CommandItem>
            </CommandGroup>
            <CommandSeparator className="bg-secondary-foreground opacity-20" />

            <CommandGroup heading="Targeted Date" className="py-0 w-[250px]">
              <CommandItem onSelect={() => setSortFilter(["oldest to newest"])}>
                Oldest to Newest
                {sortFilter.includes("oldest to newest") && (
                  <CommandShortcut>
                    <IconCheck />
                  </CommandShortcut>
                )}
              </CommandItem>
              <CommandItem onSelect={() => setSortFilter(["newest to oldest"])}>
                Newest to Oldest
                {sortFilter.includes("newest to oldest") && (
                  <CommandShortcut>
                    <IconCheck />
                  </CommandShortcut>
                )}
              </CommandItem>
            </CommandGroup>
            <CommandSeparator className="bg-secondary-foreground opacity-20" />

            <CommandGroup heading="Status" className="py-0 w-[250px]">
              <CommandItem
                onSelect={() => setSortFilter(["lowest to highest"])}
              >
                Lowest to Highest
                {sortFilter.includes("lowest to highest") && (
                  <CommandShortcut>
                    <IconCheck />
                  </CommandShortcut>
                )}
              </CommandItem>
              <CommandItem
                onSelect={() => setSortFilter(["highest to lowest"])}
              >
                Highest to Lowest
                {sortFilter.includes("highest to lowest") && (
                  <CommandShortcut>
                    <IconCheck />
                  </CommandShortcut>
                )}
              </CommandItem>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </Command>
  );
}
