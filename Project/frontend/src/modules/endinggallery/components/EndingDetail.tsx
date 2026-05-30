import type { EndingData } from "../data/endings.data";

interface EndingDetailProps {
  ending: EndingData;
  onBack: () => void;
  imageSrc: string;
}

export default function EndingDetail({ ending, onBack, imageSrc }: EndingDetailProps) {
  return (
    <div className="relative flex flex-col items-center gap-4 px-6 pt-6 pb-4">

      {/* Back button — top right */}
      <button
        onClick={onBack}
        title="Back to gallery"
        className="absolute top-4 right-6 bg-transparent border-none text-white/50 text-xl cursor-pointer leading-none p-0 hover:text-white transition-colors"
      >
        ↩
      </button>

      {/* Image */}
      <div className="w-[55%] max-w-[480px] rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
        <img
          src={imageSrc}
          alt={ending.nameEn}
          className="w-full block object-cover"
        />
      </div>

      {/* Title */}
      <h3 className="font-sans text-[15px] font-bold text-white tracking-[0.15em] text-center">
        - {ending.nameEn.toUpperCase()} -
      </h3>

      {/* Description */}
      <p className="font-sans text-sm text-white/70 leading-[1.9] text-center uppercase tracking-[0.04em] max-w-[680px]">
        {ending.description}
      </p>

    </div>
  );
}