import React, { useRef } from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';
import RegularSidebar from '../components/RegularSidebar';
import AvatarUpload from '../components/AvatarUpload';
import ProfileForm from '../components/ProfileForm';

const Profile = () => {
  const profileRef = useRef();

  const handleSaveChanges = async () => {
    const updatedData = profileRef.current?.getProfileData();
    const userId = localStorage.getItem('userId');
    if (!userId || !updatedData) return;

    try {
      await axios.put(`${process.env.REACT_APP_BASE_API_URL}/users/${userId}`, updatedData);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert('Update failed.');
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <RegularSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        {/* Profile Title */}
        <Typography variant="h4" sx={{ mb: 4 }}>
          Your Profile
        </Typography>

        {/* Avatar Upload */}
        <AvatarUpload />

        {/* Profile Form */}
        <ProfileForm ref={profileRef} />

        {/* Save Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveChanges}
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