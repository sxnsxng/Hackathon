import type { EndingData } from "../data/endings.data";

interface EndingDetailProps {
  ending: EndingData;
  onBack: () => void;
  imageSrc: string;
}

export default function EndingDetail({ ending, onBack, imageSrc }: EndingDetailProps) {
  return (
    <div className="flex gap-5 p-4 min-h-50 items-start">
      {/* Image */}
      <div className="w-[42%] shrink-0 rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <img src={imageSrc} alt={ending.nameEn} className="w-full block object-cover" />
      </div>

      {/* Detail */}
      <div className="flex-1 flex flex-col relative pt-1">
        <button
          onClick={onBack}
          title="Back to gallery"
          className="absolute top-0 right-5 bg-transparent border-none text-white/45 text-lg cursor-pointer leading-none p-0 hover:text-white transition-colors"
        >
          ↩
        </button>

        <h3 className="font-sans text-[15px] font-bold text-white tracking-[0.15em] text-center mt-4 mb-3">
          - {ending.nameEn.toUpperCase()} -
        </h3>

        <p className="font-sans text-sm text-white/70 leading-[1.9] text-center uppercase tracking-[0.04em]">
          {ending.description}
        </p>
      </div>
    </div>
  );
}
