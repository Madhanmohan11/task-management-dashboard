# Task Management Dashboard

A modern, responsive Task Management Dashboard built with **React**, **Vite**, and **Tailwind CSS**. The application demonstrates modern frontend development practices, including CRUD operations, Context API state management, responsive UI, dark mode, animations, and API integration using JSON Server.

## Project Overview

This project was developed as a Frontend Developer technical assessment.

The application allows users to:

- Login with frontend validation
- View task statistics- u[8hn]
- Search and filter tasks
- Create new tasks
- Edit existing tasks
- Delete tasks with confirmation
- Toggle Dark/Light mode
- Experience a responsive interface across Desktop, Tablet, and Mobile devices

## Features

### Authentication
- Login page with Email and Password
- React Hook Form validation
- Dummy authentication using localStorage
- Protected dashboard route

### Dashboard
- Statistics Cards
  - Total Tasks
  - Completed Tasks
  - Pending Tasks
  - In Progress Tasks
- Responsive Task Table
- Live Search
- Filter by Status
- Sort by Due Date and Priority

### Task Management
- Create Task (Modal)
- Edit Task (Reusable Modal)
- Delete Task with confirmation
- Form validation
- Loading states
- Toast notifications

### UI / UX
- Fully Responsive Design
- Dark / Light Mode
- Framer Motion animations
- Empty State
- Loading State

---

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hook Form
- Context API
- Framer Motion
- React Hot Toast
- Lucide React
- JSON Server

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate to the project

```bash
cd task-management-dashboard
```

Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
VITE_API_URL=http://localhost:5000
```

---

## Run the Application

### Run both Frontend and JSON Server

```bash
npm run dev:all
```

Or run them separately.

### Start JSON Server

```bash
npm run server
```

### Start React Application

```bash
npm run dev
```

Frontend

```
http://localhost:5173
```

API

```
http://localhost:5000
```

---

## Available Scripts

Start React application

```bash
npm run dev
```

Start JSON Server

```bash
npm run server
```

Run both together

```bash
npm run dev:all
```

Create production build

```bash
npm run build
```

---

## Login

This project uses frontend-only authentication.

Email

```
Any valid email address
```

Password
 
```
Any Minimum 6 characters
```

After successful validation, a dummy authentication token is stored in `localStorage` and the user is redirected to the dashboard.

---

## API

The application uses **JSON Server** as a mock backend.

Supported API operations:

- GET
- POST
- PUT
- DELETE


Thank you for reviewing this project.