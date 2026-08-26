// src/components/data-table/simple-data-table.jsx
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const initialData = [
  {
    id: 1,
    name: "Ken Smith",
    email: "ken99@yahoo.com",
    status: "success",
    amount: 316,
  },
  {
    id: 2,
    name: "Abe Johnson",
    email: "Abe45@gmail.com",
    status: "success",
    amount: 242,
  },
  {
    id: 3,
    name: "Monserrat Garcia",
    email: "Monserrat44@gmail.com",
    status: "processing",
    amount: 837,
  },
  // Add more data as needed
];

export function SimpleDataTable() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [data, setData] = React.useState(initialData);

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <Badge>{row.status}</Badge>
                </TableCell>
                <TableCell>${row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
