# Job Finder Backend

A Node.js/Express backend for a job portal application supporting user, employer, and admin roles. Features include authentication, job posting and application, profile management, notifications, and employer verification.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [License](#license)

---

## Features

- User and employer registration/login with JWT authentication
- User and employer profile management (including profile picture/logo upload)
- Job posting (employer) and job application (user)
- Application status tracking and notifications
- Admin panel for employer verification and management
- MongoDB database integration

## Project Structure

```
.
├── config/
│   └── db.js                # MongoDB connection logic
├── controllers/             # Route controllers
│   ├── adminController.js
│   ├── authController.js
│   ├── employerJobController.js
│   ├── notificationController.js
│   ├── profileController.js
│   └── userJobController.js
├── middlewares/             # Express middlewares
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
├── models/                  # Mongoose models
│   ├── EmployerProfile.js
│   ├── Job.js
│   ├── Notification.js
│   ├── User.js
│   └── UserProfile.js
├── routes/                  # Express route definitions
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── jobRoutes.js
│   ├── notificationRoutes.js
│   └── profileRoutes.js
├── uploads/                 # Uploaded files (profile pictures, logos)
│   ├── dummy/
│   ├── employer-logos/
│   └── profile-pictures/
├── utils/
│   └── generateToken.js     # JWT token generation
├── .env                     # Environment variables
├── index.js                 # Entry point
└── package.json
```

## API Routes

- **Auth:** `/api/auth`  
  Register, login, logout, profile, admin-only data

- **Profile:** `/api/profile`  
  Get/update user/employer profile, upload profile picture/logo

- **Jobs:** `/api/jobs`  
  Post/edit/delete jobs (employer), apply to jobs (user), view applications

- **Notifications:** `/api/notifications`  
  Get, mark as read, clear, and delete notifications

- **Admin:** `/api/admin`  
  Employer verification, view/delete employers (admin only)

## Environment Variables

Create a `.env` file in the root:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/jobfinder-vite
JWT_SECRET=your_jwt_secret
```

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure environment:**
   - Copy `.env` and set your variables.

3. **Run the server:**
   ```sh
   npm run dev
   ```
   The server will start on the port specified in `.env` (default: 5000).

## Scripts

- `npm run dev` — Start server with nodemon (development)
- `npm start` — Start server with Node.js

## License

MIT

---

**Author:** Dakka Chandan