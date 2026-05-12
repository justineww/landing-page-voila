import React, { useState, useEffect, useRef } from "react";
const API_BASE = process.env.REACT_APP_API_URL;

const AboutPanel = () => {
  const [aboutText, setAboutText] = useState("");
  const [sliders, setSliders] = useState([]);

  const fetchData = async () => {
    try {
      const resText = await fetch(`${API_BASE}/api/home-contents`);
      const dataText = await resText.json();
      if (dataText.success) {
        // Gunakan content_type "about_us" sesuai database
        const item = dataText.data.find((i) => i.content_type === "about_us");
        if (item) setAboutText(item.text_value || "");
      }

      const resSlider = await fetch(`${API_BASE}/api/home-sliders`);
      const dataSlider = await resSlider.json();
      if (dataSlider.success) setSliders(dataSlider.data);
    } catch (error) {
      console.error("Gagal ambil data About Us:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateText = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("content_type", "about_us"); // sesuai database
    data.append("text_value", aboutText);

    const res = await fetch(`${API_BASE}/api/home-contents/update`, {
      method: "POST",
      body: data,
    });
    const result = await res.json();
    if (result.success) alert("Teks About Us diperbarui!");
    else alert("Gagal update: " + result.message);
  };

  const handleUploadSlider = async (e, type) => {
    e.preventDefault();
    const fileInput = document.getElementById(`file_${type}`);
    if (fileInput.files.length === 0) return alert("Pilih gambar!");

    const data = new FormData();
    data.append("slider_type", type);
    for (let i = 0; i < fileInput.files.length; i++) {
      data.append("images", fileInput.files[i]);
    }

    const res = await fetch(`${API_BASE}/api/home-sliders`, {
      method: "POST",
      body: data,
    });
    const result = await res.json();
    if (result.success) {
      alert(result.message);
      fileInput.value = "";
      fetchData();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus gambar ini?")) return;
    const res = await fetch(`${API_BASE}/api/home-sliders/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (result.success) fetchData();
  };

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleDragSort = async (type) => {
    const currentTypeSliders = sliders.filter((s) => s.slider_type === type);
    let _items = [...currentTypeSliders];
    const draggedItemContent = _items.splice(dragItem.current, 1)[0];
    _items.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;

    const reorderedData = _items.map((item, index) => ({
      id: item.id,
      sort_order: index,
    }));

    await fetch(`${API_BASE}/api/home-sliders/reorder`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reorderedItems: reorderedData }),
    });
    fetchData();
  };

  const galleryImages = sliders.filter(
    (s) => s.slider_type === "about_gallery",
  );
  const sideImages = sliders.filter(
    (s) => s.slider_type === "about_side_image",
  );

  return (
    <div className="animate-fade-in space-y-10 pb-20">
      <div>
        <h1 className="text-3xl font-serif font-bold text-[#2D1E12] mb-2">
          About Us Management
        </h1>
        <p className="text-gray-500">
          Sesuaikan konten narasi dan gallery foto halaman About Us.
        </p>
      </div>

      {/* 1. EDIT TEKS */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          1. About Us Narative (Teks)
        </h2>
        <form onSubmit={handleUpdateText} className="space-y-4">
          <textarea
            rows="6"
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            className="w-full border border-gray-300 rounded p-3 focus:border-[#7A5C43] outline-none"
            placeholder="Tuliskan cerita tentang Voila Living di sini..."
            required
          />
          <button
            type="submit"
            className="bg-[#7A5C43] text-white px-6 py-2 rounded hover:bg-[#2D1E12] transition-colors"
          >
            Update Paragraf
          </button>
        </form>
      </section>

      {/* 2. GALLERY BAWAH */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          2. Bottom Gallery (Marquee Running)
        </h2>
        <form
          onSubmit={(e) => handleUploadSlider(e, "about_gallery")}
          className="flex flex-col gap-3 mb-6 bg-gray-50 p-4 rounded border"
        >
          <label className="text-sm font-medium">
            Upload Foto Aktivitas / Workshop
          </label>
          <input
            id="file_about_gallery"
            type="file"
            multiple
            accept="image/*"
            className="border bg-white rounded p-2 text-sm"
          />
          <button
            type="submit"
            className="bg-[#7A5C43] text-white px-4 py-2 rounded self-start hover:bg-[#2D1E12]"
          >
            Upload ke Gallery
          </button>
        </form>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {galleryImages.map((img, idx) => (
            <div
              key={img.id}
              draggable
              onDragStart={() => (dragItem.current = idx)}
              onDragEnter={() => (dragOverItem.current = idx)}
              onDragEnd={() => handleDragSort("about_gallery")}
              onDragOver={(e) => e.preventDefault()}
              className="relative group cursor-move"
            >
              <img
                src={`${API_BASE}/uploads/${img.image_url}`}
                className="w-full h-28 object-cover rounded border"
                alt="Gallery"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded">
                <span className="text-[10px] text-white bg-[#7A5C43] px-2 py-1 rounded">
                  Geser
                </span>
              </div>
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs shadow-lg"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SIDE IMAGE SLIDER */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          3. Main Side Image (Fade Slider Kanan)
        </h2>
        <form
          onSubmit={(e) => handleUploadSlider(e, "about_side_image")}
          className="flex flex-col gap-3 mb-6 bg-gray-50 p-4 rounded border"
        >
          <label className="text-sm font-medium">
            Upload Gambar Utama yang Akan Berganti Otomatis (Fade)
          </label>
          <input
            id="file_about_side_image"
            type="file"
            multiple
            accept="image/*"
            className="border bg-white rounded p-2 text-sm"
          />
          <button
            type="submit"
            className="bg-[#7A5C43] text-white px-4 py-2 rounded self-start hover:bg-[#2D1E12]"
          >
            Upload ke Slider
          </button>
        </form>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sideImages.map((img, idx) => (
            <div
              key={img.id}
              draggable
              onDragStart={() => (dragItem.current = idx)}
              onDragEnter={() => (dragOverItem.current = idx)}
              onDragEnd={() => handleDragSort("about_side_image")}
              onDragOver={(e) => e.preventDefault()}
              className="relative group cursor-move"
            >
              <img
                src={`${API_BASE}/uploads/${img.image_url}`}
                className="w-full h-40 object-cover rounded border"
                alt="Side"
              />
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPanel;
