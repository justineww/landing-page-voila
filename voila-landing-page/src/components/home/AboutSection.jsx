import React, { useState, useEffect } from "react";
import { IMAGE_BASE_URL, FONT } from "../../constants/home";

const AboutSection = ({ texts, aboutGallery, aboutSideImage }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (aboutSideImage.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % aboutSideImage.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [aboutSideImage.length]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        * { font-family: 'Poppins', sans-serif !important; }

        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-left 22s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }

        .about-slide {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* ── DESKTOP ── */
        .about-wrapper {
          display: flex;
          min-height: 800px;
          position: relative;
        }

        .about-left {
          width: 52%;
          padding: 80px 60px 280px 72px;
          position: relative;
          z-index: 3;
          background: #FFFFFF;
        }

        .about-right {
          width: 48%;
          position: relative;
          overflow: hidden;
          min-height: 800px;
          z-index: 6;
        }

        .gallery-floating {
          position: absolute;
          left: 0;
          bottom: 200px;
          width: 100%;
          z-index: 4;
          overflow: hidden;
        }

        /* ── TABLET ── */
        @media (max-width: 1024px) {
          .about-wrapper {
            flex-direction: column;
            min-height: unset;
          }

          .about-left {
            width: 100%;
            padding: 48px 32px 48px 32px;
          }

          .about-right {
            width: 100%;
            min-height: 340px;
            height: 340px;
          }

          .gallery-floating {
            position: relative;
            bottom: auto;
            margin-top: 0;
            padding: 24px 0;
          }

          .center-fade { display: none; }
        }

        /* ── MOBILE ── */
        @media (max-width: 640px) {
          .about-left {
            padding: 36px 20px 36px 20px;
          }

          .about-right {
            min-height: 260px;
            height: 260px;
          }

          .gallery-card {
            width: 160px !important;
            height: 120px !important;
          }
        }
      `}</style>

      <section
        style={{
          width: "100%",
          background: "#FFFFFF",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div className="about-wrapper">
          {/* LEFT CONTENT */}
          <div className="about-left">
            <h2
              style={{
                color: "#7C7669",
                fontSize: "clamp(2.2rem, 4vw, 4.2rem)",
                fontWeight: "300",
                letterSpacing: "0.06em",
                marginBottom: "32px",
                lineHeight: 1.1,
              }}
            >
              ABOUT US
            </h2>

            <p
              style={{
                color: "#6B6560",
                lineHeight: "1.75",
                fontSize: "1rem",
                maxWidth: "600px",
                textAlign: "justify",
                fontWeight: "300",
              }}
            >
              {texts.about_us || "Menunggu teks dari database..."}
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="about-right">
            {aboutSideImage.length > 0 ? (
              aboutSideImage.map((img, idx) => (
                <img
                  key={img.id}
                  src={`${IMAGE_BASE_URL}${img.image_url}`}
                  alt="About"
                  className="about-slide"
                  style={{
                    opacity: idx === currentSlide ? 1 : 0,
                    transition:
                      aboutSideImage.length > 1
                        ? "opacity 1s ease-in-out"
                        : "none",
                  }}
                />
              ))
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#E8E1D7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#999",
                }}
              >
                Upload About Image
              </div>
            )}

            {/* Fade overlay — hanya di desktop (left fade) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.55) 28%, transparent 55%)",
                zIndex: 2,
              }}
            />
          </div>

          {/* CENTER FADE — desktop only */}
          <div
            className="center-fade"
            style={{
              position: "absolute",
              left: "47%",
              top: 0,
              width: "120px",
              height: "100%",
              background:
                "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))",
              filter: "blur(4px)",
              zIndex: 4,
              pointerEvents: "none",
            }}
          />

          {/* FLOATING GALLERY */}
          <div className="gallery-floating">
            {aboutGallery.length > 0 ? (
              <div style={{ overflow: "hidden" }}>
                <div className="marquee-track">
                  {[...aboutGallery, ...aboutGallery].map((img, idx) => (
                    <div
                      key={idx}
                      className="gallery-card"
                      style={{
                        width: "210px",
                        height: "160px",
                        borderRadius: "20px",
                        overflow: "hidden",
                        marginRight: "14px",
                        flexShrink: 0,
                        position: "relative",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.10)",
                        background: "#DDD5CA",
                      }}
                    >
                      <img
                        src={`${IMAGE_BASE_URL}${img.image_url}`}
                        alt="Gallery"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div
                style={{
                  height: "160px",
                  background: "#EAE4DC",
                  borderRadius: "20px",
                  margin: "0 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#AAA",
                }}
              >
                Upload About Gallery
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
