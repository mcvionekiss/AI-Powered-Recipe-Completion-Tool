import React from 'react';
import LogInForm from '../components/LogInForm';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';

const LogIn = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Bar */}
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography variant="h6" component="div">
            🍽️ Recipe App
          </Typography>
          
          {/* Signup Button */}
          <Button color="inherit" href="/signup">Sign Up</Button>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <LogInForm />
      </Box>
    </Box>
  );
};

export default LogIn;