import { useState } from "react";
import { ALL_ENDINGS, type EndingData } from "../data/endings.data";
import GalleryCard from "../components/GalleryCard";
import EndingDetail from "../components/EndingDetail";
import EndingBoard, { type BoardNode } from "../components/EndingBoard";
import deleteIcon from "../../../assets/DeleteEnding.png";
import { deleteUnlockedEnding } from "../api/endinggalleryapi";

// ── image glob (เดิม) ─────────────────────────────────────────────────────────
const imageModules = import.meta.glob(
  "../../../assets/endinggallery/*",
  { eager: true }
) as Record<string, { default: string }>;

const galleryImages: Record<string, string> = {};
for (const path in imageModules) {
  const filename = path.split("/").pop()!;
  galleryImages[filename] = imageModules[path].default;
}

// ── types ─────────────────────────────────────────────────────────────────────
interface EndingGalleryPageProps {
  onClose:      () => void;
  unlockedIds?: string[];
  userId?:      string;
  onDelete?:    (endingId: string) => void;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function EndingGalleryPage({
  onClose,
  unlockedIds = [],
  userId,
  onDelete,
}: EndingGalleryPageProps) {
  const [selected, setSelected] = useState<EndingData | null>(null);

  const handleDelete = async () => {
    if (!selected || !userId) return;
    try {
      await deleteUnlockedEnding(userId, selected.id);
      onDelete?.(selected.id);
      setSelected(null);
    } catch {
      alert("ลบไม่สำเร็จ กรุณาลองใหม่");
    }
  };

  // Board state follow each ending ID
  const [boardMap, setBoardMap] = useState<Record<string, BoardNode[]>>({});

  const currentNodes = selected ? (boardMap[selected.id] ?? []) : [];

  const handleAddNode = (label: string) => {
    if (!selected) return;
    const id = selected.id;
    setBoardMap((prev) => ({
      ...prev,
      [id]: [...(prev[id] ?? []), { id: `n${Date.now()}`, label, createdAt: new Date().toISOString() }],
    }));
  };

  const handleDeleteNode = (nodeId: string) => {
    if (!selected) return;
    const id = selected.id;
    setBoardMap((prev) => ({
      ...prev,
      [id]: (prev[id] ?? []).filter((n) => n.id !== nodeId),
    }));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset:    0,
          background: "rgba(0,0,0,0.55)",
          zIndex:   100,
        }}
      />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position:        "fixed",
          top:             "50%",
          left:            "50%",
          transform:       "translate(-50%, -50%)",
          background:      "rgba(16,12,9,0.97)",
          backdropFilter:  "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border:          "1px solid rgba(255,255,255,0.1)",
          borderRadius:    16,
          width:           900,
          maxHeight:       "78vh",
          display:         "flex",
          flexDirection:   "column",
          zIndex:          101,
          overflow:        "hidden",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "space-between",
            padding:         "18px 26px 0",
            flexShrink:      0,
          }}
        >
          <h2 style={{
            fontFamily:    "sans-serif",
            fontSize:      17,
            fontWeight:    "bold",
            color:         "#fff",
            letterSpacing: "0.14em",
            margin:        0,
          }}>
            ENDING GALLERY
          </h2>
          <button
            onClick={onClose}
            style={{
              background:  "transparent",
              border:      "none",
              color:       "rgba(255,255,255,0.4)",
              fontSize:    24,
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


{/* ── Content ── */}
        {selected ? (
          <div style={{ overflowY: "auto", flex: 1 }}>
            <EndingDetail
              ending={selected}
              onBack={() => setSelected(null)}
              imageSrc={galleryImages[selected.imageFile]}
            />
            <div style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              padding: "20px 46px 26px",
            }}>
              <p style={{
                fontFamily: "sans-serif",
                fontSize: 20,
                color: "#ffffff",
                letterSpacing: "0.14em",
                marginBottom: 14,
              }}>
                ENDING BOARD
              </p>
              <EndingBoard
                nodes={currentNodes}
                onAdd={handleAddNode}
                onDelete={handleDeleteNode}
              />

              {/* ── Delete button ── */}
              {userId && unlockedIds.includes(selected.id) && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
                  <button
                    onClick={handleDelete}
                    title="Delete this ending"
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: 4,
                      opacity: 0.7,
                      transition: "opacity 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
                  >
                    <img src={deleteIcon} alt="Delete ending" style={{ width: 22, height: 22 }} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{
            overflowY:           "auto",
            padding:             "20px 26px 26px",
            display:             "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap:                 14,
          }}>
            {ALL_ENDINGS.map((ending) => (
              <GalleryCard
                key={ending.id}
                ending={ending}
                isUnlocked={unlockedIds.includes(ending.id)}
                onClick={() => setSelected(ending)}
                imageSrc={galleryImages[ending.imageFile]}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
