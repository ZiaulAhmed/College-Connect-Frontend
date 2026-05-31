// src/App.js
import React from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";

import "./App.css"; // 👈 global modern styles

/* ================= PAGES ================= */
import Login from "./pages/Login";
import SignupChoice from "./pages/SignupChoice";
import StudentSignup from "./pages/StudentSignup";
import FacultySignup from "./pages/FacultySignup"; // ✅ STEP 2.1 ADDED

import Announcements from "./pages/Announcements";
import CreateAnnouncement from "./pages/CreateAnnouncement";
import AdminAnnouncements from "./pages/AdminAnnouncements";
import DashboardRouter from "./pages/DashboardRouter";
import Profile from "./pages/Profile";
import Resources from "./pages/Resources";
import Events from "./pages/Events";
import CreateEventPage from "./pages/CreateEventPage";
import AdminApprovals from "./pages/AdminApprovals";
import Timetable from "./pages/Timetable";
import Notes from "./pages/Notes";
import Syllabus from "./pages/Syllabus";
import DepartmentStudents from "./pages/DepartmentStudents";
import Complaints from "./pages/Complaints";
import Feedback from "./pages/Feedback";
import MessMenu from "./pages/MessMenu";
import LostFound from "./pages/LostFound";
import CampusMap from "./pages/CampusMap";
import Emergency from "./pages/Emergency";
import ITSupport from "./pages/ITSupport";
import Clubs from "./pages/Clubs";
import SocialEvents from "./pages/SocialEvents";
import UserSearch from "./pages/UserSearch";
import Leaderboard from "./pages/Leaderboard";
import Sponsorships from "./pages/Sponsorships";

/* ================= COMPONENTS ================= */
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  return (
    
    <Router>
      <Routes>
        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/login" element={<Login />} />

        {/* Signup selection page */}
        <Route path="/signup" element={<SignupChoice />} />

        {/* Student self-registration */}
        <Route path="/signup/student" element={<StudentSignup />} />

        {/* ✅ STEP 2.1: Faculty self-registration */}
        <Route path="/signup/faculty" element={<FacultySignup />} />

        {/* ================= DASHBOARD ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardRouter />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Announcements */}
        <Route
          path="/dashboard/announcements"
          element={
            <ProtectedRoute>
              <Layout>
                <Announcements />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/announcements/create"
          element={
            <ProtectedRoute>
              <Layout>
                <CreateAnnouncement />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Resources */}
        <Route
          path="/dashboard/resources"
          element={
            <ProtectedRoute>
              <Layout>
                <Resources />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Events */}
        <Route
          path="/dashboard/events"
          element={
            <ProtectedRoute>
              <Layout>
                <Events />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/events/create"
          element={
            <ProtectedRoute roles={["admin", "faculty"]}>
              <Layout>
                <CreateEventPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Admin announcements moderation */}
        <Route
          path="/dashboard/admin/announcements"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Layout>
                <AdminAnnouncements />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Admin approvals (students + faculty) */}
        <Route
          path="/dashboard/admin/approvals"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Layout>
                <AdminApprovals />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Academics */}
        <Route
          path="/dashboard/timetable"
          element={
            <ProtectedRoute>
              <Layout>
                <Timetable />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Campus Utilities */}
        <Route
          path="/dashboard/mess-menu"
          element={
            <ProtectedRoute>
              <Layout>
                <MessMenu />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/lost-found"
          element={
            <ProtectedRoute>
              <Layout>
                <LostFound />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/campus-map"
          element={
            <ProtectedRoute>
              <Layout>
                <CampusMap />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/emergency"
          element={
            <ProtectedRoute>
              <Layout>
                <Emergency />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/it-support"
          element={
            <ProtectedRoute>
              <Layout>
                <ITSupport />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Campus Social Life */}
        <Route
          path="/dashboard/clubs"
          element={
            <ProtectedRoute>
              <Layout>
                <Clubs />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/social-events"
          element={
            <ProtectedRoute>
              <Layout>
                <SocialEvents />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <ProtectedRoute>
              <Layout>
                <UserSearch />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/leaderboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Leaderboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/sponsorships"
          element={
            <ProtectedRoute>
              <Layout>
                <Sponsorships />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/notes"
          element={
            <ProtectedRoute>
              <Layout>
                <Notes />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/syllabus"
          element={
            <ProtectedRoute>
              <Layout>
                <Syllabus />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/feedback"
          element={
            <ProtectedRoute>
              <Layout>
                <Feedback />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/complaints"
          element={
            <ProtectedRoute>
              <Layout>
                <Complaints />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Department Students */}
        <Route
          path="/dashboard/department-students"
          element={
            <ProtectedRoute roles={["faculty", "admin"]}>
              <Layout>
                <DepartmentStudents />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
