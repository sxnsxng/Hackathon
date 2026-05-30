import { resolveEnding } from "../../ending-gallery/utils/ending-checker"
import { addScore } from "../../leaderboard/apis/leaderboard.api"
import { unlockEnding } from "../../ending-gallery/apis/ending-gallery.api"
import { GameEndingResult } from "../types/gameEnding"

export const onGameEnd = async (userId: number, result: GameEndingResult) => {
  const endingId = resolveEnding(result.stats, result.survived)

  try {
    await Promise.all([
      addScore(userId, result.score),
      unlockEnding(userId, endingId),
    ])
    return { success: true, endingId }
  } catch (err) {
    console.error("onGameEnd error:", err)
    return { success: false, endingId }
  }
}
