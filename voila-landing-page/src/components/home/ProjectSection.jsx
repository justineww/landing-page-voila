import React, { useState } from "react";
import { IMAGE_BASE_URL, FONT, COUNTRY_FLAGS } from "../../constants/home";

// Mapping country code ke flag image via flagcdn.com
// Sesuaikan array ini dengan COUNTRY_FLAGS yang ada di constants/home
const FLAG_CODES = [
  { code: "id", label: "Indonesia" },
  { code: "jp", label: "Japan" },
  { code: "hk", label: "Hong Kong" },
  { code: "sg", label: "Singapore" },
  { code: "cn", label: "China" },
  { code: "my", label: "Malaysia" },
];

const ProjectSection = ({ texts, projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <style>{`
        .project-card img { transition: transform 0.5s ease; }
        .project-card:hover img { transform: scale(1.08); }
        .project-card .overlay { transition: background 0.3s ease; }
        .project-card:hover .overlay { background: rgba(0,0,0,0.45); }

        .flag-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 3px 10px rgba(0,0,0,0.22);
          flex-shrink: 0;
          margin-right: -8px;
          border: 2px solid white;
          background: #eee;
        }

        .flag-circle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      `}</style>

      {/* MODAL */}
      {selectedProject && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 20px",
          }}
        >
          <div
            style={{
              background: "white",
              maxWidth: "900px",
              width: "100%",
              borderRadius: "24px",
              overflow: "hidden",
              position: "relative",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                zIndex: 10,
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(0,0,0,0.65)",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontFamily: FONT,
              }}
            >
              ✕
            </button>
            <div style={{ height: "380px" }}>
              <img
                src={`${IMAGE_BASE_URL}${selectedProject.image_url}`}
                alt={selectedProject.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div
              style={{
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h3
                style={{
                  color: "#7E7768",
                  fontFamily: FONT,
                  fontSize: "2rem",
                  marginBottom: "1.5rem",
                  fontWeight: "600",
                }}
              >
                {selectedProject.title}
              </h3>
              <p
                style={{
                  color: "#8A8A8A",
                  lineHeight: "1.8",
                  textAlign: "justify",
                  fontFamily: FONT,
                }}
              >
                {selectedProject.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <section style={{ width: "100%", background: "#F5F3EF" }}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/* LEFT COLUMN */}
          <div style={{ width: "100%", maxWidth: "50%", flex: "1 1 50%" }}>
            <div
              style={{
                position: "relative",
                height: "340px",
                overflow: "hidden",
              }}
            >
              {projects.length > 0 ? (
                <img
                  src={`${IMAGE_BASE_URL}${projects[0].image_url}`}
                  alt="Project"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#ddd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FONT,
                  }}
                >
                  Upload Project Banner
                </div>
              )}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to right, transparent 60%, #F5F3EF 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, transparent 60%, #F5F3EF 100%)",
                }}
              />
            </div>

            <div style={{ padding: "32px 48px 48px" }}>
              <p
                style={{
                  color: "#8A8A8A",
                  lineHeight: "1.8",
                  fontSize: "0.95rem",
                  textAlign: "justify",
                  marginBottom: "40px",
                  fontFamily: FONT,
                }}
              >
                {texts.project_paragraph ||
                  "Menunggu teks project dari database..."}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "48px",
                  alignItems: "flex-end",
                  marginBottom: "28px",
                }}
              >
                {[
                  {
                    label: "COUNTRY",
                    value: texts.project_stat_country || "25",
                  },
                  {
                    label: "TYPE MODE",
                    value: texts.project_stat_type || "120",
                  },
                  {
                    label: "PROJECT",
                    value: texts.project_stat_total || "250",
                  },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p
                      style={{
                        color: "#7E7768",
                        fontSize: "0.8rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "4px",
                        fontFamily: FONT,
                      }}
                    >
                      {stat.label}
                    </p>
                    <p
                      style={{
                        color: "#7E7768",
                        fontFamily: FONT,
                        fontSize: "clamp(3rem, 6vw, 5rem)",
                        lineHeight: 1,
                        fontWeight: "700",
                      }}
                    >
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* FLAG CIRCLES — menggantikan emoji */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "8px",
                }}
              >
                {FLAG_CODES.map((flag, i) => (
                  <div
                    key={i}
                    className="flag-circle"
                    title={flag.label}
                    style={{ zIndex: FLAG_CODES.length - i }}
                  >
                    <img
                      src={`https://flagcdn.com/w80/${flag.code}.png`}
                      alt={flag.label}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div
            style={{
              width: "100%",
              maxWidth: "50%",
              flex: "1 1 50%",
              padding: "48px 40px 48px 32px",
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
              OUR PROJECT
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
              }}
            >
              {projects.length > 0
                ? projects.map((project) => (
                    <div
                      key={project.id}
                      className="project-card"
                      onClick={() => setSelectedProject(project)}
                      style={{
                        position: "relative",
                        borderRadius: "20px",
                        overflow: "hidden",
                        cursor: "pointer",
                        aspectRatio: "1 / 1",
                        background: "#C9C0B0",
                      }}
                    >
                      <img
                        src={`${IMAGE_BASE_URL}${project.image_url}`}
                        alt={project.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      <div
                        className="overlay"
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(0,0,0,0.15)",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "flex-end",
                          padding: "12px",
                        }}
                      >
                        <h3
                          style={{
                            color: "white",
                            fontSize: "0.85rem",
                            fontFamily: FONT,
                            fontWeight: "600",
                          }}
                        >
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  ))
                : Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        borderRadius: "20px",
                        background: "#C9C0B0",
                        aspectRatio: "1 / 1",
                      }}
                    />
                  ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectSection;
