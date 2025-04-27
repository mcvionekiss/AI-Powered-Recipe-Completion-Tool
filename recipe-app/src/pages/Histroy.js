import React from 'react';
import RegularSidebar from '../components/RegularSidebar';
import ProfileButton from '../components/ProfileButton';
import { Box } from '@mui/material';

const History = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <RegularSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <p>History</p>
      </Box>
      <ProfileButton />
    </Box>
  );
};

export default History;