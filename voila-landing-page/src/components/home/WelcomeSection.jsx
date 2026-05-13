import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { IMAGE_BASE_URL, FONT } from "../../constants/home";

const WelcomeSection = ({ texts, sliders }) => (
  <>
    <style>{`
      .welcome-section {
        width: 100%;
        background: #FFFFFF;
        padding: 48px 0 32px 0;
        overflow: hidden;
      }

      .welcome-inner {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }

      .welcome-text {
        flex: 1 1 45%;
        padding: 0 40px 0 48px;
        box-sizing: border-box;
        min-width: 260px;
      }

      .welcome-heading {
        color: #7C7669;
        font-size: clamp(2rem, 5vw, 3.4rem);
        font-weight: 300;
        line-height: 1.1;
        letter-spacing: 0.06em;
        margin-bottom: 20px;
      }

      .welcome-para {
        color: #8A847D;
        line-height: 1.75;
        font-size: 0.875rem;
        text-align: justify;
        font-family: ${FONT};
        max-width: 480px;
        margin: 0;
      }

      .welcome-slider {
        flex: 1 1 53%;
        height: 280px;
        position: relative;
        min-width: 300px;
      }

      .swiper-nav-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(180,170,158,0.75);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.10);
      }

      /* MOBILE */
      @media (max-width: 768px) {
        .welcome-section {
          padding: 36px 0 24px 0;
        }

        .welcome-text {
          flex: 1 1 100%;
          padding: 0 24px;
          margin-bottom: 28px;
        }

        .welcome-slider {
          flex: 1 1 100%;
          min-width: 0;
          height: 220px;
        }
      }

      @media (max-width: 480px) {
        .welcome-text {
          padding: 0 16px;
        }

        .welcome-slider {
          height: 200px;
        }
      }
    `}</style>

    <section className="welcome-section">
      <div className="welcome-inner">
        {/* TEXT */}
        <div className="welcome-text">
          <h2 className="welcome-heading">
            {texts.welcome_heading || "WELCOME TO VOILA LIVING"}
          </h2>
          <p className="welcome-para">
            {texts.welcome_paragraph || "Menunggu teks dari database..."}
          </p>
        </div>

        {/* SWIPER */}
        <div className="welcome-slider">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
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
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                {({ isActive }) => (
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

          <button
            className="swiper-nav-btn custom-prev"
            style={{ left: "8px" }}
          >
            ❮
          </button>
          <button
            className="swiper-nav-btn custom-next"
            style={{ right: "8px" }}
          >
            ❯
          </button>
        </div>
      </div>
    </section>
  </>
);

export default WelcomeSection;
