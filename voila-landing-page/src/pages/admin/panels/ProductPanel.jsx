import React, { useState, useEffect } from "react";

import { API_URL } from "../../../constants/api";
const ProductPanel = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    product_code: "",
    title: "",
    category: category,
    sub_category: "",
    description: "",
    image: null,
  });

  // State untuk modal edit
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editImage, setEditImage] = useState(null);

  // State untuk modal konfirmasi delete
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [loading, setLoading] = useState(false);

  const subCategoryOptions = {
    Indoor: ["Kursi", "Meja", "Sofa", "Lemari"],
    Outdoor: ["Kursi Taman", "Meja Teras", "Ayunan"],
    Craft: ["Patung Kayu", "Hiasan Dinding", "Lampu Hias"],
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      const result = await response.json();
      if (result.success) {
        setProducts(result.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data produk:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      category: category,
      sub_category: "",
    }));
  }, [category]);

  // ─── UPLOAD (ADD) ───────────────────────────────────────────────────────────
  const handleUploadProduct = async (e) => {
    e.preventDefault();
    if (!formData.image) return alert("Pilih gambar terlebih dahulu!");

    const data = new FormData();
    data.append("product_code", formData.product_code);
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("sub_category", formData.sub_category);
    data.append("description", formData.description);
    data.append("image", formData.image);

    try {
      const response = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        body: data,
      });
      const result = await response.json();

      if (result.success) {
        alert("Berhasil! " + result.message);
        setFormData({
          product_code: "",
          title: "",
          category: category,
          sub_category: "",
          description: "",
          image: null,
        });
        document.getElementById("fileInput").value = "";
        fetchProducts();
      } else {
        alert("Gagal: " + result.message);
      }
    } catch (error) {
      console.error("Error upload:", error);
    }
  };

  // ─── EDIT ────────────────────────────────────────────────────────────────────
  const openEditModal = (item) => {
    setEditData({
      id: item.id,
      product_code: item.product_code,
      title: item.title,
      category: item.category,
      sub_category: item.sub_category,
      description: item.description,
      image_url: item.image_url,
    });
    setEditImage(null);
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
    setEditData(null);
    setEditImage(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("product_code", editData.product_code);
    data.append("title", editData.title);
    data.append("category", editData.category);
    data.append("sub_category", editData.sub_category);
    data.append("description", editData.description);
    if (editImage) {
      data.append("image", editImage);
    }

    try {
      const response = await fetch(`${API_URL}/api/products/${editData.id}`, {
        method: "PUT",
        body: data,
      });
      const result = await response.json();

      if (result.success) {
        alert("Produk berhasil diperbarui!");
        closeEditModal();
        fetchProducts();
      } else {
        alert("Gagal memperbarui: " + result.message);
      }
    } catch (error) {
      console.error("Error edit:", error);
      alert("Terjadi kesalahan saat memperbarui produk.");
    } finally {
      setLoading(false);
    }
  };

  // ─── DELETE ──────────────────────────────────────────────────────────────────
  const openDeleteModal = (item) => {
    setDeleteTarget(item);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDeleteTarget(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/products/${deleteTarget.id}`,
        { method: "DELETE" },
      );
      const result = await response.json();

      if (result.success) {
        alert("Produk berhasil dihapus!");
        closeDeleteModal();
        fetchProducts();
      } else {
        alert("Gagal menghapus: " + result.message);
      }
    } catch (error) {
      console.error("Error delete:", error);
      alert("Terjadi kesalahan saat menghapus produk.");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(
    (item) => item.category === category,
  );

  // ─── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <div className="animate-fade-in">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-[#2D1E12] mb-2">
          Dashboard
        </h1>
        <p className="text-gray-500">
          Currently managing:{" "}
          <span className="font-medium text-[#7A5C43]">{category} Panel</span>
        </p>
      </div>

      {/* FORM UPLOAD */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
        <h2 className="text-xl font-semibold mb-6 border-b pb-2">
          Add New to {category}
        </h2>
        <form
          onSubmit={handleUploadProduct}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Kode Barang
            </label>
            <input
              type="text"
              required
              value={formData.product_code}
              onChange={(e) =>
                setFormData({ ...formData, product_code: e.target.value })
              }
              className="border border-gray-300 rounded p-3 focus:outline-none focus:border-[#7A5C43]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Nama Barang
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="border border-gray-300 rounded p-3 focus:outline-none focus:border-[#7A5C43]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Kategori
            </label>
            <select
              disabled
              value={formData.category}
              className="border border-gray-300 rounded p-3 bg-gray-50 text-gray-500 cursor-not-allowed"
            >
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Craft">Craft</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Sub Kategori
            </label>
            <select
              required
              value={formData.sub_category}
              onChange={(e) =>
                setFormData({ ...formData, sub_category: e.target.value })
              }
              className="border border-gray-300 rounded p-3 focus:outline-none focus:border-[#7A5C43]"
            >
              <option value="">-- Pilih Sub Kategori --</option>
              {subCategoryOptions[formData.category]?.map((sub, index) => (
                <option key={index} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Deskripsi Barang
            </label>
            <textarea
              required
              rows="3"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="border border-gray-300 rounded p-3 focus:outline-none focus:border-[#7A5C43]"
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Upload Image
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              required
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
              className="border border-gray-300 rounded p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#F7F4EF] file:text-[#7A5C43] hover:file:bg-[#E5D9C5] cursor-pointer"
            />
          </div>
          <div className="md:col-span-2 mt-2">
            <button
              type="submit"
              className="bg-[#7A5C43] text-white px-6 py-3 rounded font-medium hover:bg-[#2D1E12] transition-colors w-full md:w-auto"
            >
              Upload Product to Database
            </button>
          </div>
        </form>
      </div>

      {/* TABEL DATA */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold">{category} Data</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                <th className="p-4 font-medium">ID</th>
                <th className="p-4 font-medium">Image Preview</th>
                <th className="p-4 font-medium">Product Details</th>
                <th className="p-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-4 text-sm text-gray-500">#{item.id}</td>
                    <td className="p-4">
                      <img
                        src={`${API_URL}/uploads/${item.image_url}`}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded border border-gray-200 shadow-sm"
                      />
                    </td>
                    <td className="p-4 font-medium">
                      {item.title}
                      <br />
                      <span className="text-xs text-gray-400 font-normal mt-1 block">
                        {item.product_code} • {item.sub_category}
                      </span>
                    </td>
                    <td className="p-4 text-center space-x-3">
                      <button
                        onClick={() => openEditModal(item)}
                        className="text-[#7A5C43] hover:text-[#2D1E12] font-medium text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(item)}
                        className="text-red-500 hover:text-red-700 font-medium text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-400">
                    Belum ada produk di kategori {category}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          MODAL EDIT
      ═══════════════════════════════════════════════ */}
      {editModal && editData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-[#2D1E12]">
                Edit Produk
              </h2>
              <button
                onClick={closeEditModal}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <form
              onSubmit={handleEditSubmit}
              className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Kode Barang
                </label>
                <input
                  type="text"
                  required
                  value={editData.product_code}
                  onChange={(e) =>
                    setEditData({ ...editData, product_code: e.target.value })
                  }
                  className="border border-gray-300 rounded p-3 focus:outline-none focus:border-[#7A5C43]"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Nama Barang
                </label>
                <input
                  type="text"
                  required
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  className="border border-gray-300 rounded p-3 focus:outline-none focus:border-[#7A5C43]"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Kategori
                </label>
                <select
                  disabled
                  value={editData.category}
                  className="border border-gray-300 rounded p-3 bg-gray-50 text-gray-500 cursor-not-allowed"
                >
                  <option value="Indoor">Indoor</option>
                  <option value="Outdoor">Outdoor</option>
                  <option value="Craft">Craft</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Sub Kategori
                </label>
                <select
                  required
                  value={editData.sub_category}
                  onChange={(e) =>
                    setEditData({ ...editData, sub_category: e.target.value })
                  }
                  className="border border-gray-300 rounded p-3 focus:outline-none focus:border-[#7A5C43]"
                >
                  <option value="">-- Pilih Sub Kategori --</option>
                  {subCategoryOptions[editData.category]?.map((sub, index) => (
                    <option key={index} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Deskripsi Barang
                </label>
                <textarea
                  required
                  rows="3"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  className="border border-gray-300 rounded p-3 focus:outline-none focus:border-[#7A5C43]"
                />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Ganti Gambar{" "}
                  <span className="text-gray-400 font-normal">
                    (kosongkan jika tidak ingin mengganti)
                  </span>
                </label>
                {/* Preview gambar saat ini */}
                <div className="mb-3">
                  <img
                    src={
                      editImage
                        ? URL.createObjectURL(editImage)
                        : `${API_URL}/uploads/${editData.image_url}`
                    }
                    alt="preview"
                    className="w-24 h-24 object-cover rounded border border-gray-200 shadow-sm"
                  />
                  <p className="text-xs text-gray-400 mt-1">Gambar saat ini</p>
                </div>
                <input
                  id="editFileInput"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditImage(e.target.files[0])}
                  className="border border-gray-300 rounded p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#F7F4EF] file:text-[#7A5C43] hover:file:bg-[#E5D9C5] cursor-pointer"
                />
              </div>

              {/* Modal Footer */}
              <div className="md:col-span-2 flex justify-end gap-3 pt-2 border-t border-gray-100 mt-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-5 py-2.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded bg-[#7A5C43] text-white font-medium text-sm hover:bg-[#2D1E12] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          MODAL KONFIRMASI DELETE
      ═══════════════════════════════════════════════ */}
      {deleteModal && deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <div className="flex items-start gap-4 mb-6">
              {/* Icon peringatan */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#2D1E12] mb-1">
                  Hapus Produk?
                </h3>
                <p className="text-sm text-gray-500">
                  Kamu akan menghapus{" "}
                  <span className="font-medium text-gray-700">
                    {deleteTarget.title}
                  </span>{" "}
                  ({deleteTarget.product_code}). Tindakan ini tidak dapat
                  dibatalkan.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeDeleteModal}
                className="px-5 py-2.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={loading}
                className="px-5 py-2.5 rounded bg-red-500 text-white font-medium text-sm hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPanel;
