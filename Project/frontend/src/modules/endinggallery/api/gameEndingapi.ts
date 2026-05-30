import { resolveEnding } from "../types/endingChecker"
import { createEntry } from "../../leaderboard/apis/LeaderBoardapi"
import { unlockEnding } from "../api/endinggalleryapi"
import type { GameEndingResult } from "../types/gameEnding"

export const onGameEnd = async (
  userId: number,
  username: string,
  result: GameEndingResult,
) => {
  const endingId = resolveEnding(result.stats, result.survived)

  try {
    await Promise.all([
      createEntry({
        userId: String(userId),
        username,
        score: result.score,
        role: result.role as "doctor" | "chef" | "soldier",
        dayReached: result.dayReached,
        ending: endingId,
      }),
      unlockEnding(String(userId), endingId),
    ])
    return { success: true, endingId }
  } catch (err) {
    console.error("onGameEnd error:", err)
    return { success: false, endingId }
  }
}
