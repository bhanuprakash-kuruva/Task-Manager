import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Layout from "./Layout/Layout";
import { AuthContext } from "../contextAPI/context";
import { useNavigate } from "react-router-dom";

const API_URL = "/api/tasks"; // Backend URL

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]; // Colors for Pie Chart

const Analytics = () => {
  const navigate = useNavigate()
  const {user} = useContext(AuthContext)
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, inProgress: 0, toDo: 0 });

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // ✅ Calculate task statistics
  const calculateStats = (tasks) => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.status === "Completed").length;
    const inProgress = tasks.filter((task) => task.status === "In Progress").length;
    const toDo = tasks.filter((task) => task.status === "To Do").length;

    setStats({ total, completed, inProgress, toDo });
  };

  // ✅ Data for Pie Chart
  const pieData = [
    { name: "Completed", value: stats.completed },
    { name: "In Progress", value: stats.inProgress },
    { name: "To Do", value: stats.toDo },
  ];
    
  // ✅ Data for Bar Chart
  const barData = [
    { name: "Completed", count: stats.completed },
    { name: "In Progress", count: stats.inProgress },
    { name: "To Do", count: stats.toDo },
  ];

  return (
    <Layout>
        <Box sx={{ p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Task Analytics
      </Typography>

      {/* ✅ Task Stats Summary */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#0088FE", color: "white" }}>
            <Typography variant="h6">Total Tasks</Typography>
            <Typography variant="h5">{stats.total}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#00C49F", color: "white" }}>
            <Typography variant="h6">Completed</Typography>
            <Typography variant="h5">{stats.completed}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#FFBB28", color: "white" }}>
            <Typography variant="h6">In Progress</Typography>
            <Typography variant="h5">{stats.inProgress}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* ✅ Charts */}
      <Grid container spacing={3}>
        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" align="center">Task Distribution</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" align="center">Task Status Overview</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
    </Layout>
  );
};

export default Analytics;
