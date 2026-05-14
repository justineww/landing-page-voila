import React, { useState, useEffect } from "react";
import { IMAGE_BASE_URL, FONT } from "../../constants/home";
import IndonesianLegalWood from "../../storage/IndonesianLegalWood.png";
import LogoVoila from "../../storage/LogoVoila.png";

const AWARD_COUNT = 5;

/* ─── breakpoint hook ─────────────────────────────────────── */
function useBreakpoint() {
  const [bp, setBp] = useState(() => {
    if (typeof window === "undefined") return "desktop";
    const w = window.innerWidth;
    if (w < 480) return "mobile";
    if (w < 768) return "mobileLg";
    if (w < 1024) return "tablet";
    return "desktop";
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) setBp("mobile");
      else if (w < 768) setBp("mobileLg");
      else if (w < 1024) setBp("tablet");
      else setBp("desktop");
    };
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return bp;
}

/* ─── icon components ─────────────────────────────────────── */
const PhoneIcon = () => (
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
);

const EmailIcon = () => (
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
);

const IgIcon = () => (
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
    <circle cx="17.5" cy="6.5" r="1" fill="#7E7768" stroke="none" />
  </svg>
);

const GlobeIcon = () => (
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
);

const WaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 32 32" fill="white">
    <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.676 4.82 1.856 6.82L2 30l7.4-1.822A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.4c-2.22 0-4.3-.6-6.08-1.64l-.44-.26-4.4 1.08 1.1-4.28-.28-.46A11.4 11.4 0 014.6 16C4.6 9.7 9.7 4.6 16 4.6S27.4 9.7 27.4 16 22.3 27.4 16 27.4zm6.28-8.54c-.34-.17-2.02-1-2.34-1.1-.32-.12-.56-.17-.8.17-.24.34-.9 1.1-1.1 1.34-.2.22-.4.25-.74.08-.34-.17-1.44-.53-2.74-1.7-1.01-.9-1.7-2.02-1.9-2.36-.2-.34-.02-.52.15-.7.15-.15.34-.4.52-.6.17-.2.22-.34.34-.56.12-.22.06-.42-.02-.6-.08-.17-.8-1.93-1.1-2.64-.28-.68-.58-.58-.8-.6h-.68c-.22 0-.58.08-.88.4-.3.32-1.16 1.14-1.16 2.78 0 1.64 1.18 3.22 1.36 3.44.18.22 2.34 3.56 5.66 4.98.8.34 1.42.54 1.9.7.8.26 1.52.22 2.1.14.64-.1 1.96-.8 2.24-1.58.28-.78.28-1.44.2-1.58-.08-.14-.3-.22-.64-.4z" />
  </svg>
);

/* ─── ContactItem subcomponent ────────────────────────────── */
const ContactItem = ({ icon, label, value, isMobile }) => (
  <div>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "2px",
      }}
    >
      {icon}
      <p
        style={{
          fontWeight: "700",
          color: "#555",
          fontSize: isMobile ? "0.85rem" : "0.92rem",
          fontFamily: FONT,
          margin: 0,
        }}
      >
        {label}
      </p>
    </div>
    <p
      style={{
        color: "#7E7768",
        fontSize: isMobile ? "0.85rem" : "0.92rem",
        fontFamily: FONT,
        paddingLeft: "26px",
        wordBreak: "break-word",
        margin: 0,
      }}
    >
      {value}
    </p>
  </div>
);

