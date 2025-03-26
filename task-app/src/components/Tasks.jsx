
// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box, Typography, Card, CardContent, CardActions, Button,
//   Dialog, DialogTitle, DialogContent, DialogActions,
//   TextField, Select, MenuItem, Grid, Alert,InputAdornment,IconButton
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import AddIcon from "@mui/icons-material/Add";
// import SearchIcon from "@mui/icons-material/Search";
// import CloseIcon from "@mui/icons-material/Close";
// import Layout from "./Layout/Layout";
// import { AuthContext } from "../contextAPI/context";
// import { useNavigate } from "react-router-dom";
// import SearchTask from "./SearchTask";

// const API_URL = "/api/tasks"; // Backend URL

// const TaskManager = () => {
//   const { user } = useContext(AuthContext);
//   const [tasks, setTasks] = useState([]);
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const [ searchQuery,setSearchQuery] = useState("")
//   const [editMode, setEditMode] = useState(false);
//   const [errorDialog, setErrorDialog] = useState(false);
//   const [searchOpen,setSearchOpen] = useState(false);
//   const [searchResult,setSearchResult] = useState(false)
//   const [errorMessage, setErrorMessage] = useState("");
//   const [taskData, setTaskData] = useState({
//     title: "",
//     description: "",
//     assignedBy: "Admin",
//     assignedTo: "",
//     deadline: "",
//     status: "To Do",
//   });

//   const [selectedTaskId, setSelectedTaskId] = useState(null);

//   // ✅ Function to show error dialog
//   const showError = (message) => {
//     setErrorMessage(message);
//     setErrorDialog(true);
//   };

//   // ✅ Function to close error dialog
//   const closeErrorDialog = () => {
//     setErrorDialog(false);
//     setErrorMessage("");
//   };

//   // ✅ Fetch tasks when component mounts
//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   // ✅ Fetch all tasks
//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get(API_URL);
//       setTasks(response.data);
//     } catch (error) {
//       showError("Error fetching tasks. Please try again.");
//     }
//   };

//   // ✅ Create or Update a task
//   const handleSaveTask = async () => {
//     try {
//       if (editMode) {
//         console.log(taskData)
//         await axios.put(`/api/update-task/${selectedTaskId}`, taskData);
//       } else {
//         await axios.post(API_URL, taskData);
//       }
//       fetchTasks();
//       handleCloseDialog();
//     } catch (error) {
//       showError(editMode ? "Error updating task." : "Error creating task.");
//     }
//   };

//   // ✅ Open Edit Dialog
//   const handleEdit = (task) => {
//     setTaskData({
//       title: task.title,
//       description: task.description,
//       assignedBy: task.assignedBy || "Admin",
//       assignedTo: task.assignedTo,
//       deadline: task.deadline.split("T")[0], // Format date for input field
//       status: task.status,
//     });
//     setSelectedTaskId(task._id);
//     setEditMode(true);
//     setOpen(true);
//   };

//   // ✅ Open Create Dialog
//   const handleOpenDialog = () => {
//     setEditMode(false);
//     setTaskData({
//       title: "",
//       description: "",
//       assignedBy: "Admin",
//       assignedTo: "",
//       deadline: "",
//       status: "To Do",
//     });
//     setOpen(true);
//   };

//   // ✅ Close Dialog
//   const handleCloseDialog = () => {
//     setOpen(false);
//     setEditMode(false);
//     setSelectedTaskId(null);
//   };

//   // ✅ Update task status
//   const handleStatusChange = async (taskId, newStatus) => {
//     try {
//       await axios.put(`${API_URL}/${taskId}`, { status: newStatus });
//       fetchTasks();
//     } catch (error) {
//       showError("Error updating task status.");
//     }
//   };
//   const handleSearchOpen=()=>{
//     setSearchOpen(!searchOpen);
//   }
  
//   // ✅ Delete a task
//   const handleDelete = async (taskId) => {
//     try {
//       await axios.delete(`${API_URL}/${taskId}`);
//       fetchTasks();
//     } catch (error) {
//       showError("Error deleting task.");
//     }
//   };

//   return (
//     <Layout>
//       <Box sx={{ p: 3 }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Task Manager
//         </Typography>

