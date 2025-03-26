import React, { useState } from "react";
import { Container, Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material";
import Layout from "./Layout/Layout";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // EmailJS credentials
  const publicKey = "ifiSMYOG0wkyaAglb";
  const serviceID = "service_c86pfd2";
  const templateID = "template_xfa34u9";

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then(
        () => {
          setFormData({ name: "", email: "", message: "" });
          setIsSubmitted(true);
          setError(null);
        },
        (error) => {
          console.error(error.text);
          setError("There was an error sending your message. Please try again.");
        }
      );
  };

  return (
    <Layout>
      <Container maxWidth="md" sx={{marginBottom:8}}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mt: 5, fontWeight: "bold" }}>
          Contact Us
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" sx={{ mb: 4 }}>
          Have questions? Reach out to us and we'll get back to you as soon as possible.
        </Typography>

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center", backgroundColor: "#f5f5f5" }}>
              <Typography variant="h6" gutterBottom>
                Get in Touch
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Email color="primary" />
                <Typography variant="body1">support@taskmanager.com</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Phone color="primary" />
                <Typography variant="body1">+1 (123) 456-7890</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOn color="primary" />
                <Typography variant="body1">123 Task St, Productivity City, USA</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom>
                Send Us a Message
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  variant="outlined"
                  margin="normal"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Your Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Your Message"
                  name="message"
                  multiline
                  rows={4}
                  variant="outlined"
                  margin="normal"
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                  Send Message
                </Button>
                {isSubmitted && (
                  <Typography variant="body1" color="green" sx={{ mt: 2 }}>
                    Thank you for reaching out! We’ll get back to you soon.
                  </Typography>
                )}
                {error && (
                  <Typography variant="body1" color="error" sx={{ mt: 2 }}>
                    {error}
                  </Typography>
                )}
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Contact;
