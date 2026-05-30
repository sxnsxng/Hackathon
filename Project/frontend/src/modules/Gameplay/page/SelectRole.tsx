import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { roles } from "../data/role"
import type { Role } from "../data/role"
import { useGameStore } from "../data/GameStore"
import bg from "../../../assets/BG.png"

const SelectRole: React.FC = () => {
  const feedRef = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const { startGame } = useGameStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight
    }
  }, [feedRef])

  const activeRole: Role | undefined = roles.find((r) => r.id === selected)

  const handleConfirm = () => {
    if (!activeRole) return
    startGame(activeRole)
    navigate("/Gameplay")
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="relative z-10 w-[75%] h-[90%] bg-[#000000]/85 border border-[#8A8A8A] rounded-xl flex flex-col overflow-hidden shadow-2xl">

        {/* Title bar */}
        <div className="flex items-start justify-between px-5 pt-4 pb-3 border-b border-[#8a8a8a] shrink-0 pl-8">
          <span className="text-white font-mono text-xl font-bold tracking-wide py-2">
            7 Days To Survive - Select Role
          </span>
          <button
            onClick={() => navigate("/")}
            className="text-[#8A8A8A] hover:text-white font-mono text-lg leading-none transition-colors mt-0.5 pt-3 pr-4"
          >
            ✕
          </button>
        </div>

        {/* Cards */}
        <div className="flex flex-row justify-center items-center flex-1 gap-4 px-10">
          {roles.map((role) => {
            const isSelected = selected === role.id
            return (
              <div
                key={role.id}
                onClick={() => setSelected(role.id)}
                className={`relative flex-1 h-[80%] rounded-md overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 border ${
                  isSelected ? "border-amber-500 -translate-y-3" : "border-[#8A8A8A]"
                }`}
              >
                <div className="absolute inset-0 bg-[#1a1a1a]" />
                {role.image && (
                  <img src={role.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />
                <div className="absolute bottom-0 left-0 right-0 pb-4 flex flex-col items-center z-10">
                  {role.lines.map((line, li) => (
                    <span
                      key={li}
                      className={`font-mono font-bold text-[11px] tracking-[0.1em] uppercase leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] ${
                        isSelected ? "text-amber-400" : "text-white"
                      }`}
                    >
                      {line}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-10 py-2 border-t border-[#8a8a8a] shrink-0">
          <p className="text-[#8A8A8A] font-mono text-sm">
            {activeRole ? activeRole.description : "Select a role to begin your survival journey…"}
          </p>
          <button
            onClick={handleConfirm}
            disabled={!activeRole}
            className={`font-mono font-bold text-sm tracking-[0.14em] uppercase px-8 py-1 rounded-xl transition-all duration-200 ${
              activeRole
                ? "text-white bg-amber-600 hover:-translate-y-0.5 cursor-pointer"
                : "text-[#555] bg-[#333] cursor-not-allowed"
            }`}
          >
            Confirm Role
          </button>
        </div>

        <div ref={feedRef} className="hidden" />
      </div>
    </div>
  )
}

export default SelectRole