// import React from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Chip,
// } from "@mui/material";

// const orders = [
//   {
//     id: 1,
//     customer: "John Doe",
//     product: "Laptop",
//     date: "2024-01-15",
//     status: "Delivered",
//   },
//   {
//     id: 2,
//     customer: "Jane Smith",
//     product: "Phone",
//     date: "2024-01-14",
//     status: "Processing",
//   },
//   {
//     id: 3,
//     customer: "Bob Johnson",
//     product: "Tablet",
//     date: "2024-01-13",
//     status: "Shipped",
//   },
//   {
//     id: 4,
//     customer: "Alice Brown",
//     product: "Headphones",
//     date: "2024-01-12",
//     status: "Pending",
//   },
// ];

// const statusColors = {
//   Delivered: "success",
//   Processing: "warning",
//   Shipped: "info",
//   Pending: "error",
// };

// const RecentOrders = () => {
//   return (
//     <Card>
//       <CardContent>
//         <Typography variant="h6" gutterBottom>
//           Recent Orders
//         </Typography>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Customer</TableCell>
//                 <TableCell>Product</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Status</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {orders.map((order) => (
//                 <TableRow key={order.id}>
//                   <TableCell>{order.customer}</TableCell>
//                   <TableCell>{order.product}</TableCell>
//                   <TableCell>{order.date}</TableCell>
//                   <TableCell>
//                     <Chip
//                       label={order.status}
//                       color={statusColors[order.status] || "default"}
//                       size="small"
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </CardContent>
//     </Card>
//   );
// };

// export default RecentOrders;
