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

        * {
          font-family: 'Poppins', sans-serif !important;
        }

        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-left 22s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        .about-slide {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 1024px) {
          .about-wrapper {
            flex-direction: column;
          }

          .about-left,
          .about-right {
            width: 100% !important;
          }

          .gallery-floating {
            position: relative !important;
            width: 100% !important;
            bottom: auto !important;
            margin-top: -40px;
            padding-bottom: 40px;
          }

          .center-fade {
            display: none;
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
        <div
          className="about-wrapper"
          style={{
            display: "flex",
            minHeight: "800px",
            position: "relative",
          }}
        >
          {/* LEFT CONTENT */}
          <div
            className="about-left"
            style={{
              width: "52%",
              padding: "80px 60px 280px 72px",
              position: "relative",
              zIndex: 3,
              background: "#FFFFFF",
            }}
          >
            <h2
              style={{
                color: "#7C7669",
                fontSize: "clamp(2.6rem, 4vw, 4.2rem)",
                fontWeight: "300",
                letterSpacing: "0.06em",
                marginBottom: "32px",
                fontFamily: FONT,
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
                fontFamily: FONT,
              }}
            >
              {texts.about_us || "Menunggu teks dari database..."}
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div
            className="about-right"
            style={{
              width: "48%",
              position: "relative",
              overflow: "hidden",
              minHeight: "800px",
              zIndex: 6,
            }}
          >
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
                  fontFamily: FONT,
                }}
              >
                Upload About Image
              </div>
            )}

            {/* FADE OVERLAY — fades from white on the left, transparent on the right */}
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

          {/* CENTER FADE */}
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

          {/* FLOATING GALLERY — zIndex 4 agar berada di bawah foto kanan (zIndex 6) */}
          <div
            className="gallery-floating"
            style={{
              position: "absolute",
              left: 0,
              bottom: "200px",
              width: "100%",
              zIndex: 4,
              overflow: "hidden",
            }}
          >
            {aboutGallery.length > 0 ? (
              <div style={{ overflow: "hidden" }}>
                <div className="marquee-track">
                  {[...aboutGallery, ...aboutGallery].map((img, idx) => (
                    <div
                      key={idx}
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
                  marginLeft: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#AAA",
                  fontFamily: FONT,
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
