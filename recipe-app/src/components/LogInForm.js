import axios from 'axios';
import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogInForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '', password: ''
  });

  const [error, setError] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/users/login`, { email, password }, {
        withCredentials: true,
      });
      if (res.data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        navigate('/profile');
      } else {
        setError(res.data.message || 'Invalid login');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 0 }}>
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
        <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <Button variant="text" size="small" onClick={() => navigate('/signup')}>
            Sign Up
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default LogInForm;