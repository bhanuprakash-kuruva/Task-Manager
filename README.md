# Task Manager App

## Live URL
[Task Manager App](https://task-manager-hco5.onrender.com/) - (https://task-manager-hco5.onrender.com/)

**⚠ Warning:** This application is deployed on Render. Please wait for some time if the server is inactive.

## Overview
Task Manager App allows users to manage their tasks, including creating, updating, retrieving, and deleting tasks. User authentication is required for most operations, using JWT tokens.

## Tech Stack
- **Frontend:** React.js, Material UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## Installation Steps and Setup Instructions
### Prerequisites:
- Node.js installed
- MongoDB database running (either locally or using MongoDB Atlas)

### Steps to Set Up the Project:
1. Clone the repository:
   ```bash
   git clone https://github.com/bhanuprakash-kuruva/Task-Manager
   cd Task-Manager
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure environment variables:
   ```env
   PORT=5019
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_secret_key
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Base URL
```
http://localhost:5019/api
```

## Authentication
All protected routes require a valid JWT token in the `Authorization` header.
```
Authorization: Bearer <your_token>
```

---

## Endpoints

### **User Authentication**

#### **Register a New User**
- **URL:** `/users/register`
- **Method:** `POST`
- **Authentication:** Public
- **Request Body:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "status": "success",
  "message": "Registration successful",
  "token": "your_jwt_token"
}
```

#### **User Login**
- **URL:** `/users/login`
- **Method:** `POST`
- **Authentication:** Public
- **Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "status": "success",
  "message": "Login successful",
  "token": "your_jwt_token"
}
```

#### **Get Logged-in User**
- **URL:** `/users/me`
- **Method:** `GET`
- **Authentication:** **Protected** (JWT required)
- **Headers:**
```json
{
  "Authorization": "Bearer your_jwt_token"
}
```
- **Response:**
```json
{
  "user": {
    "_id": "67c6893849daf578dca351d0",
    "name": "user1",
    "email": "user1@example.com"
  }
}
```

---

### **Task Management**

#### **Create a New Task**
- **URL:** `/api/tasks`
- **Method:** `POST`
- **Authentication:** **Protected** (JWT required)
- **Request Body:**
```json
{
  "title": "Finish the project",
  "description": "Complete the Task Manager App",
  "completed": false
}
```
- **Response:**
```json
{
  "title": "Finish the project",
  "description": "Complete the Task Manager App",
  "completed": false,
  "user": "67c6893849daf578dca351d0",
  "_id": "67e2b495cd84d06b811e220a"
}
```

#### **Get All Tasks**
- **URL:** `/api/tasks`
- **Method:** `GET`
- **Authentication:** **Protected** (JWT required)
- **Headers:**
```json
{
  "Authorization": "Bearer your_jwt_token"
}
```
- **Response:**
```json
[
  {
    "_id": "67e2841ced7cd525c1738afb",
    "title": "Finish the project",
    "description": "Complete the Task Manager App",
    "completed": false,
    "user": {
      "_id": "67c6893849daf578dca351d0",
      "name": "user1",
      "email": "user1@example.com"
    }
  }
]
```

#### **Update a Task**
- **URL:** `/api/tasks/:id`
- **Method:** `PUT`
- **Authentication:** **Protected** (JWT required)
- **Request Body:**
```json
{
  "completed": true
}
```
- **Response:**
```json
{
  "message": "Task updated successfully"
}
```

#### **Delete a Task**
- **URL:** `/api/tasks/:id`
- **Method:** `DELETE`
- **Authentication:** **Protected** (JWT required)
- **Response:**
```json
{
  "message": "Task deleted successfully"
}
```

---

## UI Screenshots

### **Home Page**
![Home](https://github.com/bhanuprakash-kuruva/Task-Manager/blob/main/task-app/src/assets/Home.png?raw=true)

### **Tasks Page**
![Tasks](https://github.com/bhanuprakash-kuruva/Task-Manager/blob/main/task-app/src/assets/Tasks.png?raw=true)

### **Profile Page**
![Profile](https://github.com/bhanuprakash-kuruva/Task-Manager/blob/main/task-app/src/assets/Profile.png?raw=true)

### **Edit Task**
![Edit](https://github.com/bhanuprakash-kuruva/Task-Manager/blob/main/task-app/src/assets/Edit.png?raw=true)

### **User Management**
![User](https://github.com/bhanuprakash-kuruva/Task-Manager/blob/main/task-app/src/assets/User.png?raw=true)

### **Analytics**
![Analytics](https://github.com/bhanuprakash-kuruva/Task-Manager/blob/main/task-app/src/assets/Analytics.png?raw=true)

### **Contact Page**
![Contact](https://github.com/bhanuprakash-kuruva/Task-Manager/blob/main/task-app/src/assets/Contact.png?raw=true)





---

## About the Author

### Bhanu Prakash Kuruva
Bhanu Prakash is a passionate full-stack developer specializing in the **MERN (MongoDB, Express.js, React.js, Node.js) stack**. He has built various applications, including blogging platforms, restaurant apps, and AI-powered chatbots. Bhanu is always eager to explore **AI integrations, data visualization, and automation** in web applications. He is an **NSS Volunteer**, demonstrating his dedication to both technology and community service.

🔗 **LinkedIn:** [Bhanu Prakash Kuruva](https://linkedin.com/in/bhanuprakash-kuruva)  
🔗 **GitHub:** [bhanuprakash-kuruva](https://github.com/bhanuprakash-kuruva)

---

## Live URL
[Task Manager App](https://task-manager-hco5.onrender.com/) - (https://task-manager-hco5.onrender.com/)

**⚠ Warning:** This application is deployed on Render. Please wait for some time if the server is inactive.

