import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_BASE = "https://hospitable-emotion-production-34cc.up.railway.app";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Simpan status login ke localStorage agar ProtectedRoute bisa mendeteksi
        localStorage.setItem("isLoggedIn", "true");
        // Pindahkan user ke halaman Admin Dashboard
        navigate("/admin");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log("API_BASE:", API_BASE);
      setError("Gagal menyambung ke server. Pastikan backend menyala.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EF] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-serif font-bold text-[#2D1E12] mb-2 text-center">
          Admin Login
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Silakan masuk untuk mengelola Voila Living
        </p>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded mb-6 text-sm text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border border-gray-300 rounded p-3 focus:outline-none focus:border-[#7A5C43] transition-colors"
              placeholder="Masukkan username"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded p-3 focus:outline-none focus:border-[#7A5C43] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#7A5C43] text-white p-3 rounded font-medium hover:bg-[#2D1E12] transition-colors mt-4"
          >
            Masuk ke Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
