import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGameStore } from "../data/GameStore"
import { questionsCampLeader } from "../data/Question/questionsCampLeader"
import { questionsFoodManager } from "../data/Question/questionsFoodManager"
import { questionsMaintenanceManager } from "../data/Question/questionsMaintenanceManager"
import { questionsResourceManager } from "../data/Question/questionsResourceManager"
import { questionsSafetyManager } from "../data/Question/questionsSafetyManager"
import type { Question, Choice } from "../data/Question/question"
import bg from "../../../assets/BG.png"

const QUESTION_MAP: Record<string, Question[]> = {
  "camp-leader":         questionsCampLeader,
  "food-manager":        questionsFoodManager,
  "maintenance-manager": questionsMaintenanceManager,
  "resource-manager":    questionsResourceManager,
  "safety-manager":      questionsSafetyManager,
}

const Gameplay: React.FC = () => {
  const navigate = useNavigate()
  const { role, day, score, stats, sessionId, applyChoice, nextDay, isGameOver, resetGame } = useGameStore()
  const [chosen, setChosen] = useState<string | null>(null)

  // ✅ กรณี refresh หน้า — role หาย → กลับไปเลือก role ใหม่
  if (!role) {
    navigate("/SelectRole")
    return null
  }

  if (isGameOver) {
    navigate("/Result")
    return null
  }

  const pool = QUESTION_MAP[role.id] ?? []
  const question: Question | undefined = pool.find((q) => q.day === day)

  const handleChoice = (choice: Choice) => {
    if (chosen) return
    setChosen(choice.id)
    applyChoice(choice.statDelta, 10)
  }

  const handleNext = () => {
    setChosen(null)
    if (day >= 7) {
      navigate("/Result")
    } else {
      nextDay()
    }
  }

  // ✅ DELETE session + จัดการ error ทุกกรณี
  const handleClose = async () => {
    if (sessionId) {
      try {
        const res = await fetch(`/api/game/session/${sessionId}`, {
          method: "DELETE",
        })

        if (!res.ok) {
          // session ไม่มีใน DB แล้ว (เช่น refresh มาก่อน) → ไม่ต้อง block
          console.warn("[handleClose] session not found or already deleted")
        }
      } catch (err) {
        // network error → ไม่ block การออก
        console.error("[handleClose] failed to delete session:", err)
      }
    }

    resetGame()   // ล้าง state ทั้งหมด
    navigate("/")
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="relative z-10 w-[75%] h-[90%] bg-[#000000]/85 border border-[#8A8A8A] rounded-xl flex flex-col overflow-hidden shadow-2xl">

        {/* Title bar */}
        <div className="flex items-center justify-between px-4 md:px-8 pt-4 pb-3 border-b border-[#8a8a8a] shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-white font-mono text-xl font-bold tracking-wide">
              DAYS {day} — {role.lines.join(" ")}
            </span>
            <span className="text-[#8A8A8A] font-mono text-sm">
              SCORE : {score} PT
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-[#8A8A8A] hover:text-white font-mono text-lg leading-none transition-colors pr-4"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 px-4 md:px-8 py-4 md:py-6 flex-1 overflow-y-auto
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-transparent
          hover:[&::-webkit-scrollbar-thumb]:bg-[#696969]"
        >
          {/* Question + Status: side-by-side on desktop, stacked on mobile */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Question */}
            <div className="flex-1 border border-[#8A8A8A] rounded-xl px-6 py-5 flex items-center min-h-30">
              {question ? (
                <p className="text-white font-mono font-bold text-sm tracking-wide uppercase leading-relaxed">
                  {question.scenario}
                </p>
              ) : (
                <p className="text-[#555] font-mono text-sm italic">No question found for day {day}.</p>
              )}
            </div>

            {/* Status */}
            <div className="md:w-65 border border-[#8A8A8A] rounded-xl px-4 py-3 shrink-0">
              <p className="text-white font-mono font-bold text-xs tracking-[0.15em] uppercase mb-3">
                CURRENT STATUS
              </p>
              <div className="grid grid-cols-4 md:grid-cols-2 gap-2">
                  {(["supplies", "safety", "population", "morale"] as const).map((key) => (
                    <div key={key} className="flex flex-col items-center gap-0.5">
                      <span className="text-[#8A8A8A] font-mono text-[9px] tracking-widest uppercase text-center">
                        {key === "supplies" ? "FOOD" : key === "population" ? "PEOPLE" : key.toUpperCase()}
                      </span>
                      <span className={`font-mono font-bold text-sm tabular-nums ${stats[key] <= 10 ? "text-red-400" : "text-white"}`}>
                        {stats[key]} <span className="text-[#555] text-[10px]">UNIT</span>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Choices */}
          <div className="flex flex-col gap-3">
            {question?.choices.map((choice) => {
              const isChosen = chosen === choice.id
              const isDimmed = chosen && !isChosen
              return (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(choice)}
                  disabled={!!chosen}
                  className={`w-full text-left px-6 py-4 rounded-xl border font-mono font-bold text-sm tracking-wide uppercase transition-all duration-200 ${
                    isChosen
                      ? "border-amber-500 bg-amber-500/10 text-amber-300"
                      : isDimmed
                      ? "border-[#333] text-[#444] cursor-not-allowed"
                      : "border-[#8A8A8A] text-white hover:border-amber-500/60 hover:bg-amber-500/5 cursor-pointer"
                  }`}
                >
                  {choice.text}
                </button>
              )
            })}
          </div>

          {/* Next */}
          {chosen && (
            <div className="flex justify-end mt-2">
              <button
                onClick={handleNext}
                className="font-mono font-bold text-sm tracking-[0.14em] uppercase px-8 py-3 rounded-xl text-neutral-950 bg-linear-to-br from-amber-600 to-amber-400 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                {day >= 7 ? "See Ending →" : `Day ${day + 1} →`}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Gameplay