import React from "react";
import { Paper, Typography, Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Product Name", width: 200 },
  { field: "category", headerName: "Category", width: 150 },
  { field: "price", headerName: "Price", width: 130 },
  { field: "stock", headerName: "Stock", width: 130 },
  { field: "status", headerName: "Status", width: 130 },
];

const rows = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: 1299,
    stock: 45,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Phone",
    category: "Electronics",
    price: 799,
    stock: 30,
    status: "In Stock",
  },
  {
    id: 3,
    name: "Tablet",
    category: "Electronics",
    price: 499,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: 4,
    name: "Headphones",
    category: "Audio",
    price: 199,
    stock: 60,
    status: "In Stock",
  },
  {
    id: 5,
    name: "Monitor",
    category: "Electronics",
    price: 349,
    stock: 15,
    status: "In Stock",
  },
];

const Products = () => {
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Products Management</Typography>
        <Button variant="contained" color="primary">
          Add Product
        </Button>
      </Box>
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

export default Products;
