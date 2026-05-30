import { create } from "zustand"
import type { Role } from "./role"
import type { StatDelta } from "./Question/question"

export type Stats = {
  supplies: number
  safety: number
  population: number
  morale: number
}

export type GameStore = {
  role: Role | null
  sessionId: string | null
  day: number
  score: number
  lifetimeTotalScore: number
  stats: Stats
  isGameOver: boolean
  endingType: "success" | "fail" | null

  startGame: (role: Role, sessionId: string) => void  // ✅ เพิ่ม sessionId
  applyChoice: (delta: StatDelta, scoreGain: number) => void
  nextDay: () => void
  addToLifetimeScore: (points: number) => void
  resetGame: () => void
}

const INITIAL_STATS: Stats = {
  supplies: 50,
  safety: 20,
  population: 20,
  morale: 68,
}

export const useGameStore = create<GameStore>((set, get) => ({
  role: null,
  sessionId: null,
  day: 1,
  score: 0,
  lifetimeTotalScore: 0,
  stats: INITIAL_STATS,
  isGameOver: false,
  endingType: null,

  startGame: (role, sessionId) =>   // ✅ แก้ชื่อ + เพิ่ม sessionId
    set({ role, sessionId, day: 1, score: 0, stats: INITIAL_STATS, isGameOver: false, endingType: null }),

  addToLifetimeScore: (points) =>
    set((state) => ({ lifetimeTotalScore: state.lifetimeTotalScore + points })),

  applyChoice: (delta, scoreGain) => {
    const { stats, score } = get()
    const next: Stats = {
      supplies:   Math.max(0, stats.supplies   + (delta.supplies   ?? 0)),
      safety:     Math.max(0, stats.safety     + (delta.safety     ?? 0)),
      population: Math.max(0, stats.population + (delta.population ?? 0)),
      morale:     Math.max(0, stats.morale     + (delta.morale     ?? 0)),
    }
    const gameOver = Object.values(next).some((v) => v === 0)
    set({
      stats: next,
      score: score + scoreGain,
      isGameOver: gameOver,
      endingType: gameOver ? "fail" : null,
    })
  },

  nextDay: () => {
    const { day } = get()
    if (day >= 7) {
      set({ isGameOver: true, endingType: "success" })
    } else {
      set({ day: day + 1 })
    }
  },

  resetGame: () =>
    set({ role: null, sessionId: null, day: 1, score: 0, stats: INITIAL_STATS, isGameOver: false, endingType: null }),
    //                ↑ ✅ เพิ่ม reset sessionId
}))