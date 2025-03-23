# Todo Application

A full-stack Todo application built with Next.js, Node.js, Express, and MongoDB.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Frontend Components](#frontend-components)
- [Database Schema](#database-schema)
- [State Management](#state-management)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Overview

This Todo application allows users to create, view, update, and delete tasks with a rich text editor. It features a responsive design that works on desktop and mobile devices, with pagination for handling large sets of todos, real-time search, and automatic saving.

## Features

- **Todo Management**: Create, read, update, and delete todos
- **Rich Text Editing**: Format text with bold, italic, underline; create lists; align text
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Real-time Search**: Search todos by title or description with debounce
- **Auto-Save**: Changes are automatically saved as you type
- **Pagination**: Efficient loading of todos with pagination controls
- **Modern UI**: Clean, intuitive user interface

## Technology Stack

### Frontend
- **Next.js (App Router)**: React framework for server-side rendering
- **React**: UI library
- **Tailwind CSS**: Utility-first CSS framework
- **Draft.js**: Rich text editor framework
- **Axios**: HTTP client for API requests
- **React Icons**: Icon library
- **date-fns**: Date formatting utilities

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web server framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **CORS**: Cross-origin resource sharing middleware
- **Morgan**: HTTP request logger

## Folder Structure

### Top-level Structure
```
todo-application/
├── backend/            # Backend server code
├── todo-app/           # Frontend Next.js application
└── README.md           # Project documentation
```

### Backend Structure
```
backend/
├── config/
│   └── db.js           # Database connection configuration
├── controllers/
│   └── todoController.js # Controllers for todo operations
├── models/
│   └── Todo.js         # Mongoose schema for todos
├── routes/
│   └── todoRoutes.js   # API route definitions
├── .env                # Environment variables (create this)
├── .gitignore          # Git ignore file
├── package.json        # Dependencies and scripts
└── server.js           # Express application entry point
```

### Frontend Structure
```
todo-app/
├── app/
│   ├── components/     # React components
│   │   ├── Logo.jsx           # Application logo
│   │   ├── RichTextEditor.jsx # Draft.js editor component
│   │   ├── SearchBar.jsx      # Search functionality
│   │   ├── TodoEditor.jsx     # Todo editing component
│   │   ├── TodoItem.jsx       # Individual todo display
│   │   └── TodoList.jsx       # List of todos with pagination
│   ├── lib/
│   │   └── api.js      # API service functions
│   ├── utils/
│   │   └── dateFormatter.js # Date utilities
│   ├── globals.css     # Global styles
│   ├── layout.js       # Root layout component
│   └── page.js         # Home page / main component
├── public/
│   ├── assets/
│   │   └── filePlus.svg # Icon for creating todos
│   └── logo.svg        # Application logo
├── .env.local          # Environment variables (create this)
├── .gitignore          # Git ignore file
├── next.config.js      # Next.js configuration
├── package.json        # Dependencies and scripts
├── postcss.config.js   # PostCSS configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## Prerequisites
Before you begin, ensure you have the following installed:

- **Node.js** (v14.x or later)
- **npm** (v6.x or later) or **yarn** (v1.22.x or later)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** (for cloning the repository)

## Getting Started

### Backend Setup

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd todo-application
   ```
2. Install backend dependencies:
   ```sh
   cd backend
   npm install
   ```
3. Create environment file:
   ```sh
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/todoapp
   CORS_ORIGIN=http://localhost:3000
   ```
4. Start the backend server:
   ```sh
   npm run dev  # Development mode with auto-restart
   npm start    # Production mode
   ```

### Frontend Setup

1. Install frontend dependencies:
   ```sh
   cd ../todo-app
   npm install
   ```
2. Create environment file:
   ```sh
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## Deployment

### Backend Deployment

#### Deployment Options:
- **Heroku**:
  ```sh
  heroku create
  git push heroku main
  ```
- **Digital Ocean/AWS/Azure**:
  - Set up a Node.js environment
  - Configure environment variables
  - Use PM2 for process management:
    ```sh
    npm install -g pm2
    pm2 start server.js
    ```

### Frontend Deployment

- **Vercel** (recommended for Next.js):
  ```sh
  npm install -g vercel
  vercel
  ```
- **Netlify**:
  - Connect your GitHub repository
  - Set build command: `npm run build`
  - Set publish directory: `.next`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

