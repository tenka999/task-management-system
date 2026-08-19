// import React from "react";
// import { Paper, Typography, Box } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";

// const columns = [
//   { field: "id", headerName: "ID", width: 90 },
//   { field: "customer", headerName: "Customer", width: 150 },
//   { field: "product", headerName: "Product", width: 150 },
//   { field: "amount", headerName: "Amount", width: 130 },
//   { field: "status", headerName: "Status", width: 130 },
//   { field: "date", headerName: "Date", width: 150 },
// ];

// const rows = [
//   {
//     id: 1,
//     customer: "John Doe",
//     product: "Laptop",
//     amount: 1299,
//     status: "Delivered",
//     date: "2024-01-15",
//   },
//   {
//     id: 2,
//     customer: "Jane Smith",
//     product: "Phone",
//     amount: 799,
//     status: "Processing",
//     date: "2024-01-14",
//   },
//   {
//     id: 3,
//     customer: "Bob Johnson",
//     product: "Tablet",
//     amount: 499,
//     status: "Shipped",
//     date: "2024-01-13",
//   },
//   {
//     id: 4,
//     customer: "Alice Brown",
//     product: "Headphones",
//     amount: 199,
//     status: "Pending",
//     date: "2024-01-12",
//   },
//   {
//     id: 5,
//     customer: "Charlie Wilson",
//     product: "Monitor",
//     amount: 349,
//     status: "Delivered",
//     date: "2024-01-11",
//   },
// ];

// const Orders = () => {
//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>
//         Orders Management
//       </Typography>
//       <Paper sx={{ height: 400, width: "100%" }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           pageSize={5}
//           rowsPerPageOptions={[5]}
//           checkboxSelection
//           disableSelectionOnClick
//         />
//       </Paper>
//     </Box>
//   );
// };

// export default Orders;
