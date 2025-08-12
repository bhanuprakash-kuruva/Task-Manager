import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Alert,
  Container,
  Paper,
  Divider,
  TextField,
  Button,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SearchIcon from "@mui/icons-material/Search";

const API_URL = import.meta.env.VITE_API_URL; // Update with your API URL

const SearchTask = () => {
  const [tasks, setTasks] = useState([]); // ✅ Store multiple tasks
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Handle Search API Call
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setTasks([]); // ✅ Clear previous results
    setError("");
    console.log('edit')
    try {
      const response = await axios.get(`${API_URL}tasks/${searchQuery}`);
      if (response.data.length > 0) {
        setTasks(response.data); // ✅ Store all matching tasks
      } else {
        setError("No tasks found.");
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to fetch tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Clear search input
  const handleClearSearch = () => {
    setSearchQuery("");
    setTasks([]); // Clear results when clearing search
    setError("");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}>
        Search Task
      </Typography>

      {/* ✅ Search Bar with CloseIcon */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Enter Task Title"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton onClick={handleClearSearch}>
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          startIcon={<SearchIcon />}
          disabled={loading}
        >
          Search
        </Button>
      </Box>

      {/* ✅ Show Loading Spinner */}
      {loading && <CircularProgress sx={{ display: "block", mx: "auto", mt: 2 }} />}

      {/* ✅ Error Message */}
      {error && (
        <Alert severity="error" icon={<ErrorOutlineIcon />} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* ✅ Display Task Results */}
      {tasks.length > 0 && (
        <>
          <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center", mt: 2 }}>
            Search Results ({tasks.length} found)
          </Typography>

          {tasks.map((task) => (
            <Card key={task._id} sx={{ boxShadow: 4, borderRadius: 2, overflow: "hidden", mt: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", color: "#1565c0" }}>
                  {task.title}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <AssignmentIcon sx={{ mr: 1, color: "#1565c0" }} />
                  <Typography variant="body1"><strong>Description:</strong> {task.description}</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <PersonIcon sx={{ mr: 1, color: "#1565c0" }} />
                  <Typography variant="body1"><strong>Assigned To:</strong> {task.assignedTo}</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <CalendarTodayIcon sx={{ mr: 1, color: "#1565c0" }} />
                  <Typography variant="body1"><strong>Deadline:</strong> {new Date(task.deadline).toDateString()}</Typography>
                </Box>

                <Paper sx={{ mt: 2, p: 2, borderRadius: 2, bgcolor: "#f9f9f9", textAlign: "center" }}>
                  <Typography variant="body2" sx={{ color: task.status === "Completed" ? "green" : "red" }}>
                    <strong>Status:</strong> {task.status}
                  </Typography>
                </Paper>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
};

export default SearchTask;
