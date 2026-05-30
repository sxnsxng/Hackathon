import { useState, useCallback } from "react";
import { ALL_ENDINGS, type EndingData } from "../data/endings.data";
import GalleryCard from "../components/GalleryCard";
import EndingDetail from "../components/EndingDetail";
import EndingBoard, { type BoardNode, type BoardEdge } from "../components/EndingBoard";
import deleteIcon from "../../../assets/DeleteEnding.png";
import { deleteUnlockedEnding } from "../api/endinggalleryapi";
import bg from "../../../assets/BG.png";

const imageModules = import.meta.glob(
  "../../../assets/endinggallery/*",
  { eager: true }
) as Record<string, { default: string }>;

const galleryImages: Record<string, string> = {};
for (const path in imageModules) {
  const filename = path.split("/").pop()!;
  galleryImages[filename] = imageModules[path].default;
}

// ─── localStorage helpers ─────────────────────────────────────────────────────

interface BoardState {
  nodes: BoardNode[];
  edges: BoardEdge[];
}

const STORAGE_KEY = "endingBoardMap_v2";

function loadBoardMap(): Record<string, BoardState> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveBoardMap(map: Record<string, BoardState>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

// ─── ID generator ─────────────────────────────────────────────────────────────

let _seq = 0;
function uid() {
  return `${Date.now()}-${++_seq}`;
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface EndingGalleryPageProps {
  onClose:      () => void;
  unlockedIds?: string[];
  userId?:      string;
  onDelete?:    (endingId: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function EndingGalleryPage({
  onClose,
  unlockedIds = [],
  userId,
  onDelete,
}: EndingGalleryPageProps) {
  const [selected, setSelected]   = useState<EndingData | null>(null);
  const [boardMap, setBoardMap]   = useState<Record<string, BoardState>>(loadBoardMap);

  // ── Helpers ────────────────────────────────────────────────────────────────

  const getBoard = (endingId: string): BoardState =>
    boardMap[endingId] ?? { nodes: [], edges: [] };

  const updateBoard = useCallback((endingId: string, next: BoardState) => {
    setBoardMap((prev) => {
      const updated = { ...prev, [endingId]: next };
      saveBoardMap(updated);
      return updated;
    });
  }, []);

  // ── Delete ending ──────────────────────────────────────────────────────────

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

  // ── Board handlers (forwarded to EndingBoard) ──────────────────────────────

  const handleAddNode = useCallback((text: string, x: number, y: number) => {
    if (!selected) return;
    const board = getBoard(selected.id);
    updateBoard(selected.id, {
      ...board,
      nodes: [...board.nodes, { id: uid(), text, x, y }],
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, boardMap, updateBoard]);

  const handleDeleteNode = useCallback((nodeId: string) => {
    if (!selected) return;
    const board = getBoard(selected.id);
    updateBoard(selected.id, {
      nodes: board.nodes.filter((n) => n.id !== nodeId),
      // Also remove edges connected to this node
      edges: board.edges.filter(
        (e) => e.fromNodeId !== nodeId && e.toNodeId !== nodeId
      ),
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, boardMap, updateBoard]);

  const handleMoveNode = useCallback((nodeId: string, x: number, y: number) => {
    if (!selected) return;
    const board = getBoard(selected.id);
    updateBoard(selected.id, {
      ...board,
      nodes: board.nodes.map((n) => (n.id === nodeId ? { ...n, x, y } : n)),
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, boardMap, updateBoard]);

  const handleAddEdge = useCallback((fromNodeId: string, toNodeId: string) => {
    if (!selected) return;
    const board = getBoard(selected.id);
    const exists = board.edges.some(
      (e) => e.fromNodeId === fromNodeId && e.toNodeId === toNodeId
    );
    if (exists) return;
    updateBoard(selected.id, {
      ...board,
      edges: [...board.edges, { id: uid(), fromNodeId, toNodeId }],
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, boardMap, updateBoard]);

  const handleDeleteEdge = useCallback((edgeId: string) => {
    if (!selected) return;
    const board = getBoard(selected.id);
    updateBoard(selected.id, {
      ...board,
      edges: board.edges.filter((e) => e.id !== edgeId),
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, boardMap, updateBoard]);

  // ─── Render ───────────────────────────────────────────────────────────────

  const currentBoard = selected ? getBoard(selected.id) : { nodes: [], edges: [] };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="relative z-10 w-[75%] h-[90%] bg-[#000000]/85 border border-[#8A8A8A] rounded-xl flex flex-col overflow-hidden shadow-2xl">

        {/* Title bar */}
        <div className="flex items-center justify-between px-8 pt-4 pb-3 border-b border-[#8a8a8a] shrink-0">
          <span className="text-white font-mono text-xl font-bold tracking-wide">
            {selected ? selected.nameEn.toUpperCase() : "ENDING GALLERY"}
          </span>
          <button
            onClick={onClose}
            className="text-[#8A8A8A] hover:text-white font-mono text-lg leading-none transition-colors pr-4"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        {selected ? (
          <div className="flex-1 overflow-y-auto
            [&::-webkit-scrollbar]:w-1
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-transparent
            hover:[&::-webkit-scrollbar-thumb]:bg-[#696969]"
          >
            <EndingDetail
              ending={selected}
              onBack={() => setSelected(null)}
              imageSrc={galleryImages[selected.imageFile]}
            />

            {/* Ending Board section */}
            <div className="border-t border-[#8a8a8a] px-10 py-6">
              <p className="text-white font-mono font-bold text-sm tracking-[0.14em] uppercase mb-4">
                ENDING BOARD
              </p>
              <EndingBoard
                nodes={currentBoard.nodes}
                edges={currentBoard.edges}
                onAddNode={handleAddNode}
                onDeleteNode={handleDeleteNode}
                onMoveNode={handleMoveNode}
                onAddEdge={handleAddEdge}
                onDeleteEdge={handleDeleteEdge}
              />

              {userId && unlockedIds.includes(selected.id) && (
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleDelete}
                    title="Delete this ending"
                    style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4, opacity: 0.7, transition: "opacity 0.15s" }}
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
          <div className="flex-1 overflow-y-auto px-8 py-6
            [&::-webkit-scrollbar]:w-1
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-transparent
            hover:[&::-webkit-scrollbar-thumb]:bg-[#696969]"
          >
            <div className="grid grid-cols-3 gap-4">
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
          </div>
        )}

      </div>
    </div>
  );
}