import React from "react";
import { IMAGE_BASE_URL, FONT } from "../../constants/home";
import LogoVoila from "../../storage/LogoVoila.png";

const HeroSection = ({ sliders }) => (
  <section
    style={{
      position: "relative",
      width: "100%",
      height: "55vh",
      minHeight: "380px",
      overflow: "hidden",
    }}
  >
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
        <div style={{ width: "100%", height: "100%", background: "#e8e0d5" }} />
      )}

      {/* Fade kiri — agar teks logo terbaca */}
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

    {/* Hero brand content — vertically centered left */}
    <div
      style={{
        position: "relative",
        zIndex: 10,
        height: "100%",
        display: "flex",
        alignItems: "center",
        paddingLeft: "clamp(24px, 4vw, 56px)",
        paddingTop: "32px",
      }}
    >
      <img
        src={LogoVoila}
        alt="Voila Living"
        style={{
          height: "clamp(120px, 18vw, 200px)",
          width: "auto",
          objectFit: "contain",
        }}
      />
    </div>
  </section>
);

export default HeroSection;
