import React, { useState, useEffect } from "react";

const ContactPanel = () => {
  // State untuk Data Teks Kontak
  const [texts, setTexts] = useState({
    contact_phone: "",
    contact_email: "",
    contact_ig: "",
    contact_web: "",
    contact_office: "",
    contact_factory: "",
  });

  // State untuk Gambar
  const [contactImage, setContactImage] = useState(null);

  // Fetch Data dari API
  const fetchData = async () => {
    try {
      // Ambil Teks Kontak
      const resTexts = await fetch("http://localhost:5000/api/home-contents");
      const dataTexts = await resTexts.json();
      if (dataTexts.success) {
        const textObj = {};
        dataTexts.data.forEach((item) => {
          if (item.content_type.startsWith("contact_")) {
            textObj[item.content_type] = item.text_value;
          }
        });
        setTexts((prev) => ({ ...prev, ...textObj }));
      }

      // Ambil Gambar Contact
      const resSlider = await fetch("http://localhost:5000/api/home-sliders");
      const dataSlider = await resSlider.json();
      if (dataSlider.success) {
        const img = dataSlider.data.find(
          (s) => s.slider_type === "contact_image",
        );
        setContactImage(img || null);
      }
    } catch (error) {
      console.error("Gagal fetch data Contact:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update Teks
  const handleUpdateText = async (e) => {
    e.preventDefault();
    try {
      // Update semua field teks secara bersamaan (looping)
      for (const key in texts) {
        const data = new FormData();
        data.append("content_type", key);
        data.append("text_value", texts[key]);
        await fetch("http://localhost:5000/api/home-contents/update", {
          method: "POST",
          body: data,
        });
      }
      alert("Informasi Kontak berhasil diperbarui!");
    } catch (error) {
      alert("Gagal memperbarui teks.");
    }
  };

  const handleTextChange = (e, type) => {
    setTexts({ ...texts, [type]: e.target.value });
  };

  // Upload Gambar Baru
  const handleUploadImage = async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("file_contact_image");
    if (fileInput.files.length === 0)
      return alert("Pilih gambar terlebih dahulu!");

    // Jika sudah ada gambar sebelumnya, hapus dulu agar tetap jadi 1 gambar "still"
    if (contactImage) {
      await fetch(`http://localhost:5000/api/home-sliders/${contactImage.id}`, {
        method: "DELETE",
      });
    }

    const data = new FormData();
    data.append("slider_type", "contact_image");
    data.append("images", fileInput.files[0]);

    const res = await fetch("http://localhost:5000/api/home-sliders", {
      method: "POST",
      body: data,
    });
    const result = await res.json();
    if (result.success) {
      alert("Gambar Contact Us diperbarui!");
      fileInput.value = "";
      fetchData();
    }
  };

  return (
    <div className="animate-fade-in space-y-10 pb-20">
      <div>
        <h1 className="text-3xl font-serif font-bold text-[#2D1E12] mb-2">
          Contact Us Management
        </h1>
        <p className="text-gray-500">
          Ubah informasi kontak, alamat, dan gambar utama halaman Contact.
        </p>
      </div>

      {/* 1. EDIT INFORMASI TEKS & ALAMAT */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 border-b pb-2">
          1. Informasi Kontak & Alamat
        </h2>
        <form onSubmit={handleUpdateText} className="space-y-6">
          {/* Grid Informasi Digital */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">
                Phone (WhatsApp)
              </label>
              <input
                type="text"
                value={texts.contact_phone || ""}
                onChange={(e) => handleTextChange(e, "contact_phone")}
                className="border p-2 rounded focus:border-[#7A5C43] outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Email</label>
              <input
                type="email"
                value={texts.contact_email || ""}
                onChange={(e) => handleTextChange(e, "contact_email")}
                className="border p-2 rounded focus:border-[#7A5C43] outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">
                Instagram
              </label>
              <input
                type="text"
                value={texts.contact_ig || ""}
                onChange={(e) => handleTextChange(e, "contact_ig")}
                className="border p-2 rounded focus:border-[#7A5C43] outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Website</label>
              <input
                type="text"
                value={texts.contact_web || ""}
                onChange={(e) => handleTextChange(e, "contact_web")}
                className="border p-2 rounded focus:border-[#7A5C43] outline-none"
              />
            </div>
          </div>

          {/* Grid Alamat */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">
                Office Address
              </label>
              <textarea
                rows="3"
                value={texts.contact_office || ""}
                onChange={(e) => handleTextChange(e, "contact_office")}
                className="border p-2 rounded focus:border-[#7A5C43] outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">
                Factory Address
              </label>
              <textarea
                rows="3"
                value={texts.contact_factory || ""}
                onChange={(e) => handleTextChange(e, "contact_factory")}
                className="border p-2 rounded focus:border-[#7A5C43] outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#7A5C43] text-white px-6 py-2 rounded hover:bg-[#2D1E12]"
          >
            Simpan Semua Teks
          </button>
        </form>
      </section>

      {/* 2. EDIT GAMBAR STATIS */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          2. Gambar Utama (Still Image)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <form
            onSubmit={handleUploadImage}
            className="flex flex-col gap-3 bg-gray-50 p-4 rounded border"
          >
            <label className="text-sm font-medium">
              Upload Gambar Baru (Otomatis menggantikan yang lama)
            </label>
            <input
              id="file_contact_image"
              type="file"
              accept="image/*"
              className="border bg-white rounded p-2 text-sm"
            />
            <button
              type="submit"
              className="bg-gray-800 text-white px-4 py-2 rounded self-start hover:bg-black"
            >
              Upload Gambar
            </button>
          </form>

          <div>
            <label className="text-sm font-medium block mb-2 text-gray-600">
              Preview Gambar Saat Ini:
            </label>
            {contactImage ? (
              <img
                src={`http://localhost:5000/uploads/${contactImage.image_url}`}
                alt="Contact"
                className="w-full max-h-64 object-cover rounded-lg border shadow-sm"
              />
            ) : (
              <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded border border-dashed">
                <span className="text-gray-400 text-sm">Belum ada gambar.</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPanel;
