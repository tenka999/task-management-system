// import React from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemButton,
//   ListItemText,
//   Toolbar,
//   Divider,
//   Typography,
//   Box,
// } from "@mui/material";
// import {
//   Dashboard as DashboardIcon,
//   ShoppingCart as OrdersIcon,
//   Inventory as ProductsIcon,
//   People as CustomersIcon,
//   Settings as SettingsIcon,
// } from "@mui/icons-material";
// import { NavLink } from "react-router-dom";

// const drawerWidth = 240;

// const menuItems = [
//   { path: "/", label: "Dashboard", icon: <DashboardIcon /> },
//   { path: "/orders", label: "Orders", icon: <OrdersIcon /> },
//   { path: "/products", label: "Products", icon: <ProductsIcon /> },
//   { path: "/customers", label: "Customers", icon: <CustomersIcon /> },
//   { path: "/settings", label: "Settings", icon: <SettingsIcon /> },
// ];

// const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
//   const drawer = (
//     <div>
//       <Toolbar>
//         <Typography
//           variant="h6"
//           noWrap
//           component="div"
//           sx={{ fontWeight: "bold" }}
//         >
//           Admin Panel
//         </Typography>
//       </Toolbar>
//       <Divider />
//       <List>
//         {menuItems.map((item) => (
//           <ListItem disablePadding key={item.path}>
//             <ListItemButton
//               component={NavLink}
//               to={item.path}
//               sx={{
//                 "&.active": {
//                   backgroundColor: "primary.main",
//                   color: "white",
//                   "& .MuiListItemIcon-root": {
//                     color: "white",
//                   },
//                 },
//               }}
//             >
//               <ListItemIcon>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.label} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <Box
//       component="nav"
//       sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//     >
//       <Drawer
//         variant="temporary"
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{
//           keepMounted: true,
//         }}
//         sx={{
//           display: { xs: "block", sm: "none" },
//           "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
//         }}
//       >
//         {drawer}
//       </Drawer>
//       <Drawer
//         variant="permanent"
//         sx={{
//           display: { xs: "none", sm: "block" },
//           "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
//         }}
//         open
//       >
//         {drawer}
//       </Drawer>
//     </Box>
//   );
// };

// export default Sidebar;
