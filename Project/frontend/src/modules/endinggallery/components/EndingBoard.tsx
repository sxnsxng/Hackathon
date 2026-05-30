import { useEffect, useRef, useState } from "react";
import { animate, utils } from "animejs";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BoardNode {
  id: string;
  text: string;
  x: number;
  y: number;
}

export interface BoardEdge {
  id: string;
  fromNodeId: string;
  toNodeId: string;
}

interface Props {
  nodes: BoardNode[];
  edges: BoardEdge[];
  onAddNode: (text: string, x: number, y: number) => void;
  onDeleteNode: (id: string) => void;
  onMoveNode: (id: string, x: number, y: number) => void;
  onAddEdge: (fromNodeId: string, toNodeId: string) => void;
  onDeleteEdge: (id: string) => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NODE_W = 148;
const NODE_H = 42;

// ─── Helper ───────────────────────────────────────────────────────────────────

function nodeCenter(node: BoardNode) {
  return { cx: node.x + NODE_W / 2, cy: node.y + NODE_H / 2 };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function EndingBoard({
  nodes = [],
  edges = [],
  onAddNode,
  onDeleteNode,
  onMoveNode,
  onAddEdge,
  onDeleteEdge,
}: Props) {
  const [input, setInput] = useState("");
  const [connectingFromId, setConnectingFromId] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const boardRef    = useRef<HTMLDivElement>(null);
  const tempLineRef = useRef<SVGLineElement>(null);

  // ── Manual drag state ────────────────────────────────────────────────────

  const dragRef = useRef<{
    nodeId: string;
    startX: number;
    startY: number;
    originPx: number;
    originPy: number;
    moved: boolean;
  } | null>(null);

  // ── Pointer events for drag ───────────────────────────────────────────────

  const handleNodePointerDown = (e: React.PointerEvent, nodeId: string) => {
    if (e.button !== 0) return;
    // Don't stopPropagation here — let board's onClick still fire when needed
    e.currentTarget.setPointerCapture(e.pointerId);

    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    dragRef.current = {
      nodeId,
      startX: node.x,
      startY: node.y,
      originPx: e.clientX,
      originPy: e.clientY,
      moved: false,
    };
  };

  const handleNodePointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag) return;

    const board = boardRef.current;
    if (!board) return;

    const dx = e.clientX - drag.originPx;
    const dy = e.clientY - drag.originPy;

    if (!drag.moved && Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
    drag.moved = true;

    const boardRect = board.getBoundingClientRect();
    const newX = Math.max(0, Math.min(boardRect.width  - NODE_W, drag.startX + dx));
    const newY = Math.max(0, Math.min(boardRect.height - NODE_H, drag.startY + dy));

    onMoveNode(drag.nodeId, newX, newY);
  };

  const handleNodePointerUp = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    dragRef.current = null;
    // If it was a real drag (moved), stop propagation so board onClick won't cancel connection
    if (drag?.moved) {
      e.stopPropagation();
    }
    // Click (no move) → let the onClick handler below fire naturally
  };

  // ── Connection logic (via onClick, fires only when not dragging) ──────────

  const handleNodeClick = (e: React.MouseEvent, nodeId: string) => {
    // If we just finished a drag, dragRef is already null but moved=true was handled in pointerUp
    // This onClick only fires when pointer didn't move significantly
    e.stopPropagation();

    if (!connectingFromId) {
      setConnectingFromId(nodeId);
      return;
    }
    if (connectingFromId === nodeId) {
      setConnectingFromId(null);
      return;
    }
    onAddEdge(connectingFromId, nodeId);
    setConnectingFromId(null);
  };

  const handleBoardClick = () => {
    if (connectingFromId) setConnectingFromId(null);
  };

  // ── Cursor tracking for temp line ─────────────────────────────────────────

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    const handleMove = (e: PointerEvent) => {
      const rect = board.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCursorPos({ x, y });

      if (tempLineRef.current && connectingFromId) {
        utils.set(tempLineRef.current, { x2: x, y2: y });
      }
    };

