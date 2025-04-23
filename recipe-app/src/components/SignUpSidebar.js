import React from 'react';
import { Drawer, Box, Typography, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';

const SignUpSidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: 'border-box',
          padding: 2,
        },
      }}
    >
      <Box sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', p: 1, mb: 2 }}>
        🍽️ Recipe App
      </Box>

      <List>
        <ListItem button component={Link} to="/login" sx={{ justifyContent: 'center' }}>
          <Typography>Login</Typography>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SignUpSidebar;