//         {/* ✅ Create Task Button */}
//         <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenDialog} sx={{ mb: 3 }}>
//           Create Task
//         </Button>
//         <Button variant="outlined" startIcon={<SearchIcon />} onClick={handleSearchOpen} sx={{ mb: 2 }}>
//                     Search Tasks
//                 </Button>
//         {searchOpen && (
//                     <SearchTask/>
//                 )}
                
//         {/* ✅ Task Creation & Edit Dialog */}
//         <Dialog open={open} onClose={handleCloseDialog} fullWidth>
//           <DialogTitle>{editMode ? "Edit Task" : "Create New Task"}</DialogTitle>
//           <DialogContent>
//             <TextField label="Title" fullWidth value={taskData.title} onChange={(e) => setTaskData({ ...taskData, title: e.target.value })} sx={{ my: 1 }} />
//             <TextField label="Description" fullWidth value={taskData.description} onChange={(e) => setTaskData({ ...taskData, description: e.target.value })} sx={{ my: 1 }} />
//             <TextField label="Assigned To" fullWidth value={taskData.assignedTo} onChange={(e) => setTaskData({ ...taskData, assignedTo: e.target.value })} sx={{ my: 1 }} />
//             <TextField type="date" fullWidth value={taskData.deadline} onChange={(e) => setTaskData({ ...taskData, deadline: e.target.value })} sx={{ my: 1 }} />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
//             <Button onClick={handleSaveTask} color="primary" variant="contained">
//               {editMode ? "Update Task" : "Add Task"}
//             </Button>
//           </DialogActions>
//         </Dialog>
//                 {/* ✅ Task Cards Grid */}
// <Grid container spacing={3}>
// {tasks.map((task) => (
//   <Grid item xs={12} sm={6} md={4} key={task._id}>
//     <Card sx={{ boxShadow: 3 }}>
//       <CardContent>
//         <Typography variant="h6">{task.title}</Typography>
//         <Typography variant="body2" color="textSecondary">{task.description}</Typography>
//         <Typography variant="body2" sx={{ mt: 1 }}>
//           Assigned To: <strong>{task.assignedTo}</strong>
//         </Typography>
//         <Typography variant="body2">
//           Deadline: <strong>{new Date(task.deadline).toDateString()}</strong>
//         </Typography>
//         <Select value={task.status} onChange={(e) => handleStatusChange(task._id, e.target.value)} fullWidth sx={{ mt: 2 }}>
//           <MenuItem value="To Do">To Do</MenuItem>
//           <MenuItem value="In Progress">In Progress</MenuItem>
//           <MenuItem value="Completed">Completed</MenuItem>
//         </Select>
//       </CardContent>
//       <CardActions>
//         {user?.role === "Admin" && (
//           <>
//             <Button color="primary" onClick={() => handleEdit(task)} startIcon={<EditIcon />}>
//               Edit
//             </Button>
//             <Button color="error" onClick={() => handleDelete(task._id)} startIcon={<DeleteIcon />}>
//               Delete
//             </Button>
//           </>
//         )}
//       </CardActions>
//     </Card>
//   </Grid>
// ))}
// </Grid>
        
//       </Box>
//     </Layout>
//   );
// };

// export default TaskManager;
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Box, Typography, Card, CardContent, CardActions, Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Select, MenuItem, Grid, Collapse, Paper, IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import Layout from "./Layout/Layout";
import { AuthContext } from "../contextAPI/context";
import SearchTask from "./SearchTask";

const API_URL = "/api/tasks"; // Backend API URL

