import React from 'react';
import { Box, TextField } from '@mui/material';

const ProfileForm = () => {
  return (
    <Box
      component="form"
      sx={{
        width: '100%',
        maxWidth: 400,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
      />
    </Box>
  );
};

export default ProfileForm;