import React, { useContext } from "react";
import { AuthContext } from "../contextAPI/context";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h2" color="primary" sx={{ fontWeight: "bold" }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Oops! The page you’re looking for doesn’t exist.
      </Typography>

      {user ? (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Try going back to the home page.
        </Typography>
      ) : (
        <Typography variant="h6" sx={{ mt: 2, color: "red" }}>
          Please sign in to access this page.
        </Typography>
      )}

      <Box sx={{ mt: 3 }}>
        {user ? (
          <Button variant="contained" color="primary" onClick={() => navigate("/")}>
            Go to Home
          </Button>
        ) : (
          <Button variant="contained" color="secondary" onClick={() => navigate("/signin")}>
            Sign In
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default NotFound;
