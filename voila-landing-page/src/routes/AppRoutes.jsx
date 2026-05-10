import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";

// Import semua halaman publik
import LandingPage from "../pages/public/LandingPage";
import Indoor from "../pages/public/Indoor";
import Outdoor from "../pages/public/Outdoor";
import Craft from "../pages/public/Craft";
import Contact from "../pages/public/Contact";

// Import Admin Master Layout & Auth
import AdminLayout from "../pages/admin/AdminLayout";
import Login from "../pages/admin/Login";

// Import Panel Admin
import HomePanel from "../pages/admin/panels/HomePanel";
import AboutPanel from "../pages/admin/panels/AboutPanel";
import ProjectPanel from "../pages/admin/panels/ProjectPanel";
import ContactPanel from "../pages/admin/panels/ContactPanel";
import CustomerPanel from "../pages/admin/panels/CustomerPanel";
import ProductPanel from "../pages/admin/panels/ProductPanel";
import GeneralPanel from "../pages/admin/panels/GeneralPanel";

// Import Header
import Header from "../components/Header";

// ─── HELPER AUTH ──────────────────────────────────────────────────────────────
const isAuthenticated = () => localStorage.getItem("isLoggedIn") === "true";

// ─── PROTECTED ROUTE ──────────────────────────────────────────────────────────
// Lapis pertama & kedua: dicek React Router setiap render.
// Dipakai di parent /admin DAN setiap child route sekaligus.
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// ─── AUTH GUARD ───────────────────────────────────────────────────────────────
// Lapis ketiga: menangkap tombol back/forward browser (bfcache bypass)
// dan akses langsung via address bar sebelum React sempat render.
const AuthGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const isAdminPath = window.location.pathname.startsWith("/admin");
      if (isAdminPath && !isAuthenticated()) {
        navigate("/login", { replace: true });
      }
    };

    checkAuth();
    window.addEventListener("popstate", checkAuth);
    return () => window.removeEventListener("popstate", checkAuth);
  }, [location, navigate]);

  return null;
};

// ─── HOOK LOGOUT ──────────────────────────────────────────────────────────────
export const useLogout = () => {
  const navigate = useNavigate();
  return () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login", { replace: true });
  };
};

// ─── APP CONTENT ──────────────────────────────────────────────────────────────
const AppContent = () => {
  const location = useLocation();
  const hideHeader =
    location.pathname.startsWith("/admin") || location.pathname === "/login";

  return (
    <>
      <AuthGuard />
      {!hideHeader && <Header />}
      <Routes>
        {/* ── Rute Publik ── */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/indoor" element={<Indoor />} />
        <Route path="/outdoor" element={<Outdoor />} />
        <Route path="/craft" element={<Craft />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* ── Rute Admin ──────────────────────────────────────────────────────
         *
         * PROTEKSI BERLAPIS 3:
         *
         *  Lapis 1 (parent)  → ProtectedRoute membungkus <AdminLayout>
         *                       Jika tidak login, langsung redirect ke /login
         *                       sebelum AdminLayout sempat di-render.
         *
         *  Lapis 2 (child)   → Setiap child route juga dibungkus ProtectedRoute
         *                       tersendiri. Jika seseorang berhasil bypass lapis 1
         *                       (misal via browser cache), lapis ini tetap memblokir
         *                       render panel yang diminta.
         *
         *  Lapis 3 (guard)   → AuthGuard di atas mendengarkan event popstate
         *                       (tombol back/forward) dan mount check, menangkap
         *                       kasus bfcache bypass yang tidak melewati React Router.
         *
         * ──────────────────────────────────────────────────────────────────── */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              {" "}
              {/* ← Lapis 1 */}
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute>
                {" "}
                {/* ← Lapis 2 */}
                <Navigate to="/admin/home" replace />
              </ProtectedRoute>
            }
          />
          <Route
            path="home"
            element={
              <ProtectedRoute>
                <HomePanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="about"
            element={
              <ProtectedRoute>
                <AboutPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="project"
            element={
              <ProtectedRoute>
                <ProjectPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="contact"
            element={
              <ProtectedRoute>
                <ContactPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="customers"
            element={
              <ProtectedRoute>
                <CustomerPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="indoor"
            element={
              <ProtectedRoute>
                <ProductPanel category="Indoor" />
              </ProtectedRoute>
            }
          />
          <Route
            path="outdoor"
            element={
              <ProtectedRoute>
                <ProductPanel category="Outdoor" />
              </ProtectedRoute>
            }
          />
          <Route
            path="craft"
            element={
              <ProtectedRoute>
                <ProductPanel category="Craft" />
              </ProtectedRoute>
            }
          />
          <Route
            path="general"
            element={
              <ProtectedRoute>
                <GeneralPanel />
              </ProtectedRoute>
            }
          />

          {/* Fallback: sub-path admin tidak dikenal → ke home */}
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Navigate to="/admin/home" replace />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Fallback global: path tidak dikenal → ke halaman utama */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

const AppRoutes = () => (
  <Router>
    <AppContent />
  </Router>
);

export default AppRoutes;
