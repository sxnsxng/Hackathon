import { useState } from "react";
import type { EndingData } from "../data/endings.data";

interface GalleryCardProps {
  ending: EndingData;
  isUnlocked: boolean;
  onClick: () => void;
  imageSrc: string;
}

export default function GalleryCard({ ending, isUnlocked, onClick, imageSrc }: GalleryCardProps) {
  const [hovered, setHovered] = useState(false);

  if (!isUnlocked) {
    return <div className="bg-white/15 rounded-xl aspect-4/3" />;
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-xl aspect-4/3 overflow-hidden cursor-pointer transition-transform duration-150"
      style={{
        transform: hovered ? "scale(1.04)" : "scale(1)",
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.6)" : "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      <img src={imageSrc} alt={ending.nameEn} className="w-full h-full object-cover block" />

      <div className={`absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/75 to-transparent pt-3 pb-2 px-2.5 transition-opacity duration-150 ${hovered ? "opacity-100" : "opacity-0"}`}>
        <p className="text-white font-sans text-[11px] font-bold tracking-[0.08em] uppercase text-center m-0">
          {ending.nameEn}
        </p>
      </div>
    </div>
  );
}
