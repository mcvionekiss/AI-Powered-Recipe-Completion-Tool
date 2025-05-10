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
            <h1>About Us</h1>
            <hr
              style={{
                margin: '16px 0',
                border: 'none',
                borderTop: '2px solid #ccc',
              }}
            />
          </Box>

          {/* Static About Content Container */}
          <Box
            sx={{
              width: '80%',            
              mx: 'auto',
              flexGrow: 1,
              border: 1,
              borderColor: 'grey.300',
              borderRadius: 2,
              p: 3,
              backgroundColor: '#f9f9f9',
              overflow: 'auto',
            }}
          >
            <Typography variant="body1">
          
              Welcome to our kitchen recipe app! We’re passionate about bringing you the best home-cooked meals.
              Explore a curated collection of recipes, from quick weeknight dinners to indulgent desserts.
              Our mission is to make cooking simple, fun, and delicious for everyone.
            </Typography>
          </Box>
        </Box>

        <ProfileButton onTriggerLogin={() => setLoginOpen(true)} />
      </Box>
    </>
  );
};

export default About;
