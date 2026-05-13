import React, { useState } from "react";
import { IMAGE_BASE_URL, FONT, COUNTRY_FLAGS } from "../../constants/home";

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
          width: 44px; height: 44px;
          border-radius: 50%; overflow: hidden;
          box-shadow: 0 3px 10px rgba(0,0,0,0.22);
          flex-shrink: 0; margin-right: -8px;
          border: 2px solid white; background: #eee;
        }
        .flag-circle img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* Layout utama */
        .project-outer {
          display: flex;
          flex-wrap: wrap;
        }

        .project-left {
          width: 100%;
          max-width: 50%;
          flex: 1 1 50%;
        }

        .project-right {
          width: 100%;
          max-width: 50%;
          flex: 1 1 50%;
          padding: 48px 40px 48px 32px;
          box-sizing: border-box;
        }

        .project-heading {
          color: #7C7669;
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          font-weight: 300;
          line-height: 1.1;
          letter-spacing: 0.06em;
          margin-bottom: 24px;
        }

        .project-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .stat-number {
          color: #7E7768;
          font-size: clamp(2.5rem, 5vw, 5rem);
          line-height: 1;
          font-weight: 700;
          font-family: ${FONT};
        }

        /* Modal */
        .modal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .modal-img { height: 380px; }

        /* TABLET */
        @media (max-width: 900px) {
          .project-left, .project-right {
            max-width: 100%;
            flex: 1 1 100%;
          }

          .project-right {
            padding: 32px 24px;
          }

          .project-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }

          .modal-grid {
            grid-template-columns: 1fr;
          }

          .modal-img {
            height: 240px;
          }
        }

        /* MOBILE */
        @media (max-width: 640px) {
          .project-right {
            padding: 24px 16px;
          }

          .project-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }

          .stat-row {
            gap: 24px !important;
          }

          .flag-circle {
            width: 36px;
            height: 36px;
          }
        }

        @media (max-width: 400px) {
          .project-grid {
            grid-template-columns: repeat(2, 1fr);
          }
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
            padding: "0 16px",
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
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            className="modal-grid"
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

            <div className="modal-img">
              <img
                src={`${IMAGE_BASE_URL}${selectedProject.image_url}`}
                alt={selectedProject.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div
              style={{
                padding: "clamp(24px, 4vw, 40px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h3
                style={{
                  color: "#7E7768",
                  fontFamily: FONT,
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
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
        <div className="project-outer">
          {/* LEFT COLUMN */}
          <div className="project-left">
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

            <div style={{ padding: "24px 32px 40px" }}>
              <p
                style={{
                  color: "#8A8A8A",
                  lineHeight: "1.8",
                  fontSize: "0.95rem",
                  textAlign: "justify",
                  marginBottom: "32px",
                  fontFamily: FONT,
                }}
              >
                {texts.project_paragraph ||
                  "Menunggu teks project dari database..."}
              </p>

              <div
                className="stat-row"
                style={{
                  display: "flex",
                  gap: "32px",
                  alignItems: "flex-end",
                  marginBottom: "24px",
                  flexWrap: "wrap",
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
                    <p className="stat-number">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* FLAG CIRCLES */}
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
          <div className="project-right">
            <h2 className="project-heading">OUR PROJECT</h2>

            <div className="project-grid">
              {projects.length > 0
                ? projects.map((project) => (
                    <div
                      key={project.id}
                      className="project-card"
                      onClick={() => setSelectedProject(project)}
                      style={{
                        position: "relative",
                        borderRadius: "16px",
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
                          padding: "10px",
                        }}
                      >
                        <h3
                          style={{
                            color: "white",
                            fontSize: "0.8rem",
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
                        borderRadius: "16px",
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
