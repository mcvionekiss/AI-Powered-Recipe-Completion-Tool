import React, { useState } from 'react';
import { Box, Avatar, IconButton } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const AvatarUpload = () => {
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  return (
    <Box sx={{ position: 'relative', mb: 4 }}>
      <Avatar
        src={avatar}
        sx={{ width: 100, height: 100 }}
      />
      <IconButton
        component="label"
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          backgroundColor: 'white',
          '&:hover': { backgroundColor: '#eee' },
          border: '1px solid #ccc',
          width: 30,
          height: 30,
        }}
      >
        <PhotoCameraIcon fontSize="small" />
        <input
          hidden
          accept="image/*"
          type="file"
          onChange={handleAvatarChange}
        />
      </IconButton>
    </Box>
  );
};

export default AvatarUpload;