import React from "react"
import { useNavigate } from "react-router-dom"
import { useGameStore } from "../data/GameStore"
import { resolveEnding } from "../../endinggallery/types/endingChecker"
import { ALL_ENDINGS } from "../../endinggallery/data/endings.data"
import { unlockEnding } from "../../endinggallery/api/endinggalleryapi"
import bg from "../../../assets/BG.png"

const Result: React.FC = () => {
  const navigate = useNavigate()
  const { stats, score, role, resetGame, addToLifetimeScore } = useGameStore()

  const statBonus = stats.supplies + stats.safety + stats.population + stats.morale
  const totalScore = score + statBonus

  const gameStats = {
    food:   stats.supplies,
    safety: stats.safety,
    people: stats.population,
    morale: stats.morale,
  }

  const survived = !Object.values(gameStats).some((v) => v === 0)
  const endingId  = resolveEnding(gameStats, survived)
  const ending    = ALL_ENDINGS.find((e) => e.id === endingId) ?? ALL_ENDINGS[0]

  const handleSaveAndReturn = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
    if (!currentUser.id) {
      alert("Please log in to save your ending.")
      return
    }
    try {
      const res = await fetch("/api/gameplay/ending", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId:    currentUser.id,
          endingId:  ending.id,
          endingName: ending.nameEn,
          isSuccess: ending.isSuccess,
          score:     totalScore,
          roleId:    role?.id ?? "unknown",
          playedAt:  new Date().toISOString(),
        }),
      })
      if (!res.ok) throw new Error("Server error")
      await unlockEnding(String(currentUser.id), ending.id)
    } catch {
      // ไม่ block การกลับหน้าแรก แม้ save ไม่สำเร็จ
    }
    addToLifetimeScore(totalScore)
    resetGame()
    navigate("/")
  }

  const handleClose = () => {
    addToLifetimeScore(totalScore)
    resetGame()
    navigate("/")
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="relative z-10 w-[75%] bg-[#000000]/85 border border-[#8A8A8A] rounded-xl flex flex-col overflow-hidden shadow-2xl">

        {/* Title bar */}
        <div className="flex items-center justify-between px-8 pt-4 pb-3 border-b border-[#8a8a8a] shrink-0">
          <span className="text-white font-mono text-xl font-bold tracking-wide uppercase">
            {ending.isSuccess ? "SUCCESS!! YOU CAN SURVIVE" : "NOT SUCCESS?! YOU CAN'T SURVIVE"}
          </span>
          <button
            onClick={handleClose}
            className="text-[#8A8A8A] hover:text-white font-mono text-lg leading-none transition-colors pr-4"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col items-center gap-5 px-8 py-6">

          {/* Ending image */}
          <div className="w-full max-w-lg rounded-xl overflow-hidden border border-[#8A8A8A]">
            <img
              src={`/src/modules/Gameplay/assets/endings/${ending.imageFile}`}
              alt={ending.nameEn}
              className="w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none"
              }}
            />
          </div>

          {/* Ending name */}
          <p className="text-white font-mono font-bold text-xl tracking-[0.2em] uppercase text-center">
            - {ending.nameEn.toUpperCase()} -
          </p>

          {/* Description */}
          <p className="text-white font-mono text-sm tracking-wide uppercase text-center leading-relaxed max-w-2xl">
            {ending.description.toUpperCase()}
          </p>

          {/* Stats summary */}
          <div className="flex gap-6 border-t border-[#8A8A8A] pt-4 w-full justify-center">
            {(["supplies","safety","population","morale"] as const).map((key) => (
              <div key={key} className="flex flex-col items-center gap-1">
                <span className="text-[#8A8A8A] font-mono text-[10px] tracking-widest uppercase">
                  {key === "supplies" ? "FOOD" : key === "population" ? "PEOPLE" : key.toUpperCase()}
                </span>
                <span className={`font-mono font-bold text-lg ${stats[key] === 0 ? "text-red-400" : "text-white"}`}>
                  {stats[key]}
                </span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-1 border-l border-[#8A8A8A] pl-6">
              <span className="text-[#8A8A8A] font-mono text-[10px] tracking-widest uppercase">TOTAL SCORE</span>
              <span className="font-mono font-bold text-lg text-amber-400">{totalScore} PT</span>
            </div>
          </div>

          {/* Save Ending button */}
          <div className="flex justify-end w-full pb-2">
            <button
              onClick={handleSaveAndReturn}
              className="font-mono font-bold text-sm tracking-wide px-6 py-2 rounded-xl bg-white text-black hover:-translate-y-0.5 transition-all duration-200"
            >
              Save Ending
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Result
