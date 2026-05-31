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

  const handleConfirm = async () => {
    if (!activeRole) return
    try {
      const res = await fetch("/api/gameplay/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: activeRole.id }),
      })
      const data = await res.json()
      const sessionId: string = data.session.id
      startGame(activeRole, sessionId)
    } catch {
      startGame(activeRole, crypto.randomUUID())
    }
    navigate("/Gameplay")
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="relative z-10 
        w-[95%] h-[95%] 
        md:w-[75%] md:h-[90%] 
        bg-[#000000]/85 border border-[#8A8A8A] rounded-xl flex flex-col overflow-hidden shadow-2xl"
      >

        {/* Title bar */}
        <div className="flex items-start justify-between px-4 md:px-5 pt-4 pb-3 border-b border-[#8a8a8a] shrink-0 pl-5 md:pl-8">
          <span className="text-white font-mono text-sm md:text-xl font-bold tracking-wide py-2">
            7 Days To Survive - Select Role
          </span>
          <button
            onClick={() => navigate("/")}
            className="text-[#8A8A8A] hover:text-white font-mono text-lg leading-none transition-colors mt-0.5 pt-3 pr-2 md:pr-4"
          >
            ✕
          </button>
        </div>

        {/* Cards */}
        <div className="
          flex flex-col overflow-y-auto   
          md:flex-row md:overflow-visible  
          flex-1 gap-3 md:gap-4 
          px-4 md:px-10 
          py-4 md:py-0
          md:items-center md:justify-center
        ">
          {roles.map((role) => {
            const isSelected = selected === role.id
            return (
              <div
                key={role.id}
                onClick={() => setSelected(role.id)}
                className={`
                  relative overflow-hidden cursor-pointer transition-all duration-300 rounded-md border
                  
                  /* Mobile — แนวนอน เรียงบนล่าง */
                  flex-shrink-0 h-24 w-full flex flex-row

                  /* Desktop — แนวตั้ง เรียงซ้ายขวา */
                  md:flex-col md:flex-1 md:h-[80%] md:w-auto

                  hover:-translate-y-0 md:hover:-translate-y-2
                  ${isSelected 
                    ? "border-amber-500 md:-translate-y-3" 
                    : "border-[#8A8A8A]"
                  }
                `}
              >
                <div className="absolute inset-0 bg-[#1a1a1a]" />

                {/* รูป */}
                {role.image && (
                  <img
                    src={role.image}
                    alt=""
                    className="
                      absolute inset-0 w-full h-full object-cover
                      object-center
                    "
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />

                {/* Mobile overlay ซ้าย */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60 md:hidden" />

                {/* ชื่อ Role */}
                  <div className="
                    absolute z-10

                    /* Mobile — กึ่งกลาง */
                    inset-0 flex flex-col items-center justify-center

                    /* Desktop — ล่างกึ่งกลาง */
                    md:inset-auto md:bottom-0 md:left-0 md:right-0 md:pb-4 md:flex-col md:items-center
                  ">
                    {role.lines.map((line, li) => (
                      <span
                        key={li}
                        className={`font-mono font-bold tracking-[0.1em] uppercase leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]
                          text-[10px] md:text-[11px]
                          ${isSelected ? "text-amber-400" : "text-white"}
                        `}
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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-10 py-3 md:py-2 border-t border-[#8a8a8a] shrink-0 gap-2 md:gap-0">
          <p className="text-[#8A8A8A] font-mono text-xs md:text-sm">
            {activeRole ? activeRole.description : "Select a role to begin your survival journey…"}
          </p>
          <button
            onClick={handleConfirm}
            disabled={!activeRole}
            className={`w-full md:w-auto font-mono font-bold text-sm tracking-[0.14em] uppercase px-8 py-2 md:py-1 rounded-xl transition-all duration-200 ${
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