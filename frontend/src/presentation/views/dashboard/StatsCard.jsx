import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const StatsCard = ({ title, value, icon, trend, color }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography color="textSecondary" variant="subtitle2">
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
              {value}
            </Typography>
            {trend && (
              <Box display="flex" alignItems="center" mt={1}>
                {trend > 0 ? (
                  <ArrowUpward sx={{ color: "success.main", fontSize: 16 }} />
                ) : (
                  <ArrowDownward sx={{ color: "error.main", fontSize: 16 }} />
                )}
                <Typography
                  variant="body2"
                  sx={{
                    color: trend > 0 ? "success.main" : "error.main",
                    ml: 0.5,
                  }}
                >
                  {Math.abs(trend)}%
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              bgcolor: color,
              borderRadius: "50%",
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
