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
    return (
      <div
        style={{
          background: "rgba(200,200,200,0.15)",
          borderRadius: 10,
          aspectRatio: "4/3",
        }}
      />
    );
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 10,
        aspectRatio: "4/3",
        overflow: "hidden",
        cursor: "pointer",
        transform: hovered ? "scale(1.04)" : "scale(1)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.6)" : "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      <img
        src={imageSrc}
        alt={ending.nameEn}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}