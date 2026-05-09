import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { IMAGE_BASE_URL, FONT } from "../../constants/home";

const WelcomeSection = ({ texts, sliders }) => (
  <section
    style={{
      width: "100%",
      background: "#FFFFFF",
      padding: "48px 0 32px 0",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {/* LEFT: TEXT */}
      <div
        style={{
          flex: "1 1 45%",
          padding: "0 40px 0 48px",
          boxSizing: "border-box",
          minWidth: "260px",
        }}
      >
        <h2
          style={{
            color: "#7C7669",
            fontFamily: "clamp(2.6rem, 4vw, 4.2rem)",
            fontSize: "3.4rem",
            fontWeight: "300",
            lineHeight: 1.1,
            letterSpacing: "0.06em",
          }}
        >
          {texts.welcome_heading || "WELCOME TO VOILA LIVING"}
        </h2>

        <p
          style={{
            color: "#8A847D",
            lineHeight: "1.75",
            fontSize: "0.875rem",
            textAlign: "justify",
            fontFamily: FONT,
            maxWidth: "480px",
            margin: 0,
          }}
        >
          {texts.welcome_paragraph || "Menunggu teks dari database..."}
        </p>
      </div>

      {/* RIGHT: SWIPER */}
      <div
        style={{
          flex: "1 1 53%",
          /* Fixed height agar layout tidak bergeser saat slide animasi */
          height: "280px",
          position: "relative",
          minWidth: "300px",
        }}
      >
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          slidesPerView={1.9}
          centeredSlides
          spaceBetween={-200}
          loop
          style={{ height: "100%" }}
        >
          {sliders.categoryGallery.map((img) => (
            <SwiperSlide
              key={img.id}
              style={{
                /* SwiperSlide harus fixed size — jangan ubah ukurannya */
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              {({ isActive }) => (
                /*
                 * KUNCI FIX:
                 * - Wrapper luar: ukuran TETAP (tidak berubah), hanya opacity
                 * - Elemen dalam (kartu): scale via transform tapi
                 *   dibungkus container fixed sehingga tidak menggeser layout
                 */
                <div
                  style={{
                    width: "340px",
                    height: "240px",
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "20px",
                      background: "#EDE8E2",
                      overflow: "hidden",
                      /* transform hanya pada elemen ini, tidak mempengaruhi flow */
                      transform: isActive ? "scale(1)" : "scale(0.82)",
                      transformOrigin: "center center",
                      transition:
                        "transform 0.45s ease, opacity 0.45s ease, box-shadow 0.45s ease",
                      opacity: isActive ? 1 : 0.3,
                      boxShadow: isActive
                        ? "0 8px 28px rgba(0,0,0,0.10)"
                        : "none",
                      willChange: "transform, opacity",
                    }}
                  >
                    <img
                      src={`${IMAGE_BASE_URL}${img.image_url}`}
                      alt="Category"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        padding: "10px",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* BUTTON PREV */}
        <button
          className="custom-prev"
          style={{
            position: "absolute",
            left: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(180,170,158,0.75)",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          }}
        >
          ❮
        </button>

        {/* BUTTON NEXT */}
        <button
          className="custom-next"
          style={{
            position: "absolute",
            right: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(180,170,158,0.75)",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          }}
        >
          ❯
        </button>
      </div>
    </div>
  </section>
);

export default WelcomeSection;
