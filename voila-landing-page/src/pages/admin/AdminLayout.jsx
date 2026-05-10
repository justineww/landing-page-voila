// src/pages/admin/AdminLayout.jsx
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  const menuList = [
    { name: "Home Panel", path: "/admin/home" },
    { name: "About Us Panel", path: "/admin/about" },
    { name: "Our Project Panel", path: "/admin/project" },
    { name: "Contact Us Panel", path: "/admin/contact" },
    { name: "Customer Panel", path: "/admin/customers" }, // ✅ DITAMBAHKAN
    { name: "Indoor Panel", path: "/admin/indoor" },
    { name: "Outdoor Panel", path: "/admin/outdoor" },
    { name: "Craft Panel", path: "/admin/craft" },
  ];

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.removeItem("isLoggedIn");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-[#2D1E12] font-sans flex">
      {/* SIDEBAR MASTER */}
      <aside className="w-64 bg-[#2D1E12] text-white flex flex-col fixed h-full z-50">
        <div className="p-6 text-2xl font-serif font-bold tracking-wider border-b border-gray-700">
          ADMIN PANEL.
        </div>
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuList.map((menu, index) => (
              <li key={index}>
                <NavLink
                  to={menu.path}
                  className={({ isActive }) =>
                    `block p-3 rounded cursor-pointer font-medium transition-colors ${
                      isActive
                        ? "bg-[#7A5C43] text-white"
                        : "text-gray-300 hover:bg-gray-800"
                    }`
                  }
                >
                  {menu.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full p-3 text-red-400 hover:bg-gray-800 rounded cursor-pointer font-medium transition-colors text-left"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* KONTEN DINAMIS */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto min-h-screen">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
