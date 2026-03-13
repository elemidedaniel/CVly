import { useCV } from "../../context/CVContext";
import Executive from "../Templates/Executive";
import Modern from "../Templates/Modern";
import Creative from "../Templates/Creative";

const sans = "'Arial', sans-serif";

const templates = {
  executive: Executive,
  modern: Modern,
  creative: Creative,
};

export default function PreviewPanel() {
  const { activeTemplate } = useCV();
  const Template = templates[activeTemplate];

  return (
    <div
      style={{
        background: "#1a1a1a",
        height: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px 24px",
        boxSizing: "border-box",
      }}
    >
      <p style={{
        fontFamily: sans, fontSize: "10px",
        textTransform: "uppercase", letterSpacing: "0.2em",
        color: "rgba(255,255,255,0.2)", margin: "0 0 24px",
      }}>
        Live Preview
      </p>

      {/* CV scaled to fit panel */}
      <div
        style={{
          transform: "scale(0.72)",
          transformOrigin: "top center",
          marginBottom: "-200px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
        }}
      >
        <Template />
      </div>
    </div>
  );
}