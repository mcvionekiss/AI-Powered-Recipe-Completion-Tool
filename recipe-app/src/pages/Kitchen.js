import React from 'react';
import RegularSidebar from '../components/RegularSidebar';
import ProfileButton from '../components/ProfileButton';
import { Box } from '@mui/material';

const Kitchen = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <RegularSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <h1>Your Kitchen</h1>
          <hr style={{ marginTop: '16px', marginBottom: '16px', border: 'none', borderTop: '2px solid #ccc' }} />
        </Box>
      </Box>
      <ProfileButton />
    </Box>
  );
};

export default Kitchen;