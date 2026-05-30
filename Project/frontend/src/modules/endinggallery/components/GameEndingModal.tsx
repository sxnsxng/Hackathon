import { useState } from "react";
import type { EndingData } from "../data/endings.data";
import { unlockEnding } from "../api/endinggalleryapi";

interface Props {
  ending: EndingData;
  score: number;
  survived: boolean;
  userId: string;
  imageSrc: string;
  onClose: () => void;
  onSaved?: (endingId: string) => void;
}

type SaveState = "idle" | "saving" | "saved" | "error";

export default function GameEndingModal({
  ending,
  score,
  survived,
  userId,
  imageSrc,
  onClose,
  onSaved,
}: Props) {
  const [saveState, setSaveState] = useState<SaveState>("idle");

  const handleSave = async () => {
    if (saveState !== "idle") return;
    setSaveState("saving");
    try {
      await unlockEnding(userId, ending.id);
      setSaveState("saved");
      onSaved?.(ending.id);
    } catch {
      setSaveState("error");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position:   "fixed",
          inset:      0,
          background: "rgba(0,0,0,0.65)",
          zIndex:     200,
        }}
      />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position:       "fixed",
          top:            "50%",
          left:           "50%",
          transform:      "translate(-50%, -50%)",
          width:          540,
          background:     "rgba(14,11,8,0.97)",
          backdropFilter: "blur(16px)",
          border:         "1px solid rgba(255,255,255,0.1)",
          borderRadius:   14,
          zIndex:         201,
          overflow:       "hidden",
        }}
      >
        {/* ── Header ── */}
        <div style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          padding:        "14px 18px 12px",
          borderBottom:   "1px solid rgba(255,255,255,0.08)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{
              fontFamily:    "sans-serif",
              fontWeight:    "bold",
              fontSize:      13,
              letterSpacing: "0.08em",
              color:         survived ? "#7ecf8e" : "#e07070",
            }}>
              {survived ? "SUCCESS!! YOU CAN SURVIVE" : "NOT SUCCESS?! YOU CAN'T SURVIVE"}
            </span>
            {survived && (
              <span style={{
                fontFamily:    "sans-serif",
                fontSize:      12,
                color:         "rgba(255,255,255,0.45)",
                letterSpacing: "0.06em",
              }}>
                SCORE : {score} PT
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              background:  "transparent",
              border:      "none",
              color:       "rgba(255,255,255,0.4)",
              fontSize:    22,
              cursor:      "pointer",
              lineHeight:  1,
              padding:     0,
              transition:  "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            ×
          </button>
        </div>

        {/* ── Image ── */}
        <div style={{ display: "flex", justifyContent: "center", padding: "20px 18px 0" }}>
          <img
            src={imageSrc}
            alt={ending.nameEn}
            style={{
              width:        "100%",
              maxHeight:    280,
              objectFit:    "cover",
              borderRadius: 8,
              display:      "block",
            }}
          />
        </div>

        {/* ── Name + Description ── */}
        <div style={{ padding: "18px 24px 8px", textAlign: "center" }}>
          <h3 style={{
            fontFamily:    "sans-serif",
            fontSize:      13,
            fontWeight:    "bold",
            color:         "#fff",
            letterSpacing: "0.14em",
            margin:        "0 0 12px",
          }}>
            - {ending.nameEn.toUpperCase()} -
          </h3>
          <p style={{
            fontFamily:    "sans-serif",
            fontSize:      11,
            color:         "rgba(255,255,255,0.65)",
            lineHeight:    1.85,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            margin:        0,
          }}>
            {ending.description}
          </p>
        </div>

        {/* ── Footer: Save button ── */}
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "14px 18px 18px" }}>
          <button
            onClick={handleSave}
            disabled={saveState !== "idle"}
            style={{
              background:    saveState === "saved"
                ? "rgba(126,207,142,0.15)"
                : saveState === "error"
                  ? "rgba(224,112,112,0.15)"
                  : "rgba(255,255,255,0.9)",
              border:        saveState === "saved"
                ? "1px solid rgba(126,207,142,0.5)"
                : saveState === "error"
                  ? "1px solid rgba(224,112,112,0.5)"
                  : "none",
              borderRadius:  8,
              padding:       "9px 20px",
              fontFamily:    "sans-serif",
              fontWeight:    "bold",
              fontSize:      12,
              letterSpacing: "0.06em",
              color:         saveState === "saved"
                ? "#7ecf8e"
                : saveState === "error"
                  ? "#e07070"
                  : "#111",
              cursor:        saveState === "idle" ? "pointer" : "default",
              transition:    "all 0.2s",
            }}
          >
            {saveState === "idle"   && "Save Ending"}
            {saveState === "saving" && "Saving..."}
            {saveState === "saved"  && "Saved ✓"}
            {saveState === "error"  && "Error — retry?"}
          </button>
          {saveState === "error" && (
            <button
              onClick={() => setSaveState("idle")}
              style={{
                marginLeft:  8,
                background:  "transparent",
                border:      "1px solid rgba(255,255,255,0.15)",
                borderRadius: 8,
                padding:     "9px 14px",
                fontFamily:  "sans-serif",
                fontSize:    12,
                color:       "rgba(255,255,255,0.5)",
                cursor:      "pointer",
              }}
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </>
  );
}
