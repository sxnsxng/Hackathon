import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";

export interface BoardNode {
  id: string;
  label: string;
  createdAt: string;
}

interface Props {
  nodes: BoardNode[];
  onAdd: (label: string) => void;
  onDelete: (id: string) => void;
}

const BOX_H = 40;
const GAP   = 28;

export default function EndingBoard({ nodes, onAdd, onDelete }: Props) {
  const [input, setInput]   = useState("");
  const boardRef            = useRef<HTMLDivElement>(null);
  const prevLen             = useRef(0);

  // ── animate new node when nodes create ────────────────────────────────────
  useEffect(() => {
    if (nodes.length > prevLen.current && boardRef.current) {
      const boxes = boardRef.current.querySelectorAll<HTMLElement>(".board-node");
      const newest = boxes[boxes.length - 1];
      if (newest) {
        animate(newest, {
          opacity:    [0, 1],
          translateY: [-18, 0],
          duration:   420,
          ease:       "outExpo",
        });
      }
    }
    prevLen.current = nodes.length;
  }, [nodes.length]);

  // ── animate SVG lines when mount / nodes changes ─────────────────────────
  useEffect(() => {
    if (!boardRef.current) return;
    const lines = boardRef.current.querySelectorAll<SVGLineElement>(".conn-line");
    if (!lines.length) return;
    animate(lines, {
      strokeDashoffset: [100, 0],
      duration: 480,
      delay:    stagger(70),
      ease:     "outQuad",
    });
  }, [nodes.length]);

  const handleAdd = () => {
    if (!input.trim()) return;
    onAdd(input.trim());
    setInput("");
  };

  const handleDelete = async (id: string) => {
    const el = boardRef.current?.querySelector<HTMLElement>(`[data-id="${id}"]`);
    if (el) {
      await animate(el, {
        opacity:    [1, 0],
        translateX: [0, 16],
        duration:   240,
        ease:       "inQuad",
      }).finished;
    }
    onDelete(id);
  };

  const svgH =
    nodes.length > 1
      ? (nodes.length - 1) * (BOX_H + GAP) + BOX_H
      : nodes.length * BOX_H;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>

      {/* ── Board canvas ───────────────────────────────────────────────────── */}
      <div
        ref={boardRef}
        style={{
          background: "rgba(255,255,255,0.015)",
          border:     "1px solid rgba(255,255,255,0.08)",
          borderRadius: 12,
          padding:    "14px 14px",
          minHeight:  80,
          position:   "relative",
        }}
      >
        {nodes.length === 0 ? (
          <p style={{
            fontFamily: "sans-serif",
            fontSize:   12,
            color:      "#8a8a8a",
            textAlign:  "center",
            padding:    "12px 0",
          }}>
            No entries yet
          </p>
        ) : (
          <div style={{ position: "relative", width: 280, margin: "0 auto" }}>

            {/* SVG lines ── เline between box */}
            <svg
              width={280}
              height={svgH}
              style={{
                position:      "absolute",
                top:           0,
                left:          0,
                pointerEvents: "none",
                overflow:      "visible",
              }}
            >
              {nodes.slice(0, -1).map((_, i) => {
                const y1 = i * (BOX_H + GAP) + BOX_H;
                const y2 = (i + 1) * (BOX_H + GAP);
                return (
                  <line
                    key={i}
                    className="conn-line"
                    x1={140} y1={y1}
                    x2={140} y2={y2}
                    stroke="rgba(212,180,118,0.35)"
                    strokeWidth={1.5}
                    strokeDasharray="5 4"
                    strokeDashoffset={100}
                  />
                );
              })}
            </svg>

            {/* Boxes */}
            <div style={{
              display:       "flex",
              flexDirection: "column",
              gap:           GAP,
              position:      "relative",
              zIndex:        1,
            }}>
              {nodes.map((node) => (
                <div
                  key={node.id}
                  className="board-node"
                  data-id={node.id}
                  style={{
                    minHeight:     BOX_H,
                    background: "rgba(250,250,250,0.07)",
                    border:     "1px solid rgba(212,180,118,0.28)",
                    borderRadius: 8,
                    display:    "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding:    "0 8px",
                    gap:        8,
                  }}
                >
                  <span style={{
                    fontFamily:   "sans-serif",
                    fontSize:     12,
                    color:        "#ffffff",
                    flex:         1,
                    padding: "2px 6px",
                    overflow:     "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace:   "nowrap",
                  }}>
                    {node.label}
                  </span>
                  <button
                    onClick={() => handleDelete(node.id)}
                    title="Delete"
                    style={{
                      background:  "none",
                      border:      "none",
                      cursor:      "pointer",
                      color:       "rgba(255,100,100,0.45)",
                      fontSize:    13,
                      fontStyle:   "bold",
                      padding:     "2px 4px",
                      lineHeight:  1,
                      flexShrink:  0,
                      transition:  "color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,100,100,0.85)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,100,100,0.45)")}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Create box input ───────────────────────────────────────────────── */}
      <div style={{ marginTop: 8 }}>
        <p style={{
          padding:       "8px 10px",
          fontFamily:    "sans-serif",
          fontSize:      10,
          color:         "#9a9a9a",
          letterSpacing: "0.12em",
          marginBottom:  4,
        }}>
          CREATE BOX
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Ex. Day1 I help Juleit"
            maxLength={60}
            style={{
              flex:         1,
              background:   "rgba(255,255,255,0.05)",
              border:       "1px solid rgba(255,255,255,0.13)",
              borderRadius: 8,
              padding:      "8px 12px",
              color:        "#fff",
              fontFamily:   "sans-serif",
              fontSize:     12,
              outline:      "none",
            }}
          />
          <button
            onClick={handleAdd}
            disabled={!input.trim()}
            style={{
              background:   input.trim() ? "#fff" : "rgba(255,255,255,0.15)",
              color:        "#000",
              border:       "none",
              borderRadius: 8,
              padding:      "8px 20px",
              fontFamily:   "sans-serif",
              fontSize:     12,
              cursor:       input.trim() ? "pointer" : "not-allowed",
              whiteSpace:   "nowrap",
              transition:   "background 0.15s",
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
