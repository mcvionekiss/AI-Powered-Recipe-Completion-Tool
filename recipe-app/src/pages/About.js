import React, { useState } from 'react';
import RegularSidebar from '../components/RegularSidebar';
import ProfileButton from '../components/ProfileButton';
import LogIn from './LogIn';
import { Box, Typography } from '@mui/material';

const About = () => {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <ProfileButton onTriggerLogin={() => setLoginOpen(true)} />
      <LogIn open={loginOpen} onClose={() => setLoginOpen(false)} />

      <Box sx={{ display: 'flex' }}>
        <RegularSidebar />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            height: '90vh',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="h4" component="h1">ABOUT US</Typography>
            <hr
              style={{
                margin: '16px 0',
                border: 'none',
                borderTop: '2px solid #ccc',
              }}
            />
          </Box>

          {/* Two-column content */}
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              gap: 2,
              width: '80%',
              mx: 'auto',
            }}
          >
            {/* Contact Us */}
            <Box
              sx={{
                flex: 1,
                border: 1,
                borderColor: 'grey.300',
                borderRadius: 2,
                p: 3,
                backgroundColor: '#f9f9f9',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto',
              }}
            >
              <Typography variant="h6" align="center">CONTACT US</Typography>
              <Box component="hr" sx={{ borderTop: '2px solid #000', width: '50%', mx: 'auto', my: 1 }} />
              {/* TODO: Add your contact information here */}
            </Box>

            {/* Project Details */}
            <Box
              sx={{
                flex: 1,
                border: 1,
                borderColor: 'grey.300',
                borderRadius: 2,
                p: 3,
                backgroundColor: '#f9f9f9',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto',
              }}
            >
              <Typography variant="h6" align="center">PROJECT DETAILS</Typography>
              <Box component="hr" sx={{ borderTop: '2px solid #000', width: '50%', mx: 'auto', my: 1 }} />
              {/* TODO: Add your project details here */}
            </Box>
          </Box>
        </Box>

        <ProfileButton onTriggerLogin={() => setLoginOpen(true)} />
      </Box>
    </>
  );
};

export default About;