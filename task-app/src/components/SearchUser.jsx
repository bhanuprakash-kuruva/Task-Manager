import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Container,
  Paper,
  Divider,
  Avatar,
  Box,
  Skeleton,
  ListItemIcon,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const API_URL = import.meta.env.VITE_API_URL; // Update with your API URL

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserById(userId);
  }, [userId]);

  const fetchUserById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}users/${id}`);
      setUser(response.data);
      setError("");
    } catch (err) {
      setError("User not found.");
    } finally {
      setLoading(false);
    }
  };

  if (error)
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error" icon={<ErrorOutlineIcon />}>
          {error}
        </Alert>
      </Container>
    );

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography sx={{fontSize:20,textAlign:'center', fontWeight:'bold'}}>
        Search Results
      </Typography>
      <Card sx={{ boxShadow: 4, borderRadius: 2, overflow: "hidden" }}>
        <CardContent>
          {loading ? (
            <>
              <Skeleton variant="circular" width={80} height={80} sx={{ mx: "auto", mb: 2 }} />
              <Skeleton variant="text" width="60%" sx={{ mx: "auto", mb: 1 }} />
              <Skeleton variant="text" width="80%" sx={{ mx: "auto", mb: 1 }} />
              <Skeleton variant="text" width="40%" sx={{ mx: "auto", mb: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={100} />
            </>
          ) : (
            <>
              <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                <Avatar sx={{ width: 80, height: 80, bgcolor: "#1565c0" }}>
                  {user?.name.charAt(0)}
                </Avatar>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", color: "#1565c0" }}>
                {user?.name}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <BadgeIcon sx={{ mr: 1, color: "#1565c0" }} />
                <Typography variant="body1"><strong>Role:</strong> <span style={{ color: user?.role === "Admin" ? "#d32f2f" : "#1565c0" }}>{user?.role}</span></Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <EmailIcon sx={{ mr: 1, color: "#1565c0" }} />
                <Typography variant="body1"><strong>Email:</strong> {user?.email}</Typography>
              </Box>

              <Typography variant="h6" sx={{ mt: 2, color: "#1565c0", fontWeight: "bold" }}>
                Assigned Tasks:
              </Typography>

              <Paper sx={{ maxHeight: 200, overflow: "auto", mt: 1, p: 1, borderRadius: 2, bgcolor: "#f9f9f9" }}>
                {user?.tasks?.length > 0 ? (
                  <List>
                    {user.tasks.map((task) => (
                      <ListItem key={task._id} divider sx={{ "&:hover": { bgcolor: "#e3f2fd" } }}>
                        <ListItemIcon>
                          <AssignmentIcon sx={{ color: "#1976d2" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={task.title}
                          secondary={<Typography variant="body2" sx={{ color: task.status === "Completed" ? "green" : "red" }}>Status: {task.status}</Typography>}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="textSecondary" textAlign="center">
                    No tasks assigned.
                  </Typography>
                )}
              </Paper>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserProfile;
