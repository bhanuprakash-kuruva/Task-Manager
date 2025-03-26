import React from "react";
import {
    Box,
    Typography,
    Button,
    Container,
    Grid,
    Card,
    CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import { CheckCircle, TrendingUp, PeopleAlt, PersonAdd, Assignment, BarChart } from "@mui/icons-material";
import Layout from "./Layout/Layout";

const Home = () => {
    return (
        <Layout>
            <Container maxWidth="md" sx={{ marginBottom: 8 }}>
                {/* Welcome Section */}
                <Box
                    sx={{
                        textAlign: "center",
                        mt: 5,
                        p: 5,
                        borderRadius: 3,
                        boxShadow: 3,
                        background: "linear-gradient(to right, #42a5f5, #1e88e5)",
                        color: "white",
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": { transform: "scale(1.02)" },
                    }}
                >
                    <Typography variant="h4" gutterBottom fontWeight="bold">
                        Welcome to Task Manager 🚀
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        Organize, track, and collaborate on tasks effortlessly.
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ mr: 2, fontWeight: "bold" }}
                        component={Link}
                        to="/tasks"
                    >
                        📋 View Tasks
                    </Button>
                    <Button
                        variant="outlined"
                        color="inherit"
                        sx={{ fontWeight: "bold" }}
                        component={Link}
                        to="/analytics"
                    >
                        📊 View Analytics
                    </Button>
                </Box>

                {/* Key Features Section */}
                <Box sx={{ mt: 6 }}>
                    <Typography variant="h5" textAlign="center" fontWeight="bold" gutterBottom>
                        Why Choose Task Manager? 🤔
                    </Typography>
                    <Grid container spacing={3} justifyContent="center">
                        {[
                            { title: "Easy Task Management", desc: "Create, edit, and delete tasks effortlessly.", icon: <CheckCircle color="primary" fontSize="large" /> },
                            { title: "Progress Tracking", desc: "Analyze your productivity with insightful analytics.", icon: <TrendingUp color="primary" fontSize="large" /> },
                            { title: "Collaborate with Teams", desc: "Work with your team in real-time on shared tasks.", icon: <PeopleAlt color="primary" fontSize="large" /> },
                        ].map((feature, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Card
                                    sx={{
                                        textAlign: "center",
                                        p: 3,
                                        boxShadow: 5,
                                        transition: "all 0.3s",
                                        "&:hover": { boxShadow: 10, transform: "translateY(-5px)" },
                                    }}
                                >
                                    <CardContent>
                                        {feature.icon}
                                        <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {feature.desc}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* How It Works Section */}
                <Box sx={{ mt: 6, textAlign: "center" }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        How It Works ⚙️
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Get started in just 3 easy steps:
                    </Typography>
                    <Grid container spacing={3} justifyContent="center">
                        {[
                            { step: "1", title: "Sign Up", desc: "Create an account in just a few clicks.", icon: <PersonAdd color="primary" fontSize="large" /> },
                            { step: "2", title: "Create Tasks", desc: "Add tasks, set deadlines, and assign them.", icon: <Assignment color="primary" fontSize="large" /> },
                            { step: "3", title: "Track Progress", desc: "Monitor your productivity with analytics.", icon: <BarChart color="primary" fontSize="large" /> },
                        ].map((item, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Card
                                    sx={{
                                        textAlign: "center",
                                        p: 3,
                                        boxShadow: 5,
                                        transition: "all 0.3s",
                                        "&:hover": { boxShadow: 10, transform: "translateY(-5px)" },
                                    }}
                                >
                                    <CardContent>
                                        {item.icon}
                                        <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
                                            {item.step}. {item.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.desc}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Get Started Section */}
                <Box
                    sx={{
                        textAlign: "center",
                        mt: 6,
                        p: 5,
                        borderRadius: 3,
                        background: "linear-gradient(to right, #ff7043, #f4511e)",
                        color: "white",
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": { transform: "scale(1.02)" },
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Get Started Today! 🚀
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        Join thousands of users boosting their productivity.
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ fontWeight: "bold" }}
                        component={Link}
                        to="/signup"
                    >
                        📝 Sign Up Now
                    </Button>
                </Box>
            </Container>
        </Layout>
    );
};

export default Home;
