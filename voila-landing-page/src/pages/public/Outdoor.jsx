import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";

const IMAGE_BASE_URL = "http://localhost:5000/uploads/";

const Outdoor = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const sectionRefs = useRef({});

  // Fetch produk dari backend, filter category Outdoor
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        if (data.success) {
          const outdoorProducts = data.data.filter(
            (p) => p.category?.toLowerCase() === "outdoor",
          );
          setProducts(outdoorProducts);
        }
      } catch (err) {
        console.error("Gagal mengambil produk:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Kelompokkan produk berdasarkan sub_category
  const grouped = products.reduce((acc, product) => {
    const key = product.sub_category || "Lainnya";
    if (!acc[key]) acc[key] = [];
    acc[key].push(product);
    return acc;
  }, {});

  const subCategories = Object.keys(grouped);

  // Tutup lightbox dengan Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setSelectedProduct(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, paddingTop: "60px", overflowY: "auto" }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "60vh",
            }}
          >
            <p style={{ color: "#BDBDBD", fontFamily: "'Georgia', serif" }}>
              Memuat produk...
            </p>
          </div>
        ) : subCategories.length === 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "60vh",
            }}
          >
            <p style={{ color: "#BDBDBD", fontFamily: "'Georgia', serif" }}>
              Belum ada produk Outdoor.
            </p>
          </div>
        ) : (
          subCategories.map((subCat) => (
            <section
              key={subCat}
              ref={(el) => (sectionRefs.current[subCat] = el)}
              style={{ padding: "64px 0 56px" }}
            >
              {/* ── Centered header per sub-category ── */}
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "52px",
                  padding: "0 40px",
                }}
              >
                <h2 style={{ margin: "0 0 22px", lineHeight: 1.1 }}>
                  <span
                    style={{
                      fontFamily: "'Georgia', serif",
                      fontSize: "clamp(2.6rem, 5vw, 4rem)",
                      fontWeight: "700",
                      color: "#2E2720",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Outdoor{" "}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Georgia', serif",
                      fontSize: "clamp(2.6rem, 5vw, 4rem)",
                      fontWeight: "400",
                      fontStyle: "italic",
                      color: "#A89880",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {subCat}
                  </span>
                </h2>
              </div>

              {/* ── Product grid: 5 per row, wraps to next line ── */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: "12px",
                  padding: "0 40px",
                }}
              >
                {grouped[subCat].map((product) => (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    style={{
                      cursor: "pointer",
                      borderRadius: "20px",
                      overflow: "hidden",
                      backgroundColor: "#F0EBE3",
                      aspectRatio: "1 / 1",
                    }}
                  >
                    <img
                      src={`${IMAGE_BASE_URL}${product.image_url}`}
                      alt={product.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                        display: "block",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>

      {/* ============ LIGHTBOX FULLSCREEN ============ */}
      {selectedProduct && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.85)",
          }}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              background: "white",
              overflow: "hidden",
              boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
              maxWidth: "900px",
              width: "90vw",
              maxHeight: "85vh",
              borderRadius: "12px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gambar kiri */}
            <div style={{ width: "50%", flexShrink: 0, background: "#f3f3f3" }}>
              <img
                src={`${IMAGE_BASE_URL}${selectedProduct.image_url}`}
                alt={selectedProduct.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Info kanan */}
            <div
              style={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "40px",
              }}
            >
              {/* Kode produk */}
              <p
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C9B99A",
                  marginBottom: "8px",
                  fontFamily: "'Georgia', serif",
                }}
              >
                {selectedProduct.product_code}
              </p>

              {/* Nama produk */}
              <h2
                style={{
                  color: "#444444",
                  fontFamily: "'Georgia', serif",
                  fontSize: "1.8rem",
                  fontWeight: "700",
                  marginBottom: "4px",
                }}
              >
                {selectedProduct.title}
              </h2>

              {/* Kategori & Sub-kategori */}
              <p
                style={{
                  fontSize: "0.82rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#AAAAAA",
                  marginBottom: "24px",
                  fontFamily: "'Georgia', serif",
                }}
              >
                {selectedProduct.category} — {selectedProduct.sub_category}
              </p>

              {/* Garis pemisah */}
              <div
                style={{
                  height: "1px",
                  backgroundColor: "#E5E0D8",
                  marginBottom: "24px",
                }}
              />

              {/* Deskripsi */}
              <p
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.75,
                  color: "#777777",
                  fontFamily: "'Georgia', serif",
                }}
              >
                {selectedProduct.description || "Tidak ada deskripsi produk."}
              </p>

              {/* Tombol tutup */}
              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  marginTop: "32px",
                  padding: "8px 24px",
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  border: "1px solid #C9B99A",
                  color: "#C9B99A",
                  borderRadius: "4px",
                  alignSelf: "flex-start",
                  background: "transparent",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "'Georgia', serif",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#C9B99A";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#C9B99A";
                }}
              >
                Tutup
              </button>
            </div>

            {/* Tombol X */}
            <button
              onClick={() => setSelectedProduct(null)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                fontSize: "1.5rem",
                color: "#AAAAAA",
                background: "none",
                border: "none",
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Outdoor;
