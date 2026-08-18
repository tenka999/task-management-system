import React from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Grid,
} from "@mui/material";

const Settings = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          General Settings
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Site Name" defaultValue="Admin Panel" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Site URL"
              defaultValue="https://admin.example.com"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              defaultValue="Admin dashboard for managing your business"
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Preferences
        </Typography>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Enable Notifications"
        />
        <Box mt={2}>
          <FormControlLabel control={<Switch />} label="Dark Mode Default" />
        </Box>
        <Box mt={2}>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Email Alerts"
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box display="flex" gap={2}>
          <Button variant="contained" color="primary">
            Save Changes
          </Button>
          <Button variant="outlined">Reset</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;
