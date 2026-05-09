import React from "react";
import { IMAGE_BASE_URL, FONT } from "../../constants/home";
import IndonesianLegalWood from "../../storage/IndonesianLegalWood.png";
import LogoVoila from "../../storage/LogoVoila.png";

const AWARD_COUNT = 5;

const ContactSection = ({ texts, contactImage }) => {
  const waNumber = (texts.contact_phone || "+628132657 7242").replace(
    /\D/g,
    "",
  );
  const waLink = `https://wa.me/${waNumber}`;

  return (
    <section style={{ width: "100%", background: "white", overflow: "hidden" }}>
      {/* ═══════════════════════════════════════════════
          TOP HALF: Logo + Awards (left) | Hero Image (right)
      ═══════════════════════════════════════════════ */}
      <div style={{ display: "flex", flexWrap: "wrap", minHeight: "320px" }}>
        {/* LEFT: Logo + Award certs */}
        <div
          style={{
            flex: "1 1 50%",
            padding: "48px 56px 40px 56px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {/* Brand Logo — gambar dari file */}
          <div style={{ marginBottom: "44px" }}>
            <img
              src={LogoVoila}
              alt="Voila Living"
              style={{
                maxWidth: "320px",
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>

          {/* Award / Sertifikat logos */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: "10px",
            }}
          >
            {Array.from({ length: AWARD_COUNT }).map((_, i) => (
              <img
                key={i}
                src={IndonesianLegalWood}
                alt="Indonesian Legal Wood"
                style={{
                  width: "72px",
                  height: "72px",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: Hero image + WA button */}
        <div
          style={{
            flex: "1 1 50%",
            position: "relative",
            minHeight: "320px",
            overflow: "hidden",
          }}
        >
          {contactImage.length > 0 ? (
            <img
              src={`${IMAGE_BASE_URL}${contactImage[0].image_url}`}
              alt="Contact"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                inset: 0,
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "#f0ebe3",
                minHeight: "320px",
              }}
            />
          )}

          {/* subtle dark overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.08)",
            }}
          />
          {/* WA button */}
          <div
            style={{
              position: "absolute",
              bottom: "36px",
              right: "36px",
              zIndex: 2,
            }}
          >
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: "#25D366",
                color: "white",
                padding: "16px 32px",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: "700",
                fontSize: "1.05rem",
                boxShadow: "0 4px 24px rgba(37,211,102,0.45)",
                fontFamily: FONT,
                letterSpacing: "0.01em",
              }}
            >
              <svg width="26" height="26" viewBox="0 0 32 32" fill="white">
                <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.676 4.82 1.856 6.82L2 30l7.4-1.822A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.4c-2.22 0-4.3-.6-6.08-1.64l-.44-.26-4.4 1.08 1.1-4.28-.28-.46A11.4 11.4 0 014.6 16C4.6 9.7 9.7 4.6 16 4.6S27.4 9.7 27.4 16 22.3 27.4 16 27.4zm6.28-8.54c-.34-.17-2.02-1-2.34-1.1-.32-.12-.56-.17-.8.17-.24.34-.9 1.1-1.1 1.34-.2.22-.4.25-.74.08-.34-.17-1.44-.53-2.74-1.7-1.01-.9-1.7-2.02-1.9-2.36-.2-.34-.02-.52.15-.7.15-.15.34-.4.52-.6.17-.2.22-.34.34-.56.12-.22.06-.42-.02-.6-.08-.17-.8-1.93-1.1-2.64-.28-.68-.58-.58-.8-.6h-.68c-.22 0-.58.08-.88.4-.3.32-1.16 1.14-1.16 2.78 0 1.64 1.18 3.22 1.36 3.44.18.22 2.34 3.56 5.66 4.98.8.34 1.42.54 1.9.7.8.26 1.52.22 2.1.14.64-.1 1.96-.8 2.24-1.58.28-.78.28-1.44.2-1.58-.08-.14-.3-.22-.64-.4z" />
              </svg>
              Chat with us now
            </a>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          BOTTOM HALF: Map (left) | Contact Details (right)
      ═══════════════════════════════════════════════ */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          borderTop: "1px solid #f0ebe3",
        }}
      >
        {/* Map */}
        <div style={{ flex: "0 0 360px", minWidth: "280px" }}>
          <div style={{ height: "340px", overflow: "hidden" }}>
            <iframe
              title="Voila Living Location"
              src="https://maps.google.com/maps?q=Sekarpetak+RT.02+Bangunjiwo+Kasihan+Bantul+Yogyakarta&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>

        {/* Contact details — 2 kolom sesuai desain */}
        <div
          style={{
            flex: "1 1 0",
            padding: "40px 56px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 48px",
            alignContent: "start",
          }}
        >
          {/* CONTACT US heading — spans full width */}
          <div style={{ gridColumn: "1 / -1", marginBottom: "28px" }}>
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
              CONTACT US
            </h2>
          </div>

          {/* COL LEFT: Office + Factory */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            {/* Office */}
            <div>
              <p
                style={{
                  fontWeight: "700",
                  color: "#555",
                  fontSize: "0.92rem",
                  fontFamily: FONT,
                  marginBottom: "4px",
                }}
              >
                Office:
              </p>
              <p
                style={{
                  color: "#7E7768",
                  lineHeight: 1.65,
                  fontSize: "0.92rem",
                  fontFamily: FONT,
                  whiteSpace: "pre-line",
                }}
              >
                {texts.contact_office ||
                  "Sekarpetak RT.02,\nBangunjiwo, Kasihan,\nBantul, Yogyakarta"}
              </p>
            </div>

            {/* Factory */}
            <div>
              <p
                style={{
                  fontWeight: "700",
                  color: "#555",
                  fontSize: "0.92rem",
                  fontFamily: FONT,
                  marginBottom: "4px",
                }}
              >
                Factory:
              </p>
              <p
                style={{
                  color: "#7E7768",
                  lineHeight: 1.65,
                  fontSize: "0.92rem",
                  fontFamily: FONT,
                  whiteSpace: "pre-line",
                }}
              >
                {texts.contact_factory ||
                  "Jl. Solo–Purwodadi,\nDusun II, Karangjati,\nKec. Kalijambe, Kabupaten Sragen,\nJateng"}
              </p>
            </div>
          </div>

          {/* COL RIGHT: Phone, Email, Instagram, Website */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Phone */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "2px",
                }}
              >
                {/* phone icon SVG */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7E7768"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .82h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                <p
                  style={{
                    fontWeight: "700",
                    color: "#555",
                    fontSize: "0.92rem",
                    fontFamily: FONT,
                  }}
                >
                  Phone:
                </p>
              </div>
              <p
                style={{
                  color: "#7E7768",
                  fontSize: "0.92rem",
                  fontFamily: FONT,
                  paddingLeft: "26px",
                }}
              >
                {texts.contact_phone || "+62 813 2657 7242"}
              </p>
            </div>

            {/* Email */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "2px",
                }}
              >
                {/* email icon SVG */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7E7768"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
                <p
                  style={{
                    fontWeight: "700",
                    color: "#555",
                    fontSize: "0.92rem",
                    fontFamily: FONT,
                  }}
                >
                  Email:
                </p>
              </div>
              <p
                style={{
                  color: "#7E7768",
                  fontSize: "0.92rem",
                  fontFamily: FONT,
                  paddingLeft: "26px",
                  wordBreak: "break-all",
                }}
              >
                {texts.contact_email || "opsvoilaliving@gmail.com"}
              </p>
            </div>

            {/* Instagram */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "2px",
                }}
              >
                {/* instagram icon SVG */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7E7768"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="#7E7768"
                    stroke="none"
                  />
                </svg>
                <p
                  style={{
                    fontWeight: "700",
                    color: "#555",
                    fontSize: "0.92rem",
                    fontFamily: FONT,
                  }}
                >
                  Instagram:
                </p>
              </div>
              <p
                style={{
                  color: "#7E7768",
                  fontSize: "0.92rem",
                  fontFamily: FONT,
                  paddingLeft: "26px",
                }}
              >
                {texts.contact_ig || "@voilaliving_living_indonesia"}
              </p>
            </div>

            {/* Website */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "2px",
                }}
              >
                {/* globe icon SVG */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7E7768"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
                <p
                  style={{
                    fontWeight: "700",
                    color: "#555",
                    fontSize: "0.92rem",
                    fontFamily: FONT,
                  }}
                >
                  Website:
                </p>
              </div>
              <p
                style={{
                  color: "#7E7768",
                  fontSize: "0.92rem",
                  fontFamily: FONT,
                  paddingLeft: "26px",
                }}
              >
                {texts.contact_web || "www.voilaliving.com"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
