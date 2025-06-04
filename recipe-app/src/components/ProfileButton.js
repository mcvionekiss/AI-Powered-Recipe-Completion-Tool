import React, { useState } from 'react';
import { IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfileButton = ({ onTriggerLogin }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    if (isLoggedIn) {
      setAnchorEl(event.currentTarget);
    } else {
      onTriggerLogin();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccountClick = () => {
    handleClose();
    navigate('/profile');
  };

  const handleLogout = async () => {
    handleClose();
    try {
      await fetch(`${process.env.REACT_APP_BASE_API_URL}/users/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Error during logout:', err);
    }
    localStorage.clear();
    navigate('/dashboard');
    window.location.reload(); // force a clean reload to remove any in-memory data
  };

  return (
    <>
      <IconButton
        onClick={handleAvatarClick}
        sx={{
          position: 'fixed',
          top: 0,
          right: 16,
          zIndex: 1300,
        }}
      >
        <Avatar sx={{ width: 40, height: 40 }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleAccountClick}>Account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileButton;