// import React, { useState,useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { TextField, Button, Container, Typography, Paper, Box,Select,MenuItem } from "@mui/material";
// import Layout from "./Layout/Layout";
// import { AuthContext } from "../context/AuthContext";

// const API_URL = "/users/login"; // Backend login route

// const SignIn = () => {
//   const [formData, setFormData] = useState({ email: "", password: "",role:"" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);
//   // ✅ Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     console.log(formData)
//     try {
//       const response = await axios.post(API_URL, formData);
//     //   localStorage.setItem("token", response.data.token); // Store JWT token
//     //   localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user info
//     //   const u = localStorage.getItem('user')
//     //   console.log(u)
//     login(response.data.user, response.data.token);
//       navigate("/"); // Redirect to tasks
//     } catch (error) {
//       setError(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <Layout>
//         <Container maxWidth="sm">
//       <Paper sx={{ p: 4, mt: 5, textAlign: "center" }}>
//         <Typography variant="h5" gutterBottom>
//           Sign In
//         </Typography>
//         {error && <Typography color="error">{error}</Typography>}
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Email"
//             name="email"
//             fullWidth
//             margin="normal"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             label="Password"
//             type="password"
//             name="password"
//             fullWidth
//             margin="normal"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <Select name="role" value={formData.role} onChange={handleChange} fullWidth sx={{ mt: 2 }}>
//             <MenuItem value="User">User</MenuItem>
//             <MenuItem value="Admin">Admin</MenuItem>
//           </Select>
//           <Box mt={2}>
//             <Button variant="contained" color="primary" type="submit" fullWidth>
//               Sign In
//             </Button>
//           </Box>
//         </form>
//       </Paper>
//     </Container>
//     </Layout>
//   );
// };

// export default SignIn;
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Container, Typography, Paper, Box, Select, MenuItem } from "@mui/material";
import Layout from "./Layout/Layout";
import { AuthContext } from "../contextAPI/context";

const API_URL = import.meta.env.VITE_API_URL; // Backend login route

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "", role: "User" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log(formData);
    try {
      const response = await axios.post(`${API_URL}api/users/login`, formData);
      login(response.data.user, response.data.token);
      navigate("/"); // Redirect to home page
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, mt: 5, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Sign In
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Select name="role" value={formData.role} onChange={handleChange} fullWidth sx={{ mt: 2 }}>
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
            <Box mt={2}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Sign In
              </Button>
            </Box>
          </form>
          <Box mt={2}>
            <Typography variant="body2">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default SignIn;
