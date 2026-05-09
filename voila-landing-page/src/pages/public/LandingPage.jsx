import React, { useState, useEffect } from "react";
import { FONT } from "../../constants/home";

import HeroSection from "../../components/home/HeroSection";
import WelcomeSection from "../../components/home/WelcomeSection";
import AboutSection from "../../components/home/AboutSection";
import ProjectSection from "../../components/home/ProjectSection";
import ContactSection from "../../components/home/ContactSection";

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

const LandingPage = () => {
  const [texts, setTexts] = useState({});
  const [sliders, setSliders] = useState(INITIAL_SLIDERS);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Texts
        const resTexts = await fetch("http://localhost:5000/api/home-contents");
        const { success: okTexts, data: textData } = await resTexts.json();
        if (okTexts) {
          const textObj = {};
          textData.forEach(({ content_type, text_value }) => {
            textObj[content_type] = text_value;
          });
          setTexts(textObj);
        }

        // Sliders
        const resSliders = await fetch(
          "http://localhost:5000/api/home-sliders",
        );
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

        // Projects
        const resProjects = await fetch("http://localhost:5000/api/projects");
        const { success: okProjects, data: projectData } =
          await resProjects.json();
        if (okProjects) setProjects(projectData);
      } catch (err) {
        console.error("Error fetching:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "white",
        fontFamily: FONT,
      }}
    >
      {/* marginBottom negatif untuk mendekatkan Hero ke Welcome */}
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
  );
};

export default LandingPage;
