import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        marginTop:100,
        backgroundColor: "#1565c0",
        color: "white",
        textAlign: "center",
        py: 2,
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        boxShadow: "0px -2px 10px rgba(0,0,0,0.2)",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" sx={{ fontWeight: "bold", letterSpacing: "0.5px" }}>
          © {new Date().getFullYear()} Task Manager | All Rights Reserved
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
