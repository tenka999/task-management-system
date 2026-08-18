import React from "react";
import { Grid, Paper, Box } from "@mui/material";
import {
  ShoppingCart,
  AttachMoney,
  People,
  TrendingUp,
} from "@mui/icons-material";
import StatsCard from "../StatsCard";
import ChartWidget from "../ChartWidget";
import RecentOrders from "../RecentOrders";

const Dashboard = () => {
  const chartData = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 5000 },
    { name: "Apr", value: 7000 },
    { name: "May", value: 6000 },
    { name: "Jun", value: 8000 },
  ];

  const statsData = [
    {
      title: "Revenue",
      value: "$54,234",
      icon: <AttachMoney sx={{ color: "white" }} />,
      trend: 12.5,
      color: "#1976d2",
    },
    {
      title: "Orders",
      value: "1,234",
      icon: <ShoppingCart sx={{ color: "white" }} />,
      trend: 8.2,
      color: "#2e7d32",
    },
    {
      title: "Customers",
      value: "5,678",
      icon: <People sx={{ color: "white" }} />,
      trend: -3.1,
      color: "#ed6c02",
    },
    {
      title: "Growth",
      value: "23.5%",
      icon: <TrendingUp sx={{ color: "white" }} />,
      trend: 5.8,
      color: "#9c27b0",
    },
  ];

  return (
    <>
      <Box>
        <Grid container spacing={3}>
          {statsData.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatsCard {...stat} />
            </Grid>
          ))}
          <Grid item xs={12} md={8}>
            <ChartWidget data={chartData} title="Revenue Overview" />
          </Grid>
          <Grid item xs={12} md={4}>
            <ChartWidget
              data={chartData}
              title="Sales Distribution"
              type="bar"
            />
          </Grid>
          <Grid item xs={12}>
            <RecentOrders />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
