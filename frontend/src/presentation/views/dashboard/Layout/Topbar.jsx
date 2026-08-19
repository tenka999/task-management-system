// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Badge,
//   Avatar,
//   Box,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import {
//   Menu as MenuIcon,
//   Notifications as NotificationsIcon,
//   Brightness4,
//   Brightness7,
// } from "@mui/icons-material";
// import { useTheme } from "@/context/ThemeProvider";

// const Topbar = ({ handleDrawerToggle }) => {
//   const { mode, toggleTheme } = useTheme();
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         zIndex: (theme) => theme.zIndex.drawer + 1,
//       }}
//     >
//       <Toolbar>
//         <IconButton
//           color="inherit"
//           edge="start"
//           onClick={handleDrawerToggle}
//           sx={{ mr: 2, display: { sm: "none" } }}
//         >
//           <MenuIcon />
//         </IconButton>
//         <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
//           Dashboard
//         </Typography>
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <IconButton color="inherit" onClick={toggleTheme}>
//             {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
//           </IconButton>
//           <IconButton color="inherit">
//             <Badge badgeContent={4} color="error">
//               <NotificationsIcon />
//             </Badge>
//           </IconButton>
//           <IconButton onClick={handleMenu} color="inherit">
//             <Avatar alt="Admin" src="/static/images/avatar/1.jpg" />
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleClose}
//           >
//             <MenuItem onClick={handleClose}>Profile</MenuItem>
//             <MenuItem onClick={handleClose}>My account</MenuItem>
//             <MenuItem onClick={handleClose}>Logout</MenuItem>
//           </Menu>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Topbar;
