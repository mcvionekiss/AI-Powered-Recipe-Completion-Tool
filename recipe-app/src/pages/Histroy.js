import React, { useState } from 'react';
import RegularSidebar from '../components/RegularSidebar';
import ProfileButton from '../components/ProfileButton';
import LogIn from './LogIn';
import { Box, Button, Typography } from '@mui/material';

const History = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [filter, setFilter] = useState('Recently Viewed');

  const filters = [
    'Recently Viewed',
    'Best Rated',
    'Least Rated',
    'Cuisine'
  ];

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
            height: '60vh',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <h1>History</h1>
            <hr style={{ margin: '16px 0', border: 'none', borderTop: '2px solid #ccc' }} />
          </Box>

          {/* Filter Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, gap: 1 }}>
            {filters.map((label) => (
              <Button
                key={label}
                variant={filter === label ? 'contained' : 'outlined'}
                onClick={() => setFilter(label)}
              >
                {label}
              </Button>
            ))}
          </Box>

          {/* Content Container */}
          <Box
            sx={{
              width: '60%',
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
            <Typography variant="body1" align="center">
              {/* TODO: Render history items based on filter */}
              Displaying <strong>{filter}</strong> items here.
            </Typography>
          </Box>
        </Box>

        <ProfileButton onTriggerLogin={() => setLoginOpen(true)} />
      </Box>
    </>
  );
};

export default History;
