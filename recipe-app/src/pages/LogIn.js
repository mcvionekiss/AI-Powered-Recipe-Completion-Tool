import React from 'react';
import LogInForm from '../components/LogInForm';
import { Box, Modal, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const LogIn = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backdropFilter: 'blur(4px)', // this blurs the background
          backgroundColor: 'rgba(0,0,0,0.4)', // darken with transparency
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: '100%',
            maxWidth: 400,
            p: 4,
            borderRadius: 2,
            mx: 2,
            position: 'relative', // required for absolute close button
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <LogInForm />
        </Paper>
      </Box>
    </Modal>
  );
};

export default LogIn;