import React from 'react';
import { IconButton, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfileButton = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <IconButton
      onClick={handleProfileClick}
      sx={{
        position: 'fixed',
        top: 0, // push it down just a little for padding
        right: 16, // some padding from the right
        zIndex: 1300, // make sure it floats above everything
      }}
    >
      <Avatar sx={{ width: 40, height: 40 }} />
    </IconButton>
  );
};

export default ProfileButton;