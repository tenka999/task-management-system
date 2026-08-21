"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";

import { IconCircleFilled } from "@tabler/icons-react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const asiggnedTask = [
  {
    id: "1",
    title: "Fix login bug",
    priority: "red",
    dueDate: "Today",
    statusBadge: "In Progress",
  },
  {
    id: "2",
    title: "Add new feature",
    priority: "yellow",
    dueDate: "Tomorrow",
    statusBadge: "Not Started",
  },
  {
    id: "3",
    title: "Update documentation",
    priority: "green",
    dueDate: "This week",
    statusBadge: "Done",
  },
  {
    id: "4",
    title: "Fix styling issues",
    priority: "red",
    dueDate: "Next month",
    statusBadge: "In Progress",
  },
];

const createdTask = [
  {
    id: "1",
    title: "Fix styling issues",
    priority: "red",
    dueDate: "Next month",
    statusBadge: "In Progress",
  },
  {
    id: "2",
    title: "Update documentation",
    priority: "green",
    dueDate: "This week",
    statusBadge: "Done",
  },
  {
    id: "3",
    title: "Add new feature",
    priority: "yellow",
    dueDate: "Tomorrow",
    statusBadge: "Not Started",
  },

  {
    id: "4",
    title: "Fix login bug",
    priority: "red",
    dueDate: "Today",
    statusBadge: "In Progress",
  },
];

const watchingTask = [
  {
    id: "1",
    title: "Add new feature",
    priority: "yellow",
    dueDate: "Tomorrow",
    statusBadge: "Not Started",
  },
  {
    id: "2",
    title: "Fix login bug",
    priority: "red",
    dueDate: "Today",
    statusBadge: "In Progress",
  },

  {
    id: "3",
    title: "Fix styling issues",
    priority: "red",
    dueDate: "Next month",
    statusBadge: "In Progress",
  },
  {
    id: "4",
    title: "Update documentation",
    priority: "green",
    dueDate: "This week",
    statusBadge: "Done",
  },
];

export function CheckboxInTable({ tabVal }) {
  const [selectedRows, setSelectedRows] = React.useState(new Set());
  const tableData =
    tabVal === "assigned"
      ? asiggnedTask
      : tabVal === "created"
        ? createdTask
        : watchingTask;

  const selectAll = selectedRows.size === tableData.length;

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(new Set(tableData.map((row) => row.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id, checked) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRows(newSelected);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-8">
            <Checkbox
              id="select-all-checkbox"
              name="select-all-checkbox"
              checked={selectAll}
              onCheckedChange={handleSelectAll}
            />
          </TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Due date</TableHead>
          <TableHead>Status badge</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((row) => (
          <TableRow
            key={row.id}
            data-state={selectedRows.has(row.id) ? "selected" : undefined}
          >
            <TableCell>
              <Checkbox
                id={`row-${row.id}-checkbox`}
                name={`row-${row.id}-checkbox`}
                checked={selectedRows.has(row.id)}
                onCheckedChange={(checked) =>
                  handleSelectRow(row.id, checked === true)
                }
              />
            </TableCell>
            <TableCell className="font-medium">{row.title}</TableCell>
            <TableCell className="">
              <IconCircleFilled color={row.priority} />
            </TableCell>
            <TableCell>{row.dueDate}</TableCell>
            <TableCell>{row.statusBadge}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
