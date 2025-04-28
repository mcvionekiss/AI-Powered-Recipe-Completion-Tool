import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import RegularSidebar from '../components/RegularSidebar';
import AvatarUpload from '../components/AvatarUpload';
import ProfileForm from '../components/ProfileForm';

const Profile = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <RegularSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        c
        {/* Profile Title */}
        <Typography variant="h4" sx={{ mb: 4 }}>
          Your Profile
        </Typography>

        {/* Avatar Upload */}
        <AvatarUpload />

        {/* Profile Form */}
        <ProfileForm />

        {/* Save Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{
            position: 'absolute',
            bottom: 30,
            right: 30,
            textTransform: 'none',
          }}
        >
          Save changes
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;