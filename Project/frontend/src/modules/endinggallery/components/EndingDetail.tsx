import type { EndingData } from "../data/endings.data";

interface EndingDetailProps {
  ending: EndingData;
  onBack: () => void;
  imageSrc: string;
}

export default function EndingDetail({ ending, onBack, imageSrc }: EndingDetailProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        padding: "16px 20px 20px",
        minHeight: 200,
        alignItems: "flex-start",
      }}
    >
      {/* Pic Ending Card */}
      <div
        style={{
          width: "42%",
          flexShrink: 0,
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        <img
          src={imageSrc}
          alt={ending.nameEn}
          style={{ width: "100%", display: "block", objectFit: "cover" }}
        />
      </div>

      {/* Detail pic */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          paddingTop: 4,
        }}
      >
        {/* Back button */}
        <button
          onClick={onBack}
          title="Back to gallery"
          style={{
            position: "absolute",
            top: 0,
            right: 20,
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.45)",
            fontSize: 18,
            cursor: "pointer",
            lineHeight: 1,
            padding: 0,
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
        >
          ↩
        </button>

        {/* ending name */}
        <h3
          style={{
            fontFamily: "sans-serif",
            fontSize: 15,
            fontWeight: "bold",
            color: "#fff",
            letterSpacing: "0.15em",
            textAlign: "center",
            margin: "16px 0 12px",
          }}
        >
          - {ending.nameEn.toUpperCase()} -
        </h3>

        {/* detail ending */}
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: 13,
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.9,
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          {ending.description}
        </p>
      </div>
    </div>
  );
}