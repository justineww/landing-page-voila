import React from "react";

const GeneralPanel = ({ activeMenu }) => {
  return (
    <div className="animate-fade-in">
      {/* HEADER PANEL */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-[#2D1E12] mb-2">
          Dashboard
        </h1>
        <p className="text-gray-500">
          Currently managing:{" "}
          <span className="font-medium text-[#7A5C43]">{activeMenu}</span>
        </p>
      </div>

      {/* KONTEN UTAMA GENERAL PANEL */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[400px] text-center">
        <h2 className="text-2xl font-serif text-[#2D1E12] mb-4">
          Manage {activeMenu}
        </h2>
        <p className="text-gray-500 max-w-md">
          Formulir untuk mengubah teks dan gambar halaman <b>{activeMenu}</b>{" "}
          akan disiapkan di area ini.
        </p>
      </div>
    </div>
  );
};

export default GeneralPanel;
