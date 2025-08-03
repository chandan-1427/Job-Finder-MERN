import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import LandingPage from './pages/LandingPage.jsx';
import Register from './pages/RegisterPage.jsx';
import Login from './pages/LoginPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import UserProfilePage from './pages/Profile/UserProfilePage.jsx';
import EmployerProfilePage from './pages/Profile/EmployerProfilePage.jsx';
import UserHomePage from './pages/user/HomePage.jsx';
import EmployerHomePage from './pages/employer/HomePage.jsx';
import NotFound from './pages/shared/NotFound.jsx';
import JobsPage from './pages/JobsPage.jsx';
import JobPostPage from './pages/employer/JobPostPage.jsx';
import EmployerDashboard from './pages/employer/EmployerDashboard.jsx';
import NotificationsPage from './pages/NotificationsPage.jsx';

// Layouts
import UserLayout from './layouts/UserLayout.jsx';
import EmployerLayout from './layouts/EmployerLayout.jsx';

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        {/* Landing Page Logic */}
        <Route
          path="/"
          element={
            user?.role === "employer" ? (
              <Navigate to="/employer/home" />
            ) : user?.role === "user" ? (
              <Navigate to="/user/home" />
            ) : (
              <LandingPage onNavigate={(path) => (window.location.pathname = `/${path}`)} />
            )
          }
        />

        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Profile Pages */}
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/employer-profile" element={<EmployerProfilePage />} />

        {/* User Layout + Pages */}
        <Route path="/user" element={<UserLayout />}>
          <Route path="home" element={<UserHomePage />} />
        </Route>

        {/* Employer Layout + Pages */}
        <Route path="/employer" element={<EmployerLayout />}>
          <Route path="home" element={<EmployerHomePage />} />
          <Route path="dashboard" element={<EmployerDashboard />} />
        </Route>

        {/* Job + Notification Routes */}
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/post-job" element={<JobPostPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
