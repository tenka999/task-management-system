import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "phone", headerName: "Phone", width: 150 },
  { field: "orders", headerName: "Orders", width: 130 },
  { field: "totalSpent", headerName: "Total Spent", width: 150 },
];

const rows = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234-567-890",
    orders: 12,
    totalSpent: "$3,456",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 234-567-891",
    orders: 8,
    totalSpent: "$2,234",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+1 234-567-892",
    orders: 5,
    totalSpent: "$1,234",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    phone: "+1 234-567-893",
    orders: 15,
    totalSpent: "$4,567",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    phone: "+1 234-567-894",
    orders: 3,
    totalSpent: "$789",
  },
];

const Customers = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Customers Management
      </Typography>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Paper>
    </Box>
  );
};

export default Customers;
