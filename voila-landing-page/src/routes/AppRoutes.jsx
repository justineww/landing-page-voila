import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

// Import semua halaman publik
import LandingPage from "../pages/public/LandingPage";
import Indoor from "../pages/public/Indoor";
import Outdoor from "../pages/public/Outdoor";
import Craft from "../pages/public/Craft";

// Import Admin Master Layout & Auth
import AdminLayout from "../pages/admin/AdminLayout";
import Login from "../pages/admin/Login";

// Import Panel Admin
import HomePanel from "../pages/admin/panels/HomePanel";
import AboutPanel from "../pages/admin/panels/AboutPanel";
import ProjectPanel from "../pages/admin/panels/ProjectPanel";
import ContactPanel from "../pages/admin/panels/ContactPanel";
import ProductPanel from "../pages/admin/panels/ProductPanel";
import GeneralPanel from "../pages/admin/panels/GeneralPanel";

// Import Header
import Header from "../components/Header";

// ─── PROTECTED ROUTE ──────────────────────────────────────────────────────────
// Cek apakah user sudah login (ada data di localStorage)
// Jika belum login, redirect ke /login
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// ─── APP CONTENT ──────────────────────────────────────────────────────────────
const AppContent = () => {
  const location = useLocation();

  const hideHeader =
    location.pathname.startsWith("/admin") || location.pathname === "/login";

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        {/* Rute Publik */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/indoor" element={<Indoor />} />
        <Route path="/outdoor" element={<Outdoor />} />
        <Route path="/craft" element={<Craft />} />

        <Route path="/login" element={<Login />} />

        {/* Rute Admin — dilindungi ProtectedRoute */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePanel />} />
          <Route path="home" element={<HomePanel />} />
          <Route path="about" element={<AboutPanel />} />
          <Route path="project" element={<ProjectPanel />} />
          <Route path="contact" element={<ContactPanel />} />
          <Route path="indoor" element={<ProductPanel category="Indoor" />} />
          <Route path="outdoor" element={<ProductPanel category="Outdoor" />} />
          <Route path="craft" element={<ProductPanel category="Craft" />} />
        </Route>
      </Routes>
    </>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default AppRoutes;
