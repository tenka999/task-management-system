import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { useAppTable } from "@/lib/table-config";

export function DataTable({ columns, data }) {
  const table = useAppTable({
    key: "projects",

    data,
    columns,

    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  const rows = table.getRowModel().rows;

  return (
    <div className="space-y-4">
      {/* SEARCH */}
      {/* <div>
        <Input
          placeholder="Search project..."
          className="max-w-sm"
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) => {
            table.getColumn("name")?.setFilterValue(event.target.value);
          }}
        />
      </div> */}

      {/* TABLE */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <table.AppHeader key={header.id} header={header}>
                    {(header) => (
                      <TableHead>
                        {header.isPlaceholder ? null : <header.FlexRender />}
                      </TableHead>
                    )}
                  </table.AppHeader>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getAllCells().map((cell) => (
                    <table.AppCell key={cell.id} cell={cell}>
                      {(cell) => (
                        <TableCell>
                          <cell.FlexRender />
                        </TableCell>
                      )}
                    </table.AppCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <span className="text-sm text-muted-foreground">
          Page {table.state.pagination.pageIndex + 1}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
