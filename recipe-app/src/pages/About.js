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
            <Typography variant="h4" component="h1">About Us</Typography>
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
              <Typography variant="h6" align="center">Contact Us</Typography>
              <Box component="hr" sx={{ borderTop: '2px solid #000', width: '50%', mx: 'auto', my: 1 }} />
              <Typography>
                We are a team of Software Engineering students at UC Irvine
              </Typography>
              <Typography>
                • Tenzin Tsundue (<a href="mailto:ttsundue@uci.edu">ttsundue@uci.edu</a>):<br />
                A frontend developer experienced in React and Express, dedicated to creating clean, responsive user interfaces.
              </Typography>
              <Typography>
                • Axel Dejesus Lopez (<a href="mailto:axeldl@uci.edu">axeldl@uci.edu</a>):<br />
                A versatile developer fluent in many programming languages, bringing flexibility and depth to our design.
              </Typography>
              <Typography>
                • Jacey Deng (<a href="mailto:jiannind@uci.edu">jiannind@uci.edu</a>):<br />
                A full-stack developer, passionate about building scalable and user-friendly web applications.
              </Typography>
              <Typography>
                • Rayyaan Nadeem (<a href="mailto:rnadeem@uci.edu">rnadeem@uci.edu</a>):<br />
                A developer who excels at building clean, reusable React components and interactive UI features.
              </Typography>
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
              <Typography variant="h6" align="center">Project Details</Typography>
              <Box component="hr" sx={{ borderTop: '2px solid #000', width: '50%', mx: 'auto', my: 1 }} />
              <Typography>
                Our app is a smart recipe assistant designed to help users make the most of the ingredients they already have. Users can input available ingredients to the Fridge page and enter their recipe preferences in the Kitchen page, and the app will return recipe suggestions that closely match their input. We integrate ChatGPT to dynamically generate customized recipes based on the user’s ingredients and preferences. This allows for more creative, flexible, and personalized meal ideas.
              </Typography>
            </Box>
          </Box>
        </Box>

        <ProfileButton onTriggerLogin={() => setLoginOpen(true)} />
      </Box>
    </>
  );
};

export default About;