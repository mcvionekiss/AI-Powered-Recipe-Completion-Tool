import React from 'react';
import RegularSidebar from '../components/RegularSidebar';
import { Box } from '@mui/material';

const Profile = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <RegularSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <p>Profile</p>
      </Box>
    </Box>
  );
};

export default Profile;