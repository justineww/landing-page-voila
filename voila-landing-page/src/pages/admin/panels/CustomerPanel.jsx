import React, { useState, useEffect } from "react";

import { API_URL } from "../../../constants/api";

const CustomerPanel = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/catalog-requests`);
      const data = await res.json();
      if (data.success) setRequests(data.data);
    } catch (error) {
      console.error("Gagal fetch catalog requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus data ini?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${API_URL}/api/catalog-requests/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setRequests((prev) => prev.filter((r) => r.id !== id));
      }
    } catch {
      alert("Gagal menghapus data.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filtered = requests.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="animate-fade-in space-y-8 pb-20">
      {/* PAGE TITLE */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-[#2D1E12] mb-2">
          Customer Panel
        </h1>
        <p className="text-gray-500">
          Data pelanggan yang telah mengisi formulir dan mengunduh katalog.
        </p>
      </div>

      {/* STATS CARD */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">
            Total Permintaan
          </p>
          <p className="text-3xl font-serif font-bold text-[#2D1E12]">
            {requests.length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">
            Terbaru
          </p>
          <p className="text-sm font-medium text-[#7A5C43] mt-1">
            {requests.length > 0 ? formatDate(requests[0].created_at) : "—"}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">
            Hasil Pencarian
          </p>
          <p className="text-3xl font-serif font-bold text-[#2D1E12]">
            {filtered.length}
          </p>
        </div>
      </div>

      {/* TABEL */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Tabel */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-[#2D1E12] flex items-center gap-2">
            <span>📩</span>
            <span>Daftar Permintaan Katalog</span>
          </h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                🔍
              </span>
              <input
                type="text"
                placeholder="Cari nama atau email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#7A5C43] w-56 transition-colors"
              />
            </div>
            <button
              onClick={fetchRequests}
              title="Refresh data"
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors"
            >
              ↺
            </button>
          </div>
        </div>

        {/* Isi Tabel */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <span className="text-sm">Memuat data...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-300">
            <span className="text-5xl mb-4">📭</span>
            <span className="text-sm">
              {search
                ? "Tidak ada hasil yang cocok."
                : "Belum ada permintaan katalog."}
            </span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#faf7f4] border-b border-gray-100">
                  {["#", "Nama", "Email", "Pesan", "Tanggal", "Aksi"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, idx) => (
                  <React.Fragment key={r.id}>
                    {/* Row utama — klik untuk expand pesan */}
                    <tr
                      className="border-b border-gray-50 hover:bg-[#faf7f4] transition-colors cursor-pointer"
                      onClick={() =>
                        setExpandedId(expandedId === r.id ? null : r.id)
                      }
                    >
                      <td className="px-6 py-4 text-gray-300 text-xs">
                        {idx + 1}
                      </td>
                      <td className="px-6 py-4 font-semibold text-[#2D1E12] whitespace-nowrap">
                        {r.name}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`mailto:${r.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#7A5C43] hover:underline"
                        >
                          {r.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-gray-500 max-w-xs">
                        <span
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {r.message}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-xs whitespace-nowrap">
                        {formatDate(r.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(r.id);
                          }}
                          disabled={deletingId === r.id}
                          className="px-3 py-1.5 text-xs font-medium rounded-md border border-red-200 text-red-500 bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                          {deletingId === r.id ? "Menghapus..." : "Hapus"}
                        </button>
                      </td>
                    </tr>

                    {/* Expanded Row — pesan lengkap */}
                    {expandedId === r.id && (
                      <tr className="bg-[#fdf9f5]">
                        <td />
                        <td colSpan={5} className="px-6 py-4">
                          <div className="border-l-2 border-[#C9B99A] pl-4">
                            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">
                              Pesan Lengkap
                            </p>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {r.message}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default CustomerPanel;
