import React from "react";
import { IMAGE_BASE_URL, FONT } from "../../constants/home";
import LogoVoila from "../../storage/LogoVoila.png";

const HeroSection = ({ sliders }) => (
  <>
    <style>{`
      .hero-section {
        position: relative;
        width: 100%;
        height: 55vh;
        min-height: 280px;
        overflow: hidden;
      }

      .hero-logo {
        height: clamp(80px, 18vw, 200px);
        width: auto;
        object-fit: contain;
      }

      @media (max-width: 480px) {
        .hero-section {
          height: 45vh;
          min-height: 220px;
        }
      }
    `}</style>

    <section className="hero-section">
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0 }}>
        {sliders.hero.length > 0 ? (
          <img
            src={`${IMAGE_BASE_URL}${sliders.hero[0].image_url}`}
            alt="Hero"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        ) : (
          <div
            style={{ width: "100%", height: "100%", background: "#e8e0d5" }}
          />
        )}

        {/* Fade kiri */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.70) 38%, rgba(255,255,255,0.10) 65%, transparent 100%)",
          }}
        />

        {/* Fade bawah */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 55%, rgba(255,255,255,0.90) 100%)",
          }}
        />
      </div>

      {/* Logo */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          height: "100%",
          display: "flex",
          alignItems: "center",
          paddingLeft: "clamp(16px, 4vw, 56px)",
          paddingTop: "clamp(16px, 3vw, 32px)",
        }}
      >
        <img src={LogoVoila} alt="Voila Living" className="hero-logo" />
      </div>
    </section>
  </>
);

export default HeroSection;
