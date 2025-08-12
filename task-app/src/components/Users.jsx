
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contextAPI/context";
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,Box,
    MenuItem,
    Snackbar,
    Alert,
    InputAdornment
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Layout from "./Layout/Layout";
import { useNavigate } from "react-router-dom";
import UserProfile from "./SearchUser";

const API_URL = import.meta.env.VITE_API_URL;

const Users = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "User" });
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchResult, setSearchResult] = useState(false);
    useEffect(() => {
        fetchUsers();
    }, []);
    // useEffect(()=>{
    //     if(searchResult){
    //         setSearchQuery("")
    //     }
    // },[searchResult])
    useEffect(() => {
        filterUsers();
    }, [searchQuery, roleFilter, users]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}users/`);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const filterUsers = () => {
        let updatedUsers = users;

        if (searchQuery) {
            updatedUsers = updatedUsers.filter((u) =>
                u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                u.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (roleFilter !== "All") {
            updatedUsers = updatedUsers.filter((u) => u.role === roleFilter);
        }

        setFilteredUsers(updatedUsers);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`${API_URL}users/${id}`);
                fetchUsers();
                setSnackbar({ open: true, message: "User deleted successfully!", severity: "success" });
            } catch (error) {
                console.error("Error deleting user:", error);
                setSnackbar({ open: true, message: "Failed to delete user!", severity: "error" });
            }
        }
    };

    const handleOpen = (user = null) => {
        setEditMode(!!user);
        setSelectedUser(user);
        setNewUser(user ? { ...user, password: "" } : { name: "", email: "", password: "", role: "User" });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setNewUser({ name: "", email: "", password: "", role: "User" });
    };

    const handleRegisterOrUpdate = async () => {
        try {
            if (editMode) {
                await axios.put(`${API_URL}users/${selectedUser._id}`, newUser);
                setSnackbar({ open: true, message: "User updated successfully!", severity: "success" });
            } else {
                await axios.post(`${API_URL}users/adminAddedRegister`, newUser);
                console.log('complete')
                setSnackbar({ open: true, message: "User added successfully!", severity: "success" });
            }
            fetchUsers();
            handleClose();
        } catch (error) {
            console.error("Error saving user:", error);
            setSnackbar({ open: true, message: "Failed to save user!", severity: "error" });
        }
    };
    const handleSearchClear=()=>{
        setSearchQuery("");
        setSearchResult(false)
    }
    const handleSearchOpen = () => setSearchOpen(!searchOpen);
    const handleSearchClose = () => setSearchOpen(false);
    return (
        <Layout>
            <Container sx={{ mt: 4, pb: 4 }}>
                <Typography variant="h4" sx={{ mb: 3, textAlign: "center", fontWeight: "bold", color: "#1565c0" }}>
                    User Management
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
                {user?.role === "Admin" && (
                    <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => handleOpen()} sx={{ mb: 2 }}>
                        Add User
                    </Button>

                )}
                <Button variant="outlined" startIcon={<SearchIcon />} onClick={handleSearchOpen} sx={{ mb: 2 }}>
                    Search Users
                </Button>
                </Box>

                {/* Search and Filter */}
                {searchOpen && (
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "16px" }}>
                        <TextField
                            label="Search"
                            placeholder="Enter email..." // ✅ Added placeholder
                            fullWidth
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                endAdornment:  (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleSearchClear} size="small">
                                            <CloseIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setSearchResult(!searchResult)} // Calls filter function on click
                        >
                            Enter
                        </Button>
                    </div>
                )}
                {
                    searchResult && (
                        <UserProfile userId={searchQuery} />
                    )
                }
                <Select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    sx={{ mb: 2, width: "100%", marginTop:5 }}
                >
                    <MenuItem value="All">All Roles</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                </Select>
                {/* Users Table */}
                <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f1f1f1" }}>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell><strong>Email</strong></TableCell>
                                <TableCell><strong>Role</strong></TableCell>
                                {user?.role === "Admin" && <TableCell><strong>Actions</strong></TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">No users found.</TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers.map((u) => (
                                    <TableRow key={u._id} hover>
                                        <TableCell>{u.name}</TableCell>
                                        <TableCell>{u.email}</TableCell>
                                        <TableCell>
                                            <span style={{ color: u.role === "Admin" ? "#d32f2f" : "#1565c0" }}>
                                                {u.role}
                                            </span>
                                        </TableCell>
                                        {user?.role === "Admin" && (
                                            <TableCell>
                                                <IconButton color="primary" onClick={() => handleOpen(u)}>
                                                    <EditIcon />
                                                </IconButton>
                                                {
                                                    user.email!==u.email && (
                                                        <IconButton color="error" onClick={() => handleDelete(u._id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                    )
                                                }
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* User Creation & Edit Dialog */}
                <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>{editMode ? "Edit User" : "Add User"}</DialogTitle>
                    <DialogContent>
                        <TextField label="Name" fullWidth value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} sx={{ mt: 2 }} />

                        <TextField label="Email" fullWidth type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} sx={{ mt: 2 }} />
                        <Select fullWidth value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} sx={{ mt: 2 }}>
                            <MenuItem value="User">User</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">Cancel</Button>
                        <Button onClick={handleRegisterOrUpdate} color="primary" variant="contained">{editMode ? "Update" : "Save"}</Button>
                    </DialogActions>
                </Dialog>
                {/* <Dialog open={searchOpen} onClose={handleSearchClose} fullWidth maxWidth="sm">
                    <DialogTitle>Search Users</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Search..."
                            variant="outlined"
                            fullWidth
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{ my: 2, backgroundColor: "#f9f9f9", borderRadius: 1 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Close</Button>
                    </DialogActions>
                </Dialog> */}
            </Container>
        </Layout>
    );
};

export default Users;
