import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Tags } from "tabler-icons-react";

import { IconCircleFilled } from "@tabler/icons-react";

import { useState } from "react";
import { CommandLabel } from "./command-label";
import { useLabelApi } from "@/presentation/logics/app/useLabel";
import { useWorkspace } from "@/hooks/useWorkspace";
// const labels = [
//   {
//     labelId: "ui-enhancement",
//     name: "UI Enhancement",
//     color: "#8b008f",
//     count: 34,
//   },
//   {
//     labelId: "bug",
//     name: "Bug",
//     color: "#ff0000",
//     count: 40,
//   },
//   {
//     labelId: "feature",
//     name: "Feature",
//     color: "#008000",
//     count: 52,
//   },
//   {
//     labelId: "documentation",
//     name: "Documentation",
//     color: "#0000ff",
//     count: 37,
//   },
//   {
//     labelId: "refactor",
//     name: "Refactor",
//     color: "#ffff00",
//     count: 33,
//   },
//   {
//     labelId: "performance",
//     name: "Performance",
//     color: "#ffa500",
//     count: 37,
//   },
//   {
//     labelId: "design",
//     name: "Design",
//     color: "#ffb6c1",
//     count: 35,
//   },
//   {
//     labelId: "security",
//     name: "Security",
//     color: "#808080",
//     count: 26,
//   },
//   {
//     labelId: "accessibility",
//     name: "Accessibility",
//     color: "#5c008f",
//     count: 36,
//   },
// ];

export function PopoverLabel({ field, variant = "outline" }) {
  const [open, setOpen] = useState(false);

  // Nilai label sekarang berasal dari React Hook Form
  const selectedLabels = field.value || [];
  console.log(field.value);
  const { activeWorkspace } = useWorkspace();
  const { useAllLabels } = useLabelApi();
  const { data: labels } = useAllLabels(activeWorkspace?.id);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant={variant}
            size="sm"
            className="relative ml-1 gap-2 text-xs"
          >
            <Tags className="size-5" />

            <div className="flex items-center">
              {selectedLabels.map((item) => (
                <IconCircleFilled
                  key={item.labelId}
                  className="size-4 first:ml-0 -ml-1.5"
                  color={item.color}
                />
              ))}
            </div>
          </Button>
        }
      />

      <PopoverContent align="center" className="w-full p-0" side="bottom">
        <CommandLabel
          label={selectedLabels}
          labels={labels}
          setLabel={field.onChange}
          setOpen={setOpen}
        />
      </PopoverContent>
    </Popover>
  );
}
