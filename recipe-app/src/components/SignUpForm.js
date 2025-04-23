import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button } from '@mui/material';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
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
        Sign Up
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField fullWidth name="firstName" label="First Name" onChange={handleChange} margin="normal" />
        <TextField fullWidth name="lastName" label="Last Name" onChange={handleChange} margin="normal" />
        <TextField fullWidth name="email" label="Email Address" onChange={handleChange} margin="normal" />
        <TextField fullWidth name="password" type="password" label="Password" onChange={handleChange} margin="normal" />
        <TextField fullWidth name="confirmPassword" type="password" label="Confirm Password" onChange={handleChange} margin="normal" />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default SignUpForm;