    board.addEventListener("pointermove", handleMove);
    return () => board.removeEventListener("pointermove", handleMove);
  }, [connectingFromId]);

  // ── Add node ──────────────────────────────────────────────────────────────

  const handleAdd = () => {
    if (!input.trim()) return;
    const board = boardRef.current;
    if (!board) return;
    const { width, height } = board.getBoundingClientRect();
    const x = Math.max(0, Math.min(width  - NODE_W, width  / 2 - NODE_W / 2 + (Math.random() - 0.5) * 80));
    const y = Math.max(0, Math.min(height - NODE_H, height / 2 - NODE_H / 2 + (Math.random() - 0.5) * 60));
    onAddNode(input.trim(), x, y);
    setInput("");
  };

  // ── Delete node with exit animation ───────────────────────────────────────

  const handleDeleteNode = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const el = boardRef.current?.querySelector<HTMLElement>(`[data-nodeid="${id}"]`);
    if (el) {
      await animate(el, { opacity: [1, 0], scale: [1, 0.8], duration: 220, ease: "inQuad" });
    }
    onDeleteNode(id);
  };

  // ── Entry animation for new nodes ─────────────────────────────────────────

  const prevNodeCount = useRef(0);
  useEffect(() => {
    if (nodes.length > prevNodeCount.current && boardRef.current) {
      const newest = nodes[nodes.length - 1];
      const el = boardRef.current.querySelector<HTMLElement>(`[data-nodeid="${newest.id}"]`);
      if (el) animate(el, { opacity: [0, 1], scale: [0.75, 1], duration: 360, ease: "outBack(1.4)" });
    }
    prevNodeCount.current = nodes.length;
  }, [nodes]);

  // ── Temp line origin ──────────────────────────────────────────────────────

  const connectingNode = connectingFromId
    ? nodes.find((n) => n.id === connectingFromId)
    : null;

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-3">

      {/* ── Whiteboard ──────────────────────────────────────────────────────── */}
      <div
        ref={boardRef}
        onClick={handleBoardClick}
        className="w-full h-[40vh] md:h-[50vh] relative overflow-hidden border border-white/10 rounded-2xl cursor-default select-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.025) 0%, transparent 70%),
            repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(255,255,255,0.035) 31px, rgba(255,255,255,0.035) 32px),
            repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(255,255,255,0.035) 31px, rgba(255,255,255,0.035) 32px)
          `,
        }}
      >
        {/* ── SVG layer ─────────────────────────────────────────────────────── */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          <defs>
            <marker id="eb-arrow" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="rgba(212,180,118,0.55)" />
            </marker>
            <marker id="eb-arrow-tmp" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="rgba(212,180,118,0.35)" />
            </marker>
          </defs>

          {/* Permanent edges */}
          {edges.map((edge) => {
            const from = nodes.find((n) => n.id === edge.fromNodeId);
            const to   = nodes.find((n) => n.id === edge.toNodeId);
            if (!from || !to) return null;
            const { cx: x1, cy: y1 } = nodeCenter(from);
            const { cx: x2, cy: y2 } = nodeCenter(to);
            const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
            const dx = x2 - x1, dy = y2 - y1;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const curve = Math.min(dist * 0.35, 80);
            const cpx = mx + (-dy / dist) * curve;
            const cpy = my + ( dx / dist) * curve;

            return (
              <g key={edge.id}>
                <path
                  d={`M ${x1} ${y1} Q ${cpx} ${cpy} ${x2} ${y2}`}
                  stroke="rgba(212,180,118,0.45)" strokeWidth={1.5}
                  fill="none" markerEnd="url(#eb-arrow)" strokeDasharray="5 4"
                />
                <path
                  d={`M ${x1} ${y1} Q ${cpx} ${cpy} ${x2} ${y2}`}
                  stroke="transparent" strokeWidth={12} fill="none"
                  className="pointer-events-auto cursor-pointer"
                  onClick={(ev) => { ev.stopPropagation(); onDeleteEdge(edge.id); }}
                >
                  <title>Click to remove connection</title>
                </path>
              </g>
            );
          })}

          {/* Temp line */}
          {connectingNode && (() => {
            const { cx, cy } = nodeCenter(connectingNode);
            return (
              <line
                ref={tempLineRef}
                x1={cx} y1={cy} x2={cursorPos.x} y2={cursorPos.y}
                stroke="rgba(212,180,118,0.4)" strokeWidth={1.5}
                strokeDasharray="6 5" markerEnd="url(#eb-arrow-tmp)"
              />
            );
          })()}
        </svg>

        {/* ── Nodes ─────────────────────────────────────────────────────────── */}
        {nodes.map((node) => {
          const isActive = connectingFromId === node.id;
          const hasSource = connectingFromId !== null;

          return (
            <div
              key={node.id}
              data-nodeid={node.id}
              onPointerDown={(e) => handleNodePointerDown(e, node.id)}
              onPointerMove={handleNodePointerMove}
              onPointerUp={handleNodePointerUp}
              onClick={(e) => handleNodeClick(e, node.id)}
              className={`
                absolute flex items-center gap-1.5 px-2.5
                rounded-xl border font-sans text-[11px]
                transition-shadow duration-150
                cursor-grab active:cursor-grabbing group
                ${isActive
                  ? "border-[rgba(212,180,118,0.9)] shadow-[0_0_12px_2px_rgba(212,180,118,0.3)] bg-white/10"
                  : hasSource
                  ? "border-white/20 bg-white/[0.06] opacity-80 hover:opacity-100 hover:border-[rgba(212,180,118,0.55)]"
                  : "border-white/15 bg-white/[0.07] hover:border-[rgba(212,180,118,0.55)] hover:bg-white/[0.11] hover:shadow-[0_0_8px_1px_rgba(212,180,118,0.15)]"
                }
              `}
              style={{ left: node.x, top: node.y, width: NODE_W, height: NODE_H, zIndex: isActive ? 20 : 10 }}
            >
              <span className={`shrink-0 w-1.5 h-1.5 rounded-full transition-colors duration-150 ${isActive ? "bg-[rgba(212,180,118,0.9)]" : "bg-white/20 group-hover:bg-[rgba(212,180,118,0.5)]"}`} />
              <span className="flex-1 text-white/85 overflow-hidden text-ellipsis whitespace-nowrap">{node.text}</span>
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => handleDeleteNode(e, node.id)}
                className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-[rgba(255,100,100,0.5)] hover:text-[rgba(255,100,100,0.9)] text-[11px] leading-none px-0.5 cursor-pointer"
              >✕</button>
            </div>
          );
        })}

        {/* Empty hint */}
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-white/15 text-[11px] font-sans tracking-widest uppercase">Add a box to begin</span>
          </div>
        )}

        {/* Connection hint */}
        {connectingFromId && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
            <span className="bg-black/60 border border-[rgba(212,180,118,0.35)] text-[rgba(212,180,118,0.9)] text-[10px] font-sans tracking-widest uppercase px-3 py-1.5 rounded-full backdrop-blur-sm">
              Click another box to connect · Click same box to cancel
            </span>
          </div>
        )}
      </div>

      {/* ── Input bar ───────────────────────────────────────────────────────── */}
      <div className="w-[70vw]">
        <p className="font-sans text-[10px] text-[#9a9a9a] tracking-[0.12em] px-0.5 mb-1.5 uppercase">Add Box</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="e.g. Accepted sick family member…"
            maxLength={60}
            className="flex-1 bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white font-sans text-xs placeholder:text-white/25 outline-none focus:border-white/30 transition-colors"
          />
          <button
            onClick={handleAdd}
            disabled={!input.trim()}
            className={`border-none rounded-lg px-5 py-2 font-sans text-xs whitespace-nowrap transition-all duration-150 ${input.trim() ? "bg-white text-black cursor-pointer hover:bg-white/90" : "bg-white/10 text-white/30 cursor-not-allowed"}`}
          >Create</button>
        </div>
      </div>
    </div>
  );
}