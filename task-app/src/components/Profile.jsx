import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Container,
  Grid,
  Box,
  Button,
  Paper,
  Divider,
  Skeleton,
  Select,MenuItem,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import LogoutIcon from "@mui/icons-material/Logout";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../contextAPI/context";
import Layout from "./Layout/Layout";

import {useNavigate} from 'react-router-dom'
const API_URL = "http://localhost:5019/users"; 

const UserProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  const [u, setU] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    role: "",
  });
  const navigate = useNavigate()
  useEffect(() => {
    if (user?.email) {
      fetchUserProfile(user.email);
    }
  }, [user]);

  const fetchUserProfile = async (email) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_URL}/${email}`);
      setU(response.data);
      setUpdatedUser({
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
      });
    } catch (err) {
      setError("User not found.");
    } finally {
      setLoading(false);
    }
  };
  const handleStatusChange = async (taskId, newStatus) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:5019/api/tasks/${taskId}`, { status: newStatus });
      fetchUserProfile(user.email);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };
  const handleLogout = async () => {
    setLogoutLoading(true);
    setTimeout(() => {
      logout();
      navigate('/');
      setLogoutLoading(false);
    }, 1000);
  };

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put(`${API_URL}/${u._id}`, updatedUser);
      setU(updatedUser);
      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user.");
    }
  };

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading Profile...
        </Typography>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Skeleton variant="circular" width={100} height={100} sx={{ mx: "auto", mb: 2 }} />
        <Skeleton variant="text" width="60%" sx={{ mx: "auto", mb: 1 }} />
        <Skeleton variant="text" width="80%" sx={{ mx: "auto", mb: 1 }} />
        <Skeleton variant="rectangular" width="100%" height={120} sx={{ my: 2 }} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
        <Alert severity="error" icon={<ErrorOutlineIcon />}>
          {error}
        </Alert>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => fetchUserProfile(user.email)}>
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Layout>
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Card sx={{ boxShadow: 4, borderRadius: 2, overflow: "hidden", p: 2 }}>
          <CardContent>
            {/* Profile Avatar & Name */}
            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
              <Avatar sx={{ width: 100, height: 100, bgcolor: "#1565c0", fontSize: 40 }}>
                {u?.name?.charAt(0) || "?"}
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
                {u?.name}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Email Section */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <EmailIcon sx={{ mr: 1, color: "#1565c0" }} />
              <Typography variant="body1">
                <strong>Email:</strong> {u?.email}
              </Typography>
            </Box>

            {/* Role Section */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <BadgeIcon sx={{ mr: 1, color: "#1565c0" }} />
              <Typography variant="body1">
                <strong>Role:</strong>{" "}
                <span style={{ color: u?.role === "Admin" ? "#d32f2f" : "#1565c0" }}>
                  {u?.role}
                </span>
              </Typography>
            </Box>

            {/* Buttons: Edit Profile & Logout */}
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={handleOpenEditModal}>
                Edit Profile
              </Button>

              <Button variant="outlined" color="error" startIcon={<LogoutIcon />} onClick={handleLogout} disabled={logoutLoading}>
                {logoutLoading ? <CircularProgress size={20} /> : "Logout"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <Typography variant="h6" sx={{ mt: 4, color: "#1565c0", fontWeight: "bold" }}>
        Assigned Tasks:
      </Typography>

      <Box sx={{marginBottom:8}}>
      {u?.tasks?.length > 0 ? (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {u.tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task._id}>
              <Card
                sx={{
                  boxShadow: 2,
                  borderRadius: 2,
                  bgcolor: "#f5f5f5",
                  "&:hover": { boxShadow: 5, cursor: "pointer", bgcolor: "#e3f2fd" },
                }}
                
              >
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <AssignmentIcon sx={{ color: "#1976d2", mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {task.title}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, color: task.status === "Completed" ? "green" : "red" }}
                  >
                    Status: {task.status}
                  </Typography>
                  <Typography variant="body2">
                    Deadline: <strong>{new Date(task.deadline).toDateString()}</strong>
                  </Typography>
                  <Select value={task.status} onChange={(e) => handleStatusChange(task._id, e.target.value)} fullWidth sx={{ mt: 2 }}>
                    <MenuItem value="To Do">To Do</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body2" color="textSecondary" textAlign="center" sx={{ mt: 2 }}>
          No tasks assigned.
        </Typography>
      )}
      </Box>
      {/* Edit Profile Modal */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <IconButton sx={{ position: "absolute", right: 8, top: 8 }} onClick={handleCloseEditModal}>
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <TextField label="Name" fullWidth margin="normal" value={updatedUser.name} onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })} />
          <TextField label="Email" fullWidth margin="normal" value={updatedUser.email} disabled />
          <TextField label="Role" fullWidth margin="normal" value={updatedUser.role} onChange={(e) => setUpdatedUser({ ...updatedUser, role: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal} color="secondary">Cancel</Button>
          <Button onClick={handleUpdateProfile} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};
export default UserProfilePage;
