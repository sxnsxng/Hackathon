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
  const [input, setInput] = useState("");
  const boardRef          = useRef<HTMLDivElement>(null);
  const prevLen           = useRef(0);

  useEffect(() => {
    if (nodes.length > prevLen.current && boardRef.current) {
      const boxes = boardRef.current.querySelectorAll<HTMLElement>(".board-node");
      const newest = boxes[boxes.length - 1];
      if (newest) animate(newest, { opacity: [0, 1], translateY: [-18, 0], duration: 420, ease: "outExpo" });
    }
    prevLen.current = nodes.length;
  }, [nodes.length]);

  useEffect(() => {
    if (!boardRef.current) return;
    const lines = boardRef.current.querySelectorAll<SVGLineElement>(".conn-line");
    if (!lines.length) return;
    animate(lines, { strokeDashoffset: [100, 0], duration: 480, delay: stagger(70), ease: "outQuad" });
  }, [nodes.length]);

  const handleAdd = () => {
    if (!input.trim()) return;
    onAdd(input.trim());
    setInput("");
  };

  const handleDelete = async (id: string) => {
    const el = boardRef.current?.querySelector<HTMLElement>(`[data-id="${id}"]`);
    if (el) await animate(el, { opacity: [1, 0], translateX: [0, 16], duration: 240, ease: "inQuad" });
    onDelete(id);
  };

  const svgH = nodes.length > 1 ? (nodes.length - 1) * (BOX_H + GAP) + BOX_H : nodes.length * BOX_H;

  return (
    <div className="flex flex-col">

      {/* Board canvas */}
      <div
        ref={boardRef}
        className="bg-white/1.5 border border-white/10 rounded-xl p-3.5 min-h-20 relative"
      >
        {nodes.length === 0 ? (
          <p className="font-sans text-xs text-[#8a8a8a] text-center py-3">No entries yet</p>
        ) : (
          <div className="relative mx-auto" style={{ width: 280 }}>
            {/* SVG connector lines */}
            <svg
              width={280}
              height={svgH}
              className="absolute top-0 left-0 pointer-events-none overflow-visible"
            >
              {nodes.slice(0, -1).map((_, i) => {
                const y1 = i * (BOX_H + GAP) + BOX_H;
                const y2 = (i + 1) * (BOX_H + GAP);
                return (
                  <line
                    key={i}
                    className="conn-line"
                    x1={140} y1={y1} x2={140} y2={y2}
                    stroke="rgba(212,180,118,0.35)"
                    strokeWidth={1.5}
                    strokeDasharray="5 4"
                    strokeDashoffset={100}
                  />
                );
              })}
            </svg>

            {/* Node boxes */}
            <div className="flex flex-col relative z-10" style={{ gap: GAP }}>
              {nodes.map((node) => (
                <div
                  key={node.id}
                  className="board-node flex items-center justify-between px-2 gap-2 bg-white/[0.07] border border-[rgba(212,180,118,0.28)] rounded-lg"
                  data-id={node.id}
                  style={{ minHeight: BOX_H }}
                >
                  <span className="font-sans text-xs text-white flex-1 px-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                    {node.label}
                  </span>
                  <button
                    onClick={() => handleDelete(node.id)}
                    title="Delete"
                    className="bg-none border-none cursor-pointer text-[rgba(255,100,100,0.45)] text-[13px] px-1 py-0.5 leading-none shrink-0 transition-colors hover:text-[rgba(255,100,100,0.85)]"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="mt-2">
        <p className="font-sans text-[10px] text-[#9a9a9a] tracking-[0.12em] px-2.5 py-2 mb-1">CREATE BOX</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Ex. Day1 I help Juleit"
            maxLength={60}
            className="flex-1 bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white font-sans text-xs outline-none"
          />
          <button
            onClick={handleAdd}
            disabled={!input.trim()}
            className={`${input.trim() ? "bg-white cursor-pointer" : "bg-white/15 cursor-not-allowed"} text-black border-none rounded-lg px-5 py-2 font-sans text-xs whitespace-nowrap transition-colors`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
