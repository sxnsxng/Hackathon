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

export default function GameEndingModal({ ending, score, survived, userId, imageSrc, onClose, onSaved }: Props) {
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

  const saveBtnClass = saveState === "saved"
    ? "bg-[rgba(126,207,142,0.15)] border border-[rgba(126,207,142,0.5)] text-[#7ecf8e]"
    : saveState === "error"
    ? "bg-[rgba(224,112,112,0.15)] border border-[rgba(224,112,112,0.5)] text-[#e07070]"
    : "bg-white/90 border-0 text-[#111]";

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/65 z-[200]" />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] bg-[rgba(14,11,8,0.97)] backdrop-blur-md border border-white/10 rounded-2xl z-[201] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-3.5 pb-3 border-b border-white/10">
          <div className="flex items-center gap-4">
            <span className={`font-sans font-bold text-[13px] tracking-[0.08em] ${survived ? "text-[#7ecf8e]" : "text-[#e07070]"}`}>
              {survived ? "SUCCESS!! YOU CAN SURVIVE" : "NOT SUCCESS?! YOU CAN'T SURVIVE"}
            </span>
            {survived && (
              <span className="font-sans text-xs text-white/45 tracking-[0.06em]">SCORE : {score} PT</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="bg-transparent border-none text-white/40 text-2xl cursor-pointer leading-none p-0 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>

        {/* Image */}
        <div className="flex justify-center px-4 pt-5">
          <img src={imageSrc} alt={ending.nameEn} className="w-full max-h-[280px] object-cover rounded-lg block" />
        </div>

        {/* Name + Description */}
        <div className="px-6 pt-4 pb-2 text-center">
          <h3 className="font-sans text-[13px] font-bold text-white tracking-[0.14em] m-0 mb-3">
            - {ending.nameEn.toUpperCase()} -
          </h3>
          <p className="font-sans text-[11px] text-white/65 leading-[1.85] uppercase tracking-[0.04em] m-0">
            {ending.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-4 pb-4 pt-3 gap-2">
          <button
            onClick={handleSave}
            disabled={saveState !== "idle"}
            className={`${saveBtnClass} rounded-lg px-5 py-2 font-sans font-bold text-xs tracking-[0.06em] cursor-pointer transition-all duration-200`}
          >
            {saveState === "idle"   && "Save Ending"}
            {saveState === "saving" && "Saving..."}
            {saveState === "saved"  && "Saved ✓"}
            {saveState === "error"  && "Error — retry?"}
          </button>
          {saveState === "error" && (
            <button
              onClick={() => setSaveState("idle")}
              className="bg-transparent border border-white/15 rounded-lg px-3.5 py-2 font-sans text-xs text-white/50 cursor-pointer"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </>
  );
}
