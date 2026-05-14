import React, { useState, useEffect } from "react";
import { FONT } from "../../constants/home";

import HeroSection from "../../components/home/HeroSection";
import WelcomeSection from "../../components/home/WelcomeSection";
import AboutSection from "../../components/home/AboutSection";
import ProjectSection from "../../components/home/ProjectSection";
import ContactSection from "../../components/home/ContactSection";

import { API_URL } from "../../constants/api";

/* ─────────────────────────────────────────────────────────────
   SKELETON STYLES — shimmer animation via injected <style>
───────────────────────────────────────────────────────────── */
const SKELETON_STYLE = `
  @keyframes shimmer {
    0%   { background-position: -800px 0; }
    100% { background-position:  800px 0; }
  }
  .sk {
    background: linear-gradient(90deg, #f0ece6 25%, #e8e2da 50%, #f0ece6 75%);
    background-size: 800px 100%;
    animation: shimmer 1.4s infinite linear;
    border-radius: 6px;
  }
`;

/* ─────────────────────────────────────────────────────────────
   SKELETON BLOCK helper
───────────────────────────────────────────────────────────── */
const Sk = ({ w = "100%", h = "16px", mb = "0", style = {} }) => (
  <div
    className="sk"
    style={{
      width: w,
      height: h,
      marginBottom: mb,
      borderRadius: "6px",
      ...style,
    }}
  />
);

/* ─────────────────────────────────────────────────────────────
   LANDING PAGE SKELETON — meniru struktur setiap section
───────────────────────────────────────────────────────────── */
const LandingPageSkeleton = () => (
  <div
    style={{
      width: "100%",
      minHeight: "100vh",
      background: "white",
      fontFamily: FONT,
      overflow: "hidden",
    }}
  >
    {/* Hero skeleton — full-width banner */}
    <div style={{ width: "100%", height: "clamp(260px, 55vw, 620px)" }}>
      <Sk w="100%" h="100%" style={{ borderRadius: 0 }} />
    </div>

    {/* Welcome / Category section */}
    <div
      style={{
        padding: "56px clamp(20px, 5vw, 80px)",
        display: "flex",
        gap: "40px",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          flex: "1 1 300px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        <Sk w="40%" h="14px" />
        <Sk w="60%" h="36px" />
        <Sk w="90%" h="14px" />
        <Sk w="75%" h="14px" />
        <Sk w="50%" h="14px" />
        <Sk
          w="120px"
          h="44px"
          style={{ marginTop: "12px", borderRadius: "50px" }}
        />
      </div>
      <div
        style={{
          flex: "1 1 300px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
        }}
      >
        {[...Array(4)].map((_, i) => (
          <Sk key={i} h="160px" style={{ borderRadius: "8px" }} />
        ))}
      </div>
    </div>

    {/* About section */}
    <div
      style={{
        padding: "56px clamp(20px, 5vw, 80px)",
        display: "flex",
        gap: "40px",
        flexWrap: "wrap",
        background: "#faf8f5",
      }}
    >
      <div style={{ flex: "1 1 240px" }}>
        <Sk w="100%" h="340px" style={{ borderRadius: "10px" }} />
      </div>
      <div
        style={{
          flex: "2 1 320px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          justifyContent: "center",
        }}
      >
        <Sk w="30%" h="13px" />
        <Sk w="55%" h="38px" />
        <Sk w="100%" h="13px" />
        <Sk w="95%" h="13px" />
        <Sk w="80%" h="13px" />
        <Sk w="100%" h="13px" />
        <Sk w="70%" h="13px" />
      </div>
    </div>

    {/* Project section */}
    <div style={{ padding: "56px clamp(20px, 5vw, 80px)" }}>
      <Sk w="35%" h="13px" mb="12px" />
      <Sk w="50%" h="36px" mb="32px" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Sk h="200px" style={{ borderRadius: "8px" }} />
            <Sk w="70%" h="14px" />
            <Sk w="50%" h="12px" />
          </div>
        ))}
      </div>
    </div>

    {/* Contact section */}
    <div style={{ borderTop: "1px solid #f0ebe3" }}>
      {/* Top: logo area | hero image */}
      <div style={{ display: "flex", flexWrap: "wrap", minHeight: "280px" }}>
        <div
          style={{
            flex: "1 1 50%",
            padding: "48px clamp(20px,5vw,56px)",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          <Sk w="220px" h="48px" style={{ borderRadius: "4px" }} />
          <div style={{ display: "flex", gap: "16px" }}>
            {[...Array(5)].map((_, i) => (
              <Sk key={i} w="64px" h="64px" style={{ borderRadius: "50%" }} />
            ))}
          </div>
        </div>
        <div style={{ flex: "1 1 50%" }}>
          <Sk
            w="100%"
            h="100%"
            style={{ minHeight: "280px", borderRadius: 0 }}
          />
        </div>
      </div>
      {/* Bottom: map | contact details */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          borderTop: "1px solid #f0ebe3",
        }}
      >
        <div style={{ flex: "0 0 360px", minWidth: "280px" }}>
          <Sk w="100%" h="340px" style={{ borderRadius: 0 }} />
        </div>
        <div
          style={{
            flex: "1 1 0",
            padding: "40px clamp(20px,5vw,56px)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Sk w="45%" h="44px" mb="8px" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px 48px",
            }}
          >
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <Sk w="40%" h="12px" />
                <Sk w="80%" h="12px" />
                <Sk w="65%" h="12px" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   DATA CONSTANTS
───────────────────────────────────────────────────────────── */
const INITIAL_SLIDERS = {
  hero: [],
  categoryGallery: [],
  aboutGallery: [],
  aboutSideImage: [],
  contactImage: [],
};

const SLIDER_TYPE_MAP = {
  hero_banner: "hero",
  side_image: "categoryGallery",
  about_gallery: "aboutGallery",
  about_side_image: "aboutSideImage",
  contact_image: "contactImage",
};

/* ─────────────────────────────────────────────────────────────
   LANDING PAGE
───────────────────────────────────────────────────────────── */
const LandingPage = () => {
  const [texts, setTexts] = useState({});
  const [sliders, setSliders] = useState(INITIAL_SLIDERS);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // ← state skeleton

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Text Content
        const resTexts = await fetch(`${API_URL}/api/home-contents`);
        if (!resTexts.ok)
          throw new Error(`home-contents gagal: ${resTexts.status}`);
        const { success: okTexts, data: textData } = await resTexts.json();
        if (okTexts) {
          const textObj = {};
          textData.forEach(({ content_type, text_value }) => {
            textObj[content_type] = text_value;
          });
          setTexts(textObj);
        }

        // Fetch Slider Data
        const resSliders = await fetch(`${API_URL}/api/home-sliders`);
        if (!resSliders.ok)
          throw new Error(`home-sliders gagal: ${resSliders.status}`);
        const { success: okSliders, data: sliderData } =
          await resSliders.json();
        if (okSliders) {
          const sliderObj = { ...INITIAL_SLIDERS };
          sliderData.forEach((item) => {
            const key = SLIDER_TYPE_MAP[item.slider_type];
            if (key) sliderObj[key].push(item);
          });
          setSliders(sliderObj);
        }

        // Fetch Projects
        const resProjects = await fetch(`${API_URL}/api/projects`);
        if (!resProjects.ok)
          throw new Error(`projects gagal: ${resProjects.status}`);
        const { success: okProjects, data: projectData } =
          await resProjects.json();
        if (okProjects) setProjects(projectData);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      } finally {
        setIsLoading(false); // ← selesai loading, apapun hasilnya
      }
    };

    fetchData();
  }, []);

  /* Tampilkan skeleton selama data belum siap */
  if (isLoading) {
    return (
      <>
        <style>{SKELETON_STYLE}</style>
        <LandingPageSkeleton />
      </>
    );
  }

  return (
    <>
      <style>{SKELETON_STYLE}</style>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          background: "white",
          fontFamily: FONT,
        }}
      >
        <div style={{ marginBottom: "-32px" }}>
          <HeroSection sliders={sliders} />
        </div>

        <WelcomeSection texts={texts} sliders={sliders} />

        <AboutSection
          texts={texts}
          aboutGallery={sliders.aboutGallery}
          aboutSideImage={sliders.aboutSideImage}
        />

        <ProjectSection texts={texts} projects={projects} />

        <ContactSection texts={texts} contactImage={sliders.contactImage} />
      </div>
    </>
  );
};

export default LandingPage;
