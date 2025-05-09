import React from 'react';
import Sidebar from '../components/RegularSidebar'
import SignUpForm from '../components/SignUpForm';
import { Box } from '@mui/material';

const SignUp = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <SignUpForm />
      </Box>
    </Box>
  );
};

export default SignUp;