/* ─── main component ──────────────────────────────────────── */
const ContactSection = ({ texts, contactImage }) => {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile" || bp === "mobileLg";
  const isTablet = bp === "tablet";
  const isDesktop = bp === "desktop";

  const waNumber = (texts.contact_phone || "+628132657 7242").replace(
    /\D/g,
    "",
  );
  const waLink = `https://wa.me/${waNumber}`;

  /* ── derived layout values ── */
  const topPadding = isMobile
    ? "28px 20px 24px"
    : isTablet
      ? "36px 36px 32px"
      : "48px 56px 40px 56px";
  const logoMaxWidth = isMobile ? "180px" : isTablet ? "240px" : "320px";
  const awardSize = isMobile ? "48px" : isTablet ? "60px" : "72px";
  const heroMinH = isMobile ? "240px" : "320px";
  const bottomPad = isMobile
    ? "28px 20px"
    : isTablet
      ? "32px 36px"
      : "40px 56px";
  const mapHeight = isMobile ? "220px" : "340px";
  const contactFontSize = isMobile ? "0.85rem" : "0.92rem";
  const headingSize = isMobile ? "2rem" : isTablet ? "2.6rem" : "3.4rem";

  return (
    <section style={{ width: "100%", background: "white", overflow: "hidden" }}>
      {/* ══ TOP: Logo+Awards | Hero Image ══ */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          flexWrap: isMobile ? "nowrap" : "wrap",
          minHeight: heroMinH,
        }}
      >
        {/* LEFT: Logo + Awards */}
        <div
          style={{
            flex: isMobile ? "0 0 auto" : "1 1 50%",
            padding: topPadding,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <div style={{ marginBottom: isMobile ? "24px" : "44px" }}>
            <img
              src={LogoVoila}
              alt="Voila Living"
              style={{
                maxWidth: logoMaxWidth,
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: isMobile ? "12px" : "20px",
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
                  width: awardSize,
                  height: awardSize,
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
            flex: isMobile ? "0 0 auto" : "1 1 50%",
            position: "relative",
            minHeight: heroMinH,
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
                position: isMobile ? "relative" : "absolute",
                inset: 0,
                display: "block",
                minHeight: heroMinH,
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                background: "#f0ebe3",
                minHeight: heroMinH,
              }}
            />
          )}

          {/* dark overlay */}
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
              bottom: isMobile ? "16px" : "36px",
              right: isMobile ? "16px" : "36px",
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
                gap: isMobile ? "8px" : "12px",
                background: "#25D366",
                color: "white",
                padding: isMobile ? "11px 20px" : "16px 32px",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: "700",
                fontSize: isMobile ? "0.85rem" : "1.05rem",
                boxShadow: "0 4px 24px rgba(37,211,102,0.45)",
                fontFamily: FONT,
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
              }}
            >
              <WaIcon />
              {isMobile ? "Chat with us" : "Chat with us now"}
            </a>
          </div>
        </div>
      </div>

      {/* ══ BOTTOM: Map | Contact Details ══ */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          flexWrap: isMobile ? "nowrap" : "wrap",
          borderTop: "1px solid #f0ebe3",
        }}
      >
        {/* Map */}
        <div
          style={{
            flex: isMobile ? "0 0 auto" : isTablet ? "0 0 300px" : "0 0 360px",
            minWidth: isMobile ? "unset" : "280px",
            width: isMobile ? "100%" : undefined,
          }}
        >
          <div style={{ height: mapHeight, overflow: "hidden" }}>
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

        {/* Contact details */}
        <div
          style={{
            flex: "1 1 0",
            padding: bottomPad,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "0" : `0 ${isTablet ? "32px" : "48px"}`,
            alignContent: "start",
          }}
        >
          {/* CONTACT US heading */}
          <div
            style={{
              gridColumn: "1 / -1",
              marginBottom: isMobile ? "20px" : "28px",
            }}
          >
            <h2
              style={{
                color: "#7C7669",
                fontFamily: FONT,
                fontSize: headingSize,
                fontWeight: "300",
                lineHeight: 1.1,
                letterSpacing: "0.06em",
                margin: 0,
              }}
            >
              CONTACT US
            </h2>
          </div>

          {/* COL LEFT: Office + Factory */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "20px" : "24px",
              marginBottom: isMobile ? "20px" : 0,
            }}
          >
            <div>
              <p
                style={{
                  fontWeight: "700",
                  color: "#555",
                  fontSize: contactFontSize,
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
                  fontSize: contactFontSize,
                  fontFamily: FONT,
                  whiteSpace: "pre-line",
                  margin: 0,
                }}
              >
                {texts.contact_office ||
                  "Sekarpetak RT.02,\nBangunjiwo, Kasihan,\nBantul, Yogyakarta"}
              </p>
            </div>

            <div>
              <p
                style={{
                  fontWeight: "700",
                  color: "#555",
                  fontSize: contactFontSize,
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
                  fontSize: contactFontSize,
                  fontFamily: FONT,
                  whiteSpace: "pre-line",
                  margin: 0,
                }}
              >
                {texts.contact_factory ||
                  "Jl. Solo–Purwodadi,\nDusun II, Karangjati,\nKec. Kalijambe, Kabupaten Sragen,\nJateng"}
              </p>
            </div>
          </div>

          {/* COL RIGHT: Phone, Email, Instagram, Website */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "16px" : "20px",
            }}
          >
            <ContactItem
              icon={<PhoneIcon />}
              label="Phone:"
              value={texts.contact_phone || "+62 813 2657 7242"}
              isMobile={isMobile}
            />
            <ContactItem
              icon={<EmailIcon />}
              label="Email:"
              value={texts.contact_email || "opsvoilaliving@gmail.com"}
              isMobile={isMobile}
            />
            <ContactItem
              icon={<IgIcon />}
              label="Instagram:"
              value={texts.contact_ig || "@voilaliving_living_indonesia"}
              isMobile={isMobile}
            />
            <ContactItem
              icon={<GlobeIcon />}
              label="Website:"
              value={texts.contact_web || "www.voilaliving.com"}
              isMobile={isMobile}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
