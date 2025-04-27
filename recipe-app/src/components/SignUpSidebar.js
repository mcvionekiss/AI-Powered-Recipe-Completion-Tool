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
          padding: 0,
        },
      }}
    >
      <Box sx={{ 
        backgroundColor: '#1976d2',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        p: 2,
        fontSize: '1.2rem'
        }}>
        🍽️ Recipe App
      </Box>

      <List sx={{ mt: 2 }}>
        <ListItem button component={Link} to="/login" sx={{ justifyContent: 'center' }}>
          <Typography color="primary">Login</Typography>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SignUpSidebar;