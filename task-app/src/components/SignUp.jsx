import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Paper, Box, Select, MenuItem } from "@mui/material";
import Layout from "./Layout/Layout";

const API_URL = "http://localhost:5019/users/register"; // Backend registration route

const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "User" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post(API_URL, formData);
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Layout>
        <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 5, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField label="Full Name" name="name" fullWidth margin="normal" value={formData.name} onChange={handleChange} required />
          <TextField label="Email" name="email" fullWidth margin="normal" value={formData.email} onChange={handleChange} required />
          <TextField label="Password" type="password" name="password" fullWidth margin="normal" value={formData.password} onChange={handleChange} required />

          <Select name="role" value={formData.role} onChange={handleChange} fullWidth sx={{ mt: 2 }}>
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>

          <Box mt={2}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Sign Up
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
    </Layout>
  );
};

export default SignUp;
