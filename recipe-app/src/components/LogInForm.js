import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button } from '@mui/material';

const LogInForm = () => {
  const [formData, setFormData] = useState({
    email: '', password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Log In
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField fullWidth name="email" label="Email Address" onChange={handleChange} margin="normal" />
        <TextField fullWidth name="password" type="password" label="Password" onChange={handleChange} margin="normal" />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LogInForm;