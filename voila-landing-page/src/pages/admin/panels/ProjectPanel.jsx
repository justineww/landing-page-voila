import React, { useState, useEffect } from "react";

import { API_URL } from "../../constants/api";

const ProjectPanel = () => {
  // State untuk Teks & Statistik
  const [texts, setTexts] = useState({
    project_paragraph: "",
    project_stat_country: "",
    project_stat_type: "",
    project_stat_total: "",
  });

  // State untuk Data Project Gallery
  const [projects, setProjects] = useState([]);

  // State untuk Form Input Project Baru
  const [newProject, setNewProject] = useState({ title: "", description: "" });
  const [selectedFile, setSelectedFile] = useState(null);

  // Ambil Data dari API
  const fetchData = async () => {
    try {
      // Fetch Teks & Statistik
      const resTexts = await fetch(`${API_BASE}/api/home-contents`);
      const dataTexts = await resTexts.json();
      if (dataTexts.success) {
        const textObj = {};
        dataTexts.data.forEach((item) => {
          if (item.content_type.startsWith("project_")) {
            textObj[item.content_type] = item.text_value;
          }
        });
        setTexts((prev) => ({ ...prev, ...textObj }));
      }

      // Fetch Projects Gallery
      const resProj = await fetch(`${API_BASE}/api/projects`);
      const dataProj = await resProj.json();
      if (dataProj.success) setProjects(dataProj.data);
    } catch (error) {
      console.error("Gagal fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update Teks / Statistik
  const handleUpdateText = async (e, type) => {
    e.preventDefault();
    const data = new FormData();
    data.append("content_type", type);
    data.append("text_value", texts[type]);

    const res = await fetch(`${API_BASE}/api/home-contents/update`, {
      method: "POST",
      body: data,
    });
    const result = await res.json();
    if (result.success) alert("Data berhasil diperbarui!");
  };

  // Handle Input Change Teks
  const handleTextChange = (e, type) => {
    setTexts({ ...texts, [type]: e.target.value });
  };

  // Upload Project Baru
  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert("Pilih gambar terlebih dahulu!");

    const data = new FormData();
    data.append("image", selectedFile);
    data.append("title", newProject.title);
    data.append("description", newProject.description);

    const res = await fetch(`${API_BASE}/api/projects`, {
      method: "POST",
      body: data,
    });
    const result = await res.json();
    if (result.success) {
      alert("Project ditambahkan!");
      setNewProject({ title: "", description: "" });
      setSelectedFile(null);
      document.getElementById("project_image").value = "";
      fetchData();
    }
  };

  // Hapus Project
  const handleDeleteProject = async (id) => {
    if (!window.confirm("Hapus project ini?")) return;
    const res = await fetch(`${API_BASE}/api/projects/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (result.success) fetchData();
  };

  return (
    <div className="animate-fade-in space-y-10 pb-20">
      <div>
        <h1 className="text-3xl font-serif font-bold text-[#2D1E12] mb-2">
          Our Project Management
        </h1>
        <p className="text-gray-500">
          Sesuaikan paragraf, statistik angka, dan gallery project Voila.
        </p>
      </div>

      {/* 1. EDIT PARAGRAF */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          1. Narasi Our Project
        </h2>
        <form
          onSubmit={(e) => handleUpdateText(e, "project_paragraph")}
          className="flex flex-col gap-3"
        >
          <textarea
            rows="4"
            value={texts.project_paragraph || ""}
            onChange={(e) => handleTextChange(e, "project_paragraph")}
            className="w-full border border-gray-300 rounded p-3 focus:border-[#7A5C43] outline-none"
            placeholder="Tuliskan deskripsi Our Project..."
          />
          <button
            type="submit"
            className="bg-[#7A5C43] text-white px-6 py-2 rounded self-start hover:bg-[#2D1E12]"
          >
            Update Paragraf
          </button>
        </form>
      </section>

      {/* 2. EDIT ANGKA STATISTIK */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          2. Statistik Angka (Country, Type, Project)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Country */}
          <form
            onSubmit={(e) => handleUpdateText(e, "project_stat_country")}
            className="flex flex-col gap-2"
          >
            <label className="text-sm font-bold text-gray-700">COUNTRY</label>
            <input
              type="number"
              value={texts.project_stat_country || ""}
              onChange={(e) => handleTextChange(e, "project_stat_country")}
              className="border p-2 rounded text-3xl font-bold text-[#7A5C43]"
            />
            <button
              type="submit"
              className="bg-gray-800 text-white px-4 py-2 rounded text-sm mt-2"
            >
              Update
            </button>
          </form>

          {/* Type Mode */}
          <form
            onSubmit={(e) => handleUpdateText(e, "project_stat_type")}
            className="flex flex-col gap-2"
          >
            <label className="text-sm font-bold text-gray-700">TYPE MODE</label>
            <input
              type="number"
              value={texts.project_stat_type || ""}
              onChange={(e) => handleTextChange(e, "project_stat_type")}
              className="border p-2 rounded text-3xl font-bold text-[#7A5C43]"
            />
            <button
              type="submit"
              className="bg-gray-800 text-white px-4 py-2 rounded text-sm mt-2"
            >
              Update
            </button>
          </form>

          {/* Total Project */}
          <form
            onSubmit={(e) => handleUpdateText(e, "project_stat_total")}
            className="flex flex-col gap-2"
          >
            <label className="text-sm font-bold text-gray-700">PROJECT</label>
            <input
              type="number"
              value={texts.project_stat_total || ""}
              onChange={(e) => handleTextChange(e, "project_stat_total")}
              className="border p-2 rounded text-3xl font-bold text-[#7A5C43]"
            />
            <button
              type="submit"
              className="bg-gray-800 text-white px-4 py-2 rounded text-sm mt-2"
            >
              Update
            </button>
          </form>
        </div>
      </section>

      {/* 3. GALLERY PROJECT DENGAN INFORMASI */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          3. Gallery & Informasi Project
        </h2>

        {/* Form Tambah Project */}
        <form
          onSubmit={handleAddProject}
          className="bg-gray-50 p-4 rounded border mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-sm font-medium">Judul Project</label>
              <input
                type="text"
                required
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
                className="w-full border p-2 rounded mt-1"
                placeholder="Misal: Villa Bali Interior"
              />
            </div>
            <div>
              <label className="text-sm font-medium">
                Deskripsi / Informasi Project
              </label>
              <textarea
                required
                rows="3"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
                className="w-full border p-2 rounded mt-1"
                placeholder="Informasi yang muncul saat pop-up..."
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 justify-center">
            <label className="text-sm font-medium">Foto Project</label>
            <input
              id="project_image"
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="border bg-white rounded p-2 text-sm"
            />
            <button
              type="submit"
              className="bg-[#7A5C43] text-white px-4 py-3 rounded mt-2 hover:bg-[#2D1E12]"
            >
              Upload & Simpan Project
            </button>
          </div>
        </form>

        {/* Daftar Project yang Sudah Diupload */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="border rounded-lg overflow-hidden relative shadow-sm group"
            >
              <img
                src={`${API_BASE}/uploads/${proj.image_url}`}
                className="w-full h-48 object-cover"
                alt={proj.title}
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{proj.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {proj.description}
                </p>
              </div>
              <button
                onClick={() => handleDeleteProject(proj.id)}
                className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectPanel;
