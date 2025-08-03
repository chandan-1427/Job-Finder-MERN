# JobFinder – Full Stack Job Portal

A modern job portal application built with **React**, **Vite**, **Tailwind CSS** (frontend), and **Node.js/Express**, **MongoDB** (backend). The platform supports job seekers, employers, and admins with role-based dashboards, job posting, application tracking, notifications, and employer verification.

---

## Table of Contents

- [Features](#features)
- [Monorepo Structure](#monorepo-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Overview](#api-overview)
- [Customization](#customization)
- [License](#license)

---

## Features

- **Authentication**: Register/login as job seeker or employer (JWT-based).
- **Role-based Dashboards**:
  - **Job Seeker**: Browse/apply for jobs, track applications, manage profile.
  - **Employer**: Post jobs, manage applicants, edit company profile.
  - **Admin**: Verify/unverify employers, delete employer profiles.
- **Notifications**: Real-time updates for job application status.
- **Profile Management**: Edit user/employer profiles, upload avatars/logos.
- **Application Tracking**: Status updates and history for job applications.
- **Responsive UI**: Mobile-friendly layouts and navigation.
- **Reusable Components**: Buttons, modals, input fields, layouts, etc.
- **MongoDB Integration**: Robust data storage for users, jobs, applications.

---

## Monorepo Structure

```
.
├── backend/    # Node.js/Express REST API
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── .env
│   ├── index.js
│   ├── package.json
│   └── README.md
├── frontend/   # React/Vite/Tailwind client app
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── package.json
│   └── README.md
└── README.md   # (this file)
```

See [backend/README.md](backend/README.md) and [frontend/README.md](frontend/README.md) for detailed subproject documentation.

---

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Axios, React Router v6, JWT (localStorage)
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Nodemon
- **Other**: RESTful API, Role-based access, File uploads

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB (local or cloud)

### Setup

#### 1. Clone the repository

```sh
git clone <repo-url>
cd job-finder-try
```

#### 2. Install dependencies

```sh
cd backend
npm install
cd ../frontend
npm install
```

#### 3. Configure environment

- Copy `.env` in `backend/` and set your variables (see [backend/README.md](backend/README.md)).

#### 4. Start backend server

```sh
cd backend
npm run dev
```

#### 5. Start frontend dev server

```sh
cd frontend
npm run dev
```

#### 6. Access the app

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:5000](http://localhost:5000)

---

## API Overview

- **Auth:** `/api/auth` — Register, login, logout, profile, admin-only data
- **Profile:** `/api/profile` — Get/update user/employer profile, upload profile picture/logo
- **Jobs:** `/api/jobs` — Post/edit/delete jobs (employer), apply to jobs (user), view applications
- **Notifications:** `/api/notifications` — Get, mark as read, clear, and delete notifications
- **Admin:** `/api/admin` — Employer verification, view/delete employers (admin only)

See [backend/README.md](backend/README.md) for full API details.

---

## Customization

- **Styling**: Tailwind CSS and custom fonts (`Outfit`)
- **Routing**: Managed by `react-router-dom` with role-based redirects
- **Environment**: Update API URLs as needed for deployment

---

## License

MIT

---

**Developed with ❤️ using React, Vite, Tailwind CSS, Node.js, and MongoDB.**

**Author:** Dakka Chandan
