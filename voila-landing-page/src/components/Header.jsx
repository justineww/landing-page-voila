import React, { useState, useEffect } from "react";
// 1. IMPORT Link dan useLocation dari react-router-dom
import { Link, useLocation } from "react-router-dom";
import VoilaHorizontal from "../storage/LogoVoilaHorizontal.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  // 2. DAPATKAN LOKASI HALAMAN SAAT INI
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 3. FUNGSI UNTUK MENENTUKAN KELAS CSS HEADER SECARA DINAMIS
  const getHeaderClass = () => {
    // Tentukan apakah kita berada di halaman Koleksi (Indoor/Outdoor/Craft)
    const isCollectionPage =
      location.pathname.startsWith("/indoor") ||
      location.pathname.startsWith("/outdoor") ||
      location.pathname.startsWith("/craft");

    // JIKA DI HALAMAN KOLEKSI:
    // Abaikan scroll, langsung berikan background cokelat solid & py-4 (lebih ramping)
    if (isCollectionPage) {
      return "shadow-md";
    }

    // JIKA DI HALAMAN LAIN (MISAL HOME):
    // Gunakan logika scroll yang sudah ada
    return isScrolled
      ? "backdrop-blur-md shadow-md" // Saat scroll
      : "bg-transparent"; // Saat di atas: Transparan
  };

  // Tentukan apakah nav-bar pill harus selalu tampil solid
  const isCollectionPage =
    location.pathname.startsWith("/indoor") ||
    location.pathname.startsWith("/outdoor") ||
    location.pathname.startsWith("/craft");

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Indoor", to: "/indoor" },
    { label: "Outdor", to: "/outdoor" },
    { label: "Craft", to: "/craft" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${getHeaderClass()}`}
    >
      <div className="max-w-[90rem] mx-auto px-6 md:px-10 flex items-center justify-between py-3">
        {/* LOGO */}
        <Link to="/" className="flex-shrink-0">
          <img
            src={VoilaHorizontal}
            alt="Indonesian Legal Wood"
            className="w-48 h-auto"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          {/* Fallback logo */}
          <div
            className="w-14 h-14 bg-green-800 rounded-full items-center justify-center text-white text-[8px] font-bold text-center leading-tight shadow"
            style={{ display: "none" }}
          >
            Indonesian
            <br />
            LEGAL
            <br />
            Wood
          </div>
        </Link>

        {/* NAVIGASI — pill dengan background tan/beige */}
        <nav className="hidden md:flex items-center rounded-sm overflow-hidden shadow-md">
          {navItems.map((item, index) => {
            const isActive =
              item.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.to);

            return (
              <React.Fragment key={item.to}>
                <Link
                  to={item.to}
                  className="relative px-7 py-3 text-white text-sm font-medium tracking-widest uppercase transition-colors duration-300 hover:bg-white/20"
                  style={{
                    backgroundColor: isActive
                      ? "rgba(255,255,255,0.18)"
                      : "#C9B99A",
                    letterSpacing: "0.12em",
                  }}
                >
                  {item.label}
                </Link>
                {/* Separator vertikal antar item */}
                {index < navItems.length - 1 && (
                  <div
                    className="w-px self-stretch"
                    style={{ backgroundColor: "rgba(255,255,255,0.35)" }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
