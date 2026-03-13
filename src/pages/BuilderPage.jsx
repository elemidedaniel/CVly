import { useState } from "react";
import { useCV } from "../context/CVContext";
import FormPanel from "../components/Builder/FormPanel";
import PreviewPanel from "../components/Builder/PreviewPanel";
import Executive from "../components/Templates/Executive";
import Modern from "../components/Templates/Modern";
import Creative from "../components/Templates/Creative";

const sans = "'Arial', sans-serif";

const TEMPLATES = [
  { id: "executive", label: "Executive" },
  { id: "modern",    label: "Modern"    },
  { id: "creative",  label: "Creative"  },
];

const COLORS = [
  "#E85D26", "#1a73e8", "#0f9d58",
  "#8b5cf6", "#e11d48", "#0d9488",
  "#b45309", "#1a1a1a",
];

const templateMap = {
  executive: Executive,
  modern: Modern,
  creative: Creative,
};

function handlePrint() {
  window.print();
}

async function handleDownload(activeTemplate) {
  const html2pdf = (await import("html2pdf.js")).default;
  const el = document.getElementById("cv-preview");
  if (!el) return;
  html2pdf()
    .set({
      margin: 0,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    })
    .from(el)
    .save();
}

export default function BuilderPage() {
  const { activeTemplate, setActiveTemplate, accentColor, setAccentColor } = useCV();
  const [mobileTab, setMobileTab] = useState("form");

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* ── TOP BAR ── */}
      <div style={{
        height: "60px", background: "#111",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px", flexShrink: 0,
        gap: "16px", flexWrap: "wrap",
      }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E85D26" }} />
          <span style={{ fontFamily: sans, fontSize: "13px", fontWeight: 700, color: "#fff", letterSpacing: "0.1em" }}>
            CVly
          </span>
        </div>

        {/* Template switcher */}
        <div style={{ display: "flex", gap: "6px" }}>
          {TEMPLATES.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTemplate(t.id)}
              style={{
                fontFamily: sans, fontSize: "10px",
                letterSpacing: "0.14em", textTransform: "uppercase",
                padding: "6px 16px",
                background: activeTemplate === t.id ? "#E85D26" : "transparent",
                color: activeTemplate === t.id ? "#fff" : "rgba(255,255,255,0.4)",
                border: `1px solid ${activeTemplate === t.id ? "#E85D26" : "rgba(255,255,255,0.1)"}`,
                cursor: "pointer", borderRadius: "40px",
                transition: "all 0.2s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Color picker + export */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Color swatches */}
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {COLORS.map(c => (
              <button
                key={c}
                onClick={() => setAccentColor(c)}
                style={{
                  width: accentColor === c ? "20px" : "14px",
                  height: accentColor === c ? "20px" : "14px",
                  borderRadius: "50%", background: c,
                  border: accentColor === c ? "2px solid #fff" : "2px solid transparent",
                  cursor: "pointer", padding: 0,
                  transition: "all 0.2s", flexShrink: 0,
                }}
              />
            ))}
            {/* Custom color input */}
            <input
              type="color"
              value={accentColor}
              onChange={e => setAccentColor(e.target.value)}
              style={{ width: "20px", height: "20px", borderRadius: "50%", border: "none", cursor: "pointer", background: "none", padding: 0 }}
              title="Custom color"
            />
          </div>

          {/* Export buttons */}
          <button
            onClick={handlePrint}
            style={{
              fontFamily: sans, fontSize: "10px",
              letterSpacing: "0.14em", textTransform: "uppercase",
              padding: "7px 16px", background: "transparent",
              color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.15)",
              cursor: "pointer", borderRadius: "6px",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#fff"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
          >
            Print
          </button>
          <button
            onClick={() => handleDownload(activeTemplate)}
            style={{
              fontFamily: sans, fontSize: "10px",
              letterSpacing: "0.14em", textTransform: "uppercase",
              padding: "7px 16px", background: "#E85D26",
              color: "#fff", border: "none",
              cursor: "pointer", borderRadius: "6px",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* ── MOBILE TAB SWITCHER ── */}
      <div className="flex md:hidden" style={{
        background: "#111", borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "0 24px",
      }}>
        {["form", "preview"].map(tab => (
          <button
            key={tab}
            onClick={() => setMobileTab(tab)}
            style={{
              fontFamily: sans, fontSize: "11px",
              textTransform: "uppercase", letterSpacing: "0.14em",
              padding: "12px 20px", background: "transparent",
              color: mobileTab === tab ? "#E85D26" : "rgba(255,255,255,0.35)",
              border: "none", cursor: "pointer",
              borderBottom: mobileTab === tab ? "2px solid #E85D26" : "2px solid transparent",
              transition: "all 0.2s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── MAIN SPLIT LAYOUT ── */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}
        className="!grid-cols-1 md:!grid-cols-2"
      >
        {/* Form */}
        <div
          className={mobileTab === "form" ? "block" : "hidden md:block"}
          style={{ borderRight: "1px solid rgba(255,255,255,0.06)", overflowY: "auto", height: "calc(100vh - 60px)" }}
        >
          <FormPanel />
        </div>

        {/* Preview */}
        <div
          className={mobileTab === "preview" ? "block" : "hidden md:block"}
          style={{ overflowY: "auto", height: "calc(100vh - 60px)", background: "#141414" }}
        >
          <PreviewPanel />
        </div>
      </div>

      {/* ── PRINT STYLES ── */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #cv-preview, #cv-preview * { visibility: visible; }
          #cv-preview {
            position: fixed;
            top: 0; left: 0;
            width: 210mm;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}

