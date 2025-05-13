import React, { useState } from 'react';
import RegularSidebar from '../components/RegularSidebar';
import ProfileButton from '../components/ProfileButton';
import LogIn from './LogIn';
import { Box } from '@mui/material';

const About = () => {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
    <ProfileButton onTriggerLogin={() => setLoginOpen(true)} />
    <LogIn open={loginOpen} onClose={() => setLoginOpen(false)} />
    <Box sx={{ display: 'flex' }}>
      <RegularSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <p>About</p>
      </Box>
      <ProfileButton onTriggerLogin={() => setLoginOpen(true)} />
    </Box>
    </>
  );
};

export default About;