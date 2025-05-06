import React, { useEffect, useState } from 'react';
import { Modal, Paper, Typography, IconButton, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';

const TipNotification = () => {
  const [showTip, setShowTip] = useState(false);
  const [tip, setTip] = useState('');

  const fetchTip = async () => {
    const today = new Date().toLocaleDateString();
    const lastTipDate = localStorage.getItem('tipDate');
    const cachedTip = localStorage.getItem('tipText');
  
    if (lastTipDate === today && cachedTip) {
      setTip(cachedTip); // use stored tip
      return;
    }
  
    try {
      const res = await fetch(`https://api.spoonacular.com/food/trivia/random?apiKey=3a97738436f141708a681bd43a3629cd`);
      const data = await res.json();
      setTip(data.text);
  
      // Cache it for today
      localStorage.setItem('tipDate', today);
      localStorage.setItem('tipText', data.text);
    } catch (err) {
      const fallback = "Always taste your food while cooking to adjust seasoning.";
      setTip(fallback);
      localStorage.setItem('tipDate', today);
      localStorage.setItem('tipText', fallback);
    }
  };

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const lastSeen = localStorage.getItem('lastTipSeen');
    if (lastSeen !== today) {
      fetchTip();
      setShowTip(true);
      localStorage.setItem('lastTipSeen', today);
    }
  }, []);

  const handleOpen = () => {
    fetchTip();
    setShowTip(true);
  };

  const handleClose = () => setShowTip(false);

  return (
    <>
      <IconButton 
        onClick={handleOpen} 
        title="Cooking Tip of the Day"
        sx={{
            position: 'fixed',
            top: 0, // push it down just a little for padding
            right: 72, // some padding from the right
            zIndex: 1300, // make sure it floats above everything
        }}
      >
        <NotificationsIcon sx={{ fontSize: 37 }}/>
      </IconButton>

      <Modal open={showTip} onClose={handleClose}>
        <Paper sx={{
          position: 'absolute',
          top: 50,
          right: 100,
          width: 300,
          p: 3,
          borderRadius: 2,
          boxShadow: 24,
          maxHeight: '80vh',
          overflowY: 'auto',
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <NotificationsIcon />
            <Typography variant="h6" align="center">Today's Trivia</Typography>
            <IconButton onClick={handleClose}><CloseIcon /></IconButton>
          </Box>
          <ImportContactsIcon />
          <Typography variant="body1" sx={{ ml: 4}}>{tip}</Typography>
        </Paper>
      </Modal>
    </>
  );
};

export default TipNotification;