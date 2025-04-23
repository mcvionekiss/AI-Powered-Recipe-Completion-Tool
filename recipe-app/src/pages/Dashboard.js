import React from 'react';
import { Box, Typography, } from '@mui/material';

const Dashboard = () => {
  return (
    <Box>
      {/* Main Content */}
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Dashboard!
        </Typography>
        <Typography variant="body1">
          This is where you'll see personalized recipe suggestions and ingredient insights.
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;