const TaskManager = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    assignedBy: "Admin",
    assignedTo: "",
    deadline: "",
    status: "To Do",
  });

  // Fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      setErrorMessage("Error fetching tasks. Please try again.");
    }
  };

  // Handle Save (Create or Update)
  const handleSaveTask = async () => {
    console.log('upadte')
    try {
      if (!taskData.title || !taskData.description || !taskData.assignedTo || !taskData.deadline) {
        setErrorMessage("All fields are required.");
        return;
      }
   
      const formattedTaskData = {
        ...taskData,
        deadline: new Date(taskData.deadline).toISOString(),
      };
     
      if (editMode) {
       
        await axios.put(`/api/update-task/${selectedTaskId}`, formattedTaskData);
      } else {
        await axios.post(API_URL, formattedTaskData);
      }

      fetchTasks();
      handleCloseDialog();
    } catch (error) {
      setErrorMessage(editMode ? "Error updating task." : "Error creating task.");
    }
  };

  // Open Edit Dialog
  const handleEdit = (task) => {
   
    setTaskData({
      title: task.title,
      description: task.description,
      assignedBy: task.assignedBy || "Admin",
      assignedTo: task.assignedTo,
      deadline: task.deadline ? task.deadline.split("T")[0] : "",
      status: task.status,
    });
    
    setSelectedTaskId(task._id);
    setEditMode(true);
    setOpen(true);
  };

  // Open Create Dialog
  const handleOpenDialog = () => {
    setEditMode(false);
    setTaskData({
      title: "",
      description: "",
      assignedBy: "Admin",
      assignedTo: "",
      deadline: "",
      status: "To Do",
    });
    setOpen(true);
  };

  // Close Dialog
  const handleCloseDialog = () => {
    setOpen(false);
    setEditMode(false);
    setSelectedTaskId(null);
  };

  // Toggle Search Panel
  const handleSearchOpen = () => {
    setSearchOpen(!searchOpen);
  };

  // Delete a Task
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/${taskId}`);
      fetchTasks();
    } catch (error) {
      setErrorMessage("Error deleting task.");
    }
  };

  return (
    <Layout>
      <Box sx={{ p: 3, maxWidth: "1000px", mx: "auto" }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 3, color: "#1565c0" }}>
          Task Manager
        </Typography>

        {/* Create & Search Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
          {
            user.role==="Admin" &&(
              <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenDialog} sx={{ borderRadius: 20 }}>
            Create Task
          </Button>
            )
          }
          <Button variant="outlined" startIcon={<SearchIcon />} onClick={handleSearchOpen} sx={{ borderRadius: 20 }}>
            Search Tasks
          </Button>
        </Box>

        {/* Collapsible Search Section */}
        <Collapse in={searchOpen}>
          <Paper sx={{ p: 2, mb: 3, borderRadius: 2, backgroundColor: "#f5f5f5" }}>
            <SearchTask />
          </Paper>
        </Collapse>

        {/* Task Creation & Edit Dialog */}
        <Dialog open={open} onClose={handleCloseDialog} fullWidth>
          <DialogTitle>{editMode ? "Edit Task" : "Create New Task"}</DialogTitle>
          <DialogContent>
            <TextField label="Title" fullWidth value={taskData.title} onChange={(e) => setTaskData({ ...taskData, title: e.target.value })} sx={{ my: 1 }} />
            <TextField label="Description" fullWidth value={taskData.description} onChange={(e) => setTaskData({ ...taskData, description: e.target.value })} sx={{ my: 1 }} />
            <TextField label="Assigned To" fullWidth value={taskData.assignedTo} onChange={(e) => setTaskData({ ...taskData, assignedTo: e.target.value })} sx={{ my: 1 }} />
            <TextField type="date" fullWidth value={taskData.deadline} onChange={(e) => setTaskData({ ...taskData, deadline: e.target.value })} sx={{ my: 1 }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
            <Button onClick={handleSaveTask} color="primary" variant="contained">
              {editMode ? "Update Task" : "Add Task"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Task Cards Grid */}
        <Grid container spacing={3}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task._id}>
              <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1565c0" }}>{task.title}</Typography>
                  <Typography variant="body2" color="textSecondary">{task.description}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Assigned To: <strong>{task.assignedTo}</strong>
                  </Typography>
                  <Typography variant="body2">
                    Deadline: <strong>{new Date(task.deadline).toDateString()}</strong>
                  </Typography>
                </CardContent>
                <CardActions>
                  {user?.role === "Admin" && (
                    <>
                      <Button color="primary" onClick={() => handleEdit(task)} startIcon={<EditIcon />}>Edit</Button>
                      <Button color="error" onClick={() => handleDelete(task._id)} startIcon={<DeleteIcon />}>Delete</Button>
                    </>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default TaskManager;
