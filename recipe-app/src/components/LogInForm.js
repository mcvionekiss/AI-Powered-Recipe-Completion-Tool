import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogInForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '', password: ''
  });

  const [error, setError] = useState('');

  const MOCK_EMAIL = 'demo@user.com';
  const MOCK_PASSWORD = 'password123';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      navigate('/profile');
    } else {
      setError('Invalid email or password. Try demo@user.com / password123.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Log In
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField fullWidth name="email" label="Email Address" onChange={handleChange} margin="normal" />
        <TextField fullWidth name="password" type="password" label="Password" onChange={handleChange} margin="normal" />
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          Login
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Demo Credentials: demo@user.com / password123
        </Typography>
      </Box>
    </Container>
  );
};

export default LogInForm;