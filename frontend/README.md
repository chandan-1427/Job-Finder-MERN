# JobFinder Frontend

A modern job portal frontend built with **React**, **Vite**, and **Tailwind CSS**. This project supports job seekers, employers, and admins with role-based dashboards, job posting, application tracking, and notification features.

## Features

- **Authentication**: Register and login as a job seeker or employer.
- **Role-based Dashboards**:
  - **Job Seeker**: Browse jobs, apply, track applications, manage profile.
  - **Employer**: Post jobs, manage applicants, edit company profile.
  - **Admin**: Verify/unverify employers, delete employer profiles.
- **Notifications**: Real-time updates for job application status.
- **Responsive UI**: Mobile-friendly layouts and navigation.
- **Profile Management**: Edit user/employer profiles, upload avatars/logos.
- **Reusable Components**: Buttons, modals, input fields, layouts, etc.

## Folder Structure

```
src/
  App.jsx                # Main app and routing
  main.jsx               # Entry point
  index.css, App.css     # Global styles (Tailwind + custom)
  assets/                # Static assets (e.g., SVGs)
  components/
    MainLayout.jsx
    nav/                 # Header, Footer, Navigation
    Auth/                # AuthLayout, RoleSelector
    Branding/            # Logo
    Buttons/             # PrimaryButton, RoleToggle
    Feedback/            # FeedbackMessage
    Form/                # InputField
    Profile/             # Profile views, editors, helpers
    ui/                  # Modal, etc.
  layouts/
    AuthLayout.jsx
    EmployerLayout.jsx
    UserLayout.jsx
  pages/
    AdminPage.jsx
    JobsPage.jsx
    LandingPage.jsx
    LoginPage.jsx
    NotificationsPage.jsx
    RegisterPage.jsx
    employer/            # Employer dashboard, job post, etc.
    user/                # User home, job apply, etc.
    Profile/             # UserProfilePage, EmployerProfilePage
    shared/              # NotFound, etc.
  utils/
    logout.js            # Logout helper
public/
  vite.svg               # Favicon
index.html               # HTML entry point
vite.config.js           # Vite config
eslint.config.js         # ESLint config
package.json             # Project metadata and scripts
```

## Tech Stack

- ⚛️ React 18
- ⚡ Vite
- 🎨 Tailwind CSS
- 📦 Axios
- 🔐 JWT Authentication
- 🧭 React Router v6
- 💾 LocalStorage for tokens

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```

4. **Build for production:**
   ```sh
   npm run build
   ```

5. **Preview production build:**
   ```sh
   npm run preview
   ```

### Linting

```sh
npm run lint
```

## API Endpoints

The frontend expects a backend running at `http://localhost:5000` with REST endpoints for authentication, jobs, profiles, notifications, and admin actions.

## Customization

- **Styling**: Uses Tailwind CSS and custom fonts (`Outfit`).
- **Routing**: Managed by `react-router-dom` with role-based redirects.
- **Environment**: Update API URLs as needed for deployment.

## License

MIT

---

**Developed with ❤️ using React, Vite, and Tailwind CSS.**

**Author:** Dakka Chandan
