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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ProgressWithLabel } from "./progress-with-label";
import { AvatarGroupMember } from "./avatar-group-count";

const tableData = [
  {
    id: "1",
    name: "Fix login bug",
    progressBar: 60,
    taskOpen: 10,
    teamMemberAvatars: 5,
  },
  {
    id: "2",
    name: "Add new feature",
    progressBar: 30,
    taskOpen: 8,
    teamMemberAvatars: 8,
  },
  //   {
  //     id: "3",
  //     name: "Update documentation",
  //     progressBar: 80,
  //     taskOpen: 5,
  //     teamMemberAvatars: 7,
  //   },
];

export function CardProject() {
  const [selectedRows, setSelectedRows] = React.useState(new Set());

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
    <>
      {tableData.map((row) => (
        <Card size="sm">
          {/* <CardHeader> */}
          {/* </CardHeader> */}
          <CardContent>
            <CardTitle>{row.name}</CardTitle>
            <ProgressWithLabel value={row.progressBar} />
          </CardContent>
          <CardFooter className="flex-col items-end gap-1.5 text-sm">
            <div className="text-muted-foreground">
              <AvatarGroupMember avatarCount={row.teamMemberAvatars} />
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
