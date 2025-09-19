# MERN Task Manager

A simple task manager application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- Create, read, update, and delete tasks
- Mark tasks as completed/pending
- Modern UI with Tailwind CSS
- Real-time updates with React Query
- Responsive design

## Project Structure

```
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── models/
│   │   └── taskModel.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   └── Navbar.js
    │   ├── hooks/
    │   │   └── useTasks.js
    │   ├── pages/
    │   │   ├── TaskList.js
    │   │   └── TaskForm.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── index.css
    │   └── index.js
    ├── package.json
    ├── postcss.config.js
    └── tailwind.config.js
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make sure MongoDB is running locally, or update the MONGO_URI in `.env` file

4. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will run on http://localhost:5000

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```
   The frontend will run on http://localhost:3000

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a single task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Task Model

```javascript
{
  title: String (required),
  completed: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

## Technologies Used

### Backend
- Express.js - Web framework
- Mongoose - MongoDB object modeling
- CORS - Cross-origin resource sharing
- dotenv - Environment variable management

### Frontend
- React - UI library
- React Router - Client-side routing
- React Query - Data fetching and caching
- Tailwind CSS - Utility-first CSS framework
- Axios - HTTP client