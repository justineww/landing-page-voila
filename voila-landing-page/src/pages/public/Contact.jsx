import { useState } from "react";
import { FONT } from "../../constants/home";

const catalogPdfUrl = "/catalogue/outdoor-catalogue-2026.pdf";

// FONT = "'Poppins', sans-serif" — dari constants/home, sama seperti WelcomeSection
// Heading WelcomeSection tidak set fontFamily (bug: nilai clamp masuk ke fontFamily),
// sehingga jatuh ke inherit. Kita ikuti hal yang sama — heading tidak di-override.

// WelcomeSection color palette
const COLORS = {
  headingGray: "#7C7669", // same as WelcomeSection h2
  bodyGray: "#8A847D", // same as WelcomeSection paragraph
  sand: "#EDE8E2", // same as WelcomeSection slide bg
  stone: "#C4B8AA", // slightly lighter accent
  bark: "#B4AA9E", // muted label color
  deep: "#4A453F", // dark text
  cream: "#FAF8F4", // warm white bg
  white: "#FFFFFF",
  error: "#b85c38",
  mutedText: "#8A847D",
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Nama wajib diisi";
    if (!form.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Format email tidak valid";
    }
    if (!form.message.trim()) newErrors.message = "Pesan wajib diisi";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("http://localhost:5000/api/catalog-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        const link = document.createElement("a");
        link.href = catalogPdfUrl;
        link.download = "Voila-Outdoor-Catalogue-2026.pdf";
        link.click();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleReset = () => {
    setForm({ name: "", email: "", message: "" });
    setErrors({});
    setStatus("idle");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

        .contact-page {
          min-height: 100vh;
          background-color: ${COLORS.white};
          font-family: ${FONT};
          position: relative;
          overflow: hidden;
        }

        .contact-wrapper {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 380px 1fr;
          min-height: 100vh;
        }

        /* ── LEFT PANEL — warm stone, matching WelcomeSection heading color ── */
        .contact-left {
          background-color: ${COLORS.headingGray};
          padding: 64px 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
        }

        .contact-left::before {
          content: '';
          position: absolute;
          top: -100px; right: -100px;
          width: 350px; height: 350px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(237,232,226,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .contact-left::after {
          content: '';
          position: absolute;
          bottom: -80px; left: -80px;
          width: 280px; height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(196,184,170,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .brand-mark {
          position: relative;
          z-index: 1;
        }

        .brand-leaf {
          width: 36px;
          height: 36px;
          margin-bottom: 12px;
          opacity: 0.85;
        }

        .brand-name {
          font-family: ${FONT};
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.3em;
          color: ${COLORS.sand};
          text-transform: uppercase;
        }

        .left-headline {
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* Heading: Poppins 300 — sama seperti WelcomeSection h2 yang inherit Poppins */
        .left-headline h1 {
          font-family: ${FONT};
          font-size: clamp(2.6rem, 4vw, 3.6rem);
          font-weight: 300;
          line-height: 1.1;
          letter-spacing: 0.06em;
          color: ${COLORS.cream};
          margin: 0 0 24px;
        }

        .left-headline h1 em {
          font-style: italic;
          color: ${COLORS.sand};
        }

        .left-divider {
          width: 40px;
          height: 1px;
          background: ${COLORS.stone};
          margin-bottom: 24px;
          opacity: 0.6;
        }

        /* Body copy: mirrors WelcomeSection paragraph style */
        .left-description {
          font-family: ${FONT};
          font-size: 0.875rem;
          font-weight: 300;
          line-height: 1.75;
          color: ${COLORS.sand};
          max-width: 260px;
        }

        .catalogue-preview {
          position: relative;
          z-index: 1;
          border: 1px solid rgba(237,232,226,0.25);
          border-radius: 4px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(255,255,255,0.06);
        }

        .catalogue-icon {
          width: 48px;
          height: 60px;
          background: ${COLORS.sand};
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }

        .catalogue-icon::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 12px; height: 12px;
          background: ${COLORS.headingGray};
          clip-path: polygon(100% 0, 0 0, 100% 100%);
        }

        .catalogue-icon svg {
          color: ${COLORS.headingGray};
          opacity: 0.85;
        }

        .catalogue-info p {
          margin: 0;
          font-family: ${FONT};
          color: ${COLORS.stone};
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .catalogue-info strong {
          display: block;
          color: ${COLORS.cream};
          font-family: ${FONT};
          font-size: 1rem;
          font-weight: 400;
          margin-top: 3px;
        }

        /* ── RIGHT PANEL ── */
        .contact-right {
          padding: 80px 72px;
          display: flex;
          align-items: center;
          background: ${COLORS.white};
        }

        .form-container {
          width: 100%;
          max-width: 560px;
        }

        /* Eyebrow: same muted body color as WelcomeSection paragraph */
        .form-eyebrow {
          font-family: ${FONT};
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: ${COLORS.bodyGray};
          font-weight: 500;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .form-eyebrow::before {
          content: '';
          width: 24px;
          height: 1px;
          background: ${COLORS.bark};
        }

        /* Form title: Poppins 300, matching WelcomeSection h2 */
        .form-title {
          font-family: ${FONT};
          font-size: clamp(2rem, 3vw, 3rem);
          font-weight: 300;
          letter-spacing: 0.04em;
          color: ${COLORS.headingGray};
          line-height: 1.1;
          margin: 0 0 8px;
        }

        .form-subtitle {
          font-family: ${FONT};
          font-size: 0.875rem;
          color: ${COLORS.mutedText};
          margin: 0 0 52px;
          font-weight: 300;
          line-height: 1.75;
        }

        /* ── FIELD STYLES ── */
        .field-group {
          margin-bottom: 32px;
        }

        .field-label {
          display: block;
          font-family: ${FONT};
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${COLORS.bark};
          margin-bottom: 10px;
          font-weight: 500;
        }

        .field-label span {
          color: ${COLORS.bodyGray};
          margin-left: 2px;
        }

        .field-input,
        .field-textarea {
          width: 100%;
          border: none;
          border-bottom: 1.5px solid ${COLORS.sand};
          background: transparent;
          padding: 10px 0 14px;
          font-family: ${FONT};
          font-size: 1rem;
          font-weight: 300;
          color: ${COLORS.deep};
          outline: none;
          transition: border-color 0.3s ease;
          box-sizing: border-box;
        }

        .field-input::placeholder,
        .field-textarea::placeholder {
          color: ${COLORS.stone};
          font-weight: 300;
        }

        .field-input:focus,
        .field-textarea:focus {
          border-bottom-color: ${COLORS.bodyGray};
        }

        .field-input.has-error,
        .field-textarea.has-error {
          border-bottom-color: ${COLORS.error};
        }

        .field-textarea {
          resize: none;
          min-height: 100px;
          display: block;
        }

        .field-error {
          margin-top: 6px;
          font-family: ${FONT};
          font-size: 0.75rem;
          color: ${COLORS.error};
          display: flex;
          align-items: center;
          gap: 5px;
        }

        /* ── SUBMIT BUTTON — matches WelcomeSection's warm muted palette ── */
        .submit-area {
          margin-top: 48px;
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .submit-btn {
          background: ${COLORS.headingGray};
          color: ${COLORS.cream};
          border: none;
          padding: 16px 44px;
          font-family: ${FONT};
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          border-radius: 2px;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 0;
          background: ${COLORS.bodyGray};
          transition: width 0.35s ease;
          z-index: 0;
        }

        .submit-btn:hover::before {
          width: 100%;
        }

        .submit-btn span {
          position: relative;
          z-index: 1;
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .submit-btn:disabled::before {
          display: none;
        }

        .submit-note {
          font-family: ${FONT};
          font-size: 0.78rem;
          color: ${COLORS.mutedText};
          font-weight: 300;
          line-height: 1.5;
        }

        /* ── SUCCESS STATE ── */
        .success-state {
          text-align: center;
          padding: 48px 0;
          animation: fadeInUp 0.5s ease;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .success-icon {
          width: 72px;
          height: 72px;
          background: ${COLORS.headingGray};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 28px;
        }

        .success-icon svg {
          color: white;
        }

        /* Success title: Poppins like WelcomeSection h2 */
        .success-title {
          font-family: ${FONT};
          font-size: 2.2rem;
          font-weight: 300;
          letter-spacing: 0.04em;
          color: ${COLORS.headingGray};
          margin: 0 0 12px;
        }

        .success-text {
          font-family: ${FONT};
          color: ${COLORS.mutedText};
          font-size: 0.875rem;
          line-height: 1.75;
          font-weight: 300;
          margin: 0 0 36px;
        }

        .download-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: ${COLORS.headingGray};
          color: ${COLORS.cream};
          border: none;
          padding: 14px 36px;
          font-family: ${FONT};
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 500;
          cursor: pointer;
          border-radius: 2px;
          text-decoration: none;
          transition: background 0.3s;
          margin-bottom: 16px;
        }

        .download-btn:hover {
          background: ${COLORS.bodyGray};
        }

        .reset-link {
          display: block;
          font-family: ${FONT};
          font-size: 0.8rem;
          color: ${COLORS.mutedText};
          cursor: pointer;
          background: none;
          border: none;
          text-decoration: underline;
          margin-top: 12px;
        }

        .reset-link:hover {
          color: ${COLORS.deep};
        }

        /* ── ERROR BANNER ── */
        .error-banner {
          background: #fdf0ec;
          border: 1px solid #f5c6b5;
          color: ${COLORS.error};
          padding: 14px 20px;
          border-radius: 3px;
          font-family: ${FONT};
          font-size: 0.85rem;
          margin-top: 20px;
          font-weight: 300;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .contact-wrapper {
            grid-template-columns: 1fr;
          }
          .contact-left {
            position: relative;
            height: auto;
            padding: 48px 32px;
          }
          .left-headline h1 {
            font-size: 2.4rem;
          }
          .contact-right {
            padding: 48px 32px;
          }
        }

        @media (max-width: 480px) {
          .contact-right {
            padding: 40px 24px;
          }
          .submit-area {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="contact-page">
        <div className="contact-wrapper">
          {/* ── LEFT PANEL ── */}
          <div className="contact-left">
            <div className="brand-mark">
              <svg
                className="brand-leaf"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 4C18 4 6 10 6 22C6 28.627 11.373 34 18 34C24.627 34 30 28.627 30 22C30 10 18 4 18 4Z"
                  fill="#EDE8E2"
                  opacity="0.85"
                />
                <path
                  d="M18 4V34"
                  stroke="#C4B8AA"
                  strokeWidth="1"
                  opacity="0.6"
                />
              </svg>
              <p className="brand-name">Voila Outdoor</p>
            </div>

            <div className="left-headline">
              <h1>
                Download <em>Our</em>
                <br />
                Catalogue
              </h1>
              <div className="left-divider" />
              <p className="left-description">
                Temukan koleksi furnitur outdoor eksklusif kami. Isi formulir
                singkat untuk mendapatkan akses ke katalog lengkap 2026.
              </p>
            </div>

            <div className="catalogue-preview">
              <div className="catalogue-icon">
                <svg
                  width="20"
                  height="24"
                  viewBox="0 0 20 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 0H13L19 6V22C19 23.105 18.105 24 17 24H3C1.895 24 1 23.105 1 22V2C1 0.895 1.895 0 3 0Z"
                    fill="currentColor"
                    fillOpacity="0.3"
                  />
                  <path
                    d="M5 12H15M5 16H12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="catalogue-info">
                <p>Tersedia</p>
                <strong>Outdoor Catalogue 2026</strong>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="contact-right">
            <div className="form-container">
              {status === "success" ? (
                <div className="success-state">
                  <div className="success-icon">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h2 className="success-title">Terima Kasih!</h2>
                  <p className="success-text">
                    Data Anda telah kami terima. Katalog sedang terunduh
                    otomatis.
                    <br />
                    Jika unduhan tidak dimulai, klik tombol di bawah.
                  </p>
                  <a
                    href={catalogPdfUrl}
                    download="Voila-Outdoor-Catalogue-2026.pdf"
                    className="download-btn"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span>Unduh Katalog PDF</span>
                  </a>
                  <button className="reset-link" onClick={handleReset}>
                    Kembali ke formulir
                  </button>
                </div>
              ) : (
                <>
                  <p className="form-eyebrow">Katalog Eksklusif</p>
                  <h2 className="form-title">
                    Lengkapi Formulir
                    <br />
                    Berikut Ini
                  </h2>
                  <p className="form-subtitle">
                    Katalog akan otomatis terunduh setelah formulir berhasil
                    dikirim.
                  </p>

                  <div>
                    {/* Nama */}
                    <div className="field-group">
                      <label className="field-label" htmlFor="name">
                        Nama Lengkap <span>*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className={`field-input${errors.name ? " has-error" : ""}`}
                        placeholder="Masukkan nama Anda"
                        value={form.name}
                        onChange={handleChange}
                        autoComplete="name"
                      />
                      {errors.name && (
                        <p className="field-error">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="field-group">
                      <label className="field-label" htmlFor="email">
                        Alamat Email <span>*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className={`field-input${errors.email ? " has-error" : ""}`}
                        placeholder="contoh@email.com"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p className="field-error">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Pesan */}
                    <div className="field-group">
                      <label className="field-label" htmlFor="message">
                        Pesan <span>*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className={`field-textarea${errors.message ? " has-error" : ""}`}
                        placeholder="Ceritakan kebutuhan atau pertanyaan Anda..."
                        value={form.message}
                        onChange={handleChange}
                      />
                      {errors.message && (
                        <p className="field-error">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div className="submit-area">
                      <button
                        className="submit-btn"
                        onClick={handleSubmit}
                        disabled={status === "loading"}
                      >
                        <span>
                          {status === "loading"
                            ? "Mengirim..."
                            : "Unduh Katalog"}
                        </span>
                      </button>
                      <p className="submit-note">
                        PDF akan terunduh
                        <br />
                        otomatis setelah submit
                      </p>
                    </div>

                    {status === "error" && (
                      <div className="error-banner">
                        Terjadi kesalahan. Pastikan server berjalan dan coba
                        lagi.
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
