// import React, { useContext } from "react";
// import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../contextAPI/context";
// import taskLogo from "../../assets/task.png"; // Import Task Manager logo

// const Header = () => {
//   const { user, logout } = useContext(AuthContext); // Get user from AuthContext
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <>
//       <AppBar
//         position="fixed"
//         sx={{
//           backgroundColor: "#1565c0",
//           boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
//           width: "100%",
//           zIndex: 1100,
//         }}
//       >
//         <Container maxWidth="lg">
//           <Toolbar>
//             {/* ✅ Task Manager Logo */}
//             <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
//               <img src={taskLogo} alt="Task Manager Logo" style={{ width: 30, height: 30, marginRight: 10 }} />
//               <Typography variant="h6" sx={{ fontWeight: "bold", letterSpacing: "1px" }}>
//                 Task Manager
//               </Typography>
//             </Box>

//             <Box sx={{ flexGrow: 1 }} />

//             {/* ✅ Navigation Links */}
//             <Box sx={{ display: "flex", gap: 2 }}>
//               <Button color="inherit" component={Link} to="/" sx={{ fontWeight: "bold" }}>
//                 Home
//               </Button>
//               <Button color="inherit" component={Link} to="/tasks" sx={{ fontWeight: "bold" }}>
//                 Tasks
//               </Button>
//               {user?.role === "Admin" && (
//                 <Button color="inherit" component={Link} to="/users" sx={{ fontWeight: "bold" }}>
//                   Users
//                 </Button>
//               )}
//               <Button color="inherit" component={Link} to="/profile" sx={{ fontWeight: "bold" }}>
//                 Profile
//               </Button>
//               <Button color="inherit" component={Link} to="/analytics" sx={{ fontWeight: "bold" }}>
//                 Analytics
//               </Button>
//               <Button color="inherit" component={Link} to="/contact" sx={{ fontWeight: "bold" }}>
//                 Contact
//               </Button>

//               {/* ✅ Show Sign In/Sign Out Button */}
//               {user ? (
//                 <Button color="inherit" onClick={handleLogout} sx={{ fontWeight: "bold" }}>
//                   Sign Out
//                 </Button>
//               ) : (
//                 <Button color="inherit" component={Link} to="/signin" sx={{ fontWeight: "bold" }}>
//                   Sign In
//                 </Button>
//               )}
//             </Box>
//           </Toolbar>
//         </Container>
//       </AppBar>
//       {/* ✅ Offset for fixed AppBar */}
//       <Box sx={{ height: "64px" }} />
//     </>
//   );
// };

// export default Header;
import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // ✅ Import hamburger menu icon
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contextAPI/context";
import taskLogo from "../../assets/task.png"; // Import Task Manager logo

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false); // ✅ Manage drawer state

  const handleLogout = () => {
    logout();
    navigate("/");
    setDrawerOpen(false); // Close drawer after logout
  };

  // ✅ Navigation Links
  const navLinks = [
    { text: "Home", path: "/" },
    { text: "Tasks", path: "/tasks" },
    { text: "Profile", path: "/profile" },
    { text: "Analytics", path: "/analytics" },
    { text: "Contact", path: "/contact" },
  ];

  if (user?.role === "Admin") {
    navLinks.push({ text: "Users", path: "/users" });
  }

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#1565c0",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
          width: "100%",
          zIndex: 1100,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar>
            {/* ✅ Mobile Menu Button */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { xs: "block", md: "none" }, mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            {/* ✅ Task Manager Logo */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img src={taskLogo} alt="Task Manager Logo" style={{ width: 30, height: 30, marginRight: 10 }} />
              <Typography variant="h6" sx={{ fontWeight: "bold", letterSpacing: "1px" }}>
                Task Manager
              </Typography>
            </Box>

            {/* ✅ Spacer for alignment */}
            <Box sx={{ flexGrow: 1 }} />

            {/* ✅ Desktop Navigation Links */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              {navLinks.map((link) => (
                <Button key={link.text} color="inherit" component={Link} to={link.path} sx={{ fontWeight: "bold" }}>
                  {link.text}
                </Button>
              ))}

              {/* ✅ Show Sign In/Sign Out Button */}
              {user ? (
                <Button color="inherit" onClick={handleLogout} sx={{ fontWeight: "bold",color:'warning' }}>
                  Sign Out
                </Button>
              ) : (
                <Button color="inherit" component={Link} to="/signin" sx={{ fontWeight: "bold",color:'warning' }}>
                  Sign In
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ✅ Mobile Drawer (Sidebar) */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
  <Box
    sx={{
      width: 260,
      display: "flex",
      flexDirection: "column",
      height: "100%",
      backgroundColor: "#f5f5f5", // Light gray background
    }}
    role="presentation"
    onClick={() => setDrawerOpen(false)}
  >
    {/* ✅ Drawer Header with Logo */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        backgroundColor: "#1565c0", // Matching AppBar color
        color: "white",
      }}
    >
      <img src={taskLogo} alt="Task Manager" style={{ width: 30, height: 30, marginRight: 10 }} />
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Task Manager
      </Typography>
    </Box>

    {/* ✅ Navigation Links */}
    <List sx={{ flexGrow: 1 }}>
      {navLinks.map((link) => (
        <ListItem key={link.text} disablePadding>
          <ListItemButton component={Link} to={link.path} sx={{ padding: "12px" }}>
            <ListItemText
              primary={link.text}
              sx={{ textAlign: "center", fontWeight: "bold", color: "#333" }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>

    <Divider />

    {/* ✅ Sign In / Sign Out Button */}
    <List>
      <ListItem disablePadding>
        {user ? (
          <ListItemButton onClick={handleLogout} sx={{ padding: "12px" }}>
            <ListItemText
              primary="Sign Out"
              sx={{ textAlign: "center", fontWeight: "bold", color: "red" }}
            />
          </ListItemButton>
        ) : (
          <ListItemButton component={Link} to="/signin" sx={{ padding: "12px" }}>
            <ListItemText
              primary="Sign In"
              sx={{ textAlign: "center", fontWeight: "bold", color: "green" }}
            />
          </ListItemButton>
        )}
      </ListItem>
    </List>
  </Box>
</Drawer>


      {/* ✅ Offset for fixed AppBar */}
      <Box sx={{ height: "64px" }} />
    </>
  );
};

export default Header;
