import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import axios from "axios";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/users`,
        {
          firstName,
          lastName,
          email,
          password,
          dietaryPreferences: "None" // optional: adjust as needed
        }
      );
      console.log("User created:", response.data);
      alert("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user.");
    }
  };

  // Note that this is for testing purposes only, seeing if the server is running and we are connected
  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/users/all`
      );
      console.log("Fetched users:", response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          name="firstName"
          label="First Name"
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          name="lastName"
          label="Last Name"
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          name="email"
          label="Email Address"
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          name="password"
          type="password"
          label="Password"
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          onChange={handleChange}
          margin="normal"
        />
        <Button
          type="button"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleSubmit}>
          Sign Up
        </Button>
        <Button
          type="button"
          color="secondary"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={getUsers}>
          GET USERS
        </Button>
      </Box>
    </Container>
  );
};

export default SignUpForm;
