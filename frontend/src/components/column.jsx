import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { createAppColumnHelper } from "@/lib/table-config";

const columnHelper = createAppColumnHelper();

export const columns = [
  columnHelper.accessor("name", {
    header: "Project",

    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
  }),

  columnHelper.accessor("status", {
    header: "Status",

    cell: (info) => <span>{info.getValue()}</span>,
  }),

  columnHelper.accessor("members", {
    header: "Members",

    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("createdAt", {
    header: "Created",

    cell: (info) => info.getValue(),
  }),

  columnHelper.display({
    id: "actions",

    header: "",

    cell: ({ row }) => {
      const project = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                console.log("Edit", project);
              }}
            >
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                console.log("Delete", project);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
];
