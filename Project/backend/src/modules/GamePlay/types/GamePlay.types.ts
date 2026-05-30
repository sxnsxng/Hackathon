// GamePlay.types.ts

export type EndingType = "success" | "fail"

export interface SaveEndingBody {
  userId: number
  endingId: string
  endingName: string
  isSuccess: boolean
  score: number       // score จาก game นี้
  roleId: string
  playedAt?: string   // ISO string
}

export interface SaveEndingResponse {
  gameRecord: {
    id: number
    userId: number
    endingId: string
    endingName: string
    isSuccess: boolean
    score: number
    roleId: string
    playedAt: Date
  }
  updatedTotalPoint: number
}