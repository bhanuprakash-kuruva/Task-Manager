import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Tasks from "./components/Tasks";
import Analytics from "./components/Analytics";
import Contact from "./components/Contact";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./contextAPI/context";
import Users from "./components/Users";
import NotFound from "./components/PageNotFound";
import UserProfilePage from "./components/Profile";
function App() {
  return (
    <AuthProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/profile" element={<UserProfilePage/>}/>
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
