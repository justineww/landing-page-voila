import React, { useState, useEffect, useRef } from "react";

import { API_URL } from "../../../constants/api";

const HomePanel = () => {
  // ==========================================
  // STATE & FUNGSI UNTUK HOME PANEL (TEKS)
  // ==========================================
  const [homeData, setHomeData] = useState({
    welcome_heading: "",
    welcome_paragraph: "",
  });

  const [homePreviews, setHomePreviews] = useState({
    hero_banner: "",
    side_image: "",
  });

  const fetchHomeContents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/home-contents`);
      const result = await response.json();
      if (result.success) {
        const texts = { welcome_heading: "", welcome_paragraph: "" };
        const images = { hero_banner: "", side_image: "" };

        result.data.forEach((item) => {
          if (item.text_value !== null) {
            texts[item.content_type] = item.text_value;
          }
          if (item.image_url !== null) {
            images[item.content_type] = item.image_url;
          }
        });

        setHomeData(texts);
        setHomePreviews(images);
      }
    } catch (error) {
      console.error("Gagal mengambil data home:", error);
    }
  };

  const handleUpdateHomeContent = async (e, contentType, type) => {
    e.preventDefault();
    const data = new FormData();
    data.append("content_type", contentType);

    if (type === "text") {
      data.append("text_value", homeData[contentType]);
    } else if (type === "image") {
      const fileInput = document.getElementById(`file_${contentType}`);
      if (!fileInput.files[0]) {
        alert("Silakan pilih gambar baru terlebih dahulu!");
        return;
      }
      data.append("image", fileInput.files[0]);
    }

    try {
      const response = await fetch(`${API_URL}/api/home-contents/update`, {
        method: "POST",
        body: data,
      });
      const result = await response.json();

      if (result.success) {
        alert(`Berhasil mengupdate ${contentType}!`);
        fetchHomeContents();
        if (type === "image") {
          document.getElementById(`file_${contentType}`).value = "";
        }
      } else {
        alert("Gagal: " + result.message);
      }
    } catch (error) {
      console.error("Error update home:", error);
      alert("Terjadi kesalahan pada server.");
    }
  };

  // ==========================================
  // STATE & FUNGSI UNTUK HOME SLIDERS
  // ==========================================
  const [sliders, setSliders] = useState([]);

  const fetchSliders = async () => {
    try {
      const response = await fetch(`${API_URL}/api/home-sliders`);
      const result = await response.json();
      if (result.success) setSliders(result.data);
    } catch (error) {
      console.error("Gagal mengambil slider:", error);
    }
  };

  const handleUploadSlider = async (e, sliderType) => {
    e.preventDefault();
    const fileInput = document.getElementById(`file_${sliderType}`);
    const files = fileInput.files;

    if (files.length === 0) return alert("Pilih minimal 1 gambar!");

    const data = new FormData();
    data.append("slider_type", sliderType);
    for (let i = 0; i < files.length; i++) {
      data.append("images", files[i]);
    }

    try {
      const response = await fetch(`${API_URL}/api/home-sliders`, {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      if (result.success) {
        alert(result.message);
        fileInput.value = "";
        fetchSliders();
      } else {
        alert("Gagal: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteSlider = async (id) => {
    if (!window.confirm("Yakin ingin menghapus gambar ini?")) return;
    try {
      const response = await fetch(`${API_URL}/api/home-sliders/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.success) fetchSliders();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // ==========================================
  // DRAG AND DROP SLIDER LOGIC
  // ==========================================
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleDragSort = async (sliderType) => {
    const currentTypeSliders = sliders.filter(
      (s) => s.slider_type === sliderType,
    );
    let _items = [...currentTypeSliders];
    const draggedItemContent = _items.splice(dragItem.current, 1)[0];
    _items.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;

    const otherSliders = sliders.filter((s) => s.slider_type !== sliderType);
    setSliders([...otherSliders, ..._items]);

    const reorderedData = _items.map((item, index) => ({
      id: item.id,
      sort_order: index,
    }));

    try {
      await fetch(`${API_URL}/api/home-sliders/reorder`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reorderedItems: reorderedData }),
      });
    } catch (error) {
      console.error("Gagal menyimpan urutan ke database", error);
    }
  };

  useEffect(() => {
    fetchHomeContents();
    fetchSliders();
  }, []);

  const heroBanners = sliders.filter((s) => s.slider_type === "hero_banner");
  const sideImages = sliders.filter((s) => s.slider_type === "side_image");

  return (
    <div className="animate-fade-in space-y-8">
      {/* HEADER PANEL */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-[#2D1E12] mb-2">
          Dashboard
        </h1>
        <p className="text-gray-500">
          Currently managing:{" "}
          <span className="font-medium text-[#7A5C43]">Home Panel</span>
        </p>
      </div>

      {/* SECTION 1: HERO BANNER */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          1. Hero Banner Images (Slider)
        </h2>
        <form
          onSubmit={(e) => handleUploadSlider(e, "hero_banner")}
          className="flex flex-col gap-4 mb-6 bg-gray-50 p-4 rounded border"
        >
          <label className="text-sm font-medium text-gray-600">
            Tambah Gambar Banner (Bisa pilih lebih dari 1 sekaligus)
          </label>
          <input
            id="file_hero_banner"
            type="file"
            accept="image/*"
            multiple
            className="border border-gray-300 rounded p-2 text-sm bg-white"
          />
          <button
            type="submit"
            className="bg-[#7A5C43] text-white px-4 py-2 rounded hover:bg-[#2D1E12] transition-colors self-start"
          >
            Upload ke Slider
          </button>
        </form>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {heroBanners.length > 0 ? (
            heroBanners.map((item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => (dragItem.current = index)}
                onDragEnter={(e) => (dragOverItem.current = index)}
                onDragEnd={() => handleDragSort("hero_banner")}
                onDragOver={(e) => e.preventDefault()}
                className="relative group cursor-move hover:scale-[1.02] transition-transform"
              >
                <img
                  src={`${API_URL}/uploads/${item.image_url}`}
                  alt="Banner"
                  className="w-full h-32 object-cover rounded border"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded">
                  <span className="text-white font-medium text-sm bg-[#7A5C43] px-2 py-1 rounded">
                    Drag to Move
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteSlider(item.id)}
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  Hapus
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400 col-span-full">
              Belum ada gambar banner.
            </p>
          )}
        </div>
      </div>

      {/* SECTION 2: WELCOME HEADING */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          2. Welcome Heading
        </h2>
        <form
          onSubmit={(e) =>
            handleUpdateHomeContent(e, "welcome_heading", "text")
          }
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            value={homeData.welcome_heading}
            onChange={(e) =>
              setHomeData({ ...homeData, welcome_heading: e.target.value })
            }
            className="border border-gray-300 rounded p-3 focus:border-[#7A5C43] outline-none"
            placeholder="Contoh: WELCOME TO VOILA LIVING"
            required
          />
          <button
            type="submit"
            className="bg-[#7A5C43] text-white px-4 py-2 rounded hover:bg-[#2D1E12] transition-colors w-fit"
          >
            Update Heading
          </button>
        </form>
      </div>

      {/* SECTION 3: WELCOME PARAGRAPH */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          3. Welcome Paragraph
        </h2>
        <form
          onSubmit={(e) =>
            handleUpdateHomeContent(e, "welcome_paragraph", "text")
          }
          className="flex flex-col gap-4"
        >
          <textarea
            rows="4"
            value={homeData.welcome_paragraph}
            onChange={(e) =>
              setHomeData({ ...homeData, welcome_paragraph: e.target.value })
            }
            className="border border-gray-300 rounded p-3 focus:border-[#7A5C43] outline-none"
            placeholder="Masukkan teks paragraf..."
            required
          ></textarea>
          <button
            type="submit"
            className="bg-[#7A5C43] text-white px-4 py-2 rounded hover:bg-[#2D1E12] transition-colors w-fit"
          >
            Update Paragraph
          </button>
        </form>
      </div>

      {/* SECTION 4: SIDE IMAGE */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          4. Side Images (Slider)
        </h2>
        <form
          onSubmit={(e) => handleUploadSlider(e, "side_image")}
          className="flex flex-col gap-4 mb-6 bg-gray-50 p-4 rounded border"
        >
          <label className="text-sm font-medium text-gray-600">
            Tambah Side Image (Bisa pilih lebih dari 1 sekaligus)
          </label>
          <input
            id="file_side_image"
            type="file"
            accept="image/*"
            multiple
            className="border border-gray-300 rounded p-2 text-sm bg-white"
          />
          <button
            type="submit"
            className="bg-[#7A5C43] text-white px-4 py-2 rounded hover:bg-[#2D1E12] transition-colors self-start"
          >
            Upload ke Slider
          </button>
        </form>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sideImages.length > 0 ? (
            sideImages.map((item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => (dragItem.current = index)}
                onDragEnter={(e) => (dragOverItem.current = index)}
                onDragEnd={() => handleDragSort("side_image")}
                onDragOver={(e) => e.preventDefault()}
                className="relative group cursor-move hover:scale-[1.02] transition-transform"
              >
                <img
                  src={`${API_URL}/uploads/${item.image_url}`}
                  alt="Side"
                  className="w-full h-32 object-contain bg-gray-50 rounded border"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded">
                  <span className="text-white font-medium text-sm bg-[#7A5C43] px-2 py-1 rounded">
                    Drag to Move
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteSlider(item.id)}
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  Hapus
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400 col-span-full">
              Belum ada side image.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePanel;
