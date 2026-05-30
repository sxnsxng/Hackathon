// GamePlay.models.ts — Prisma DB operations

import prisma from "../../../lib/prisma.js"
import type { SaveEndingInput } from "../schemas/GamePlay.schemas.js"

/**
 * บันทึก game record และบวก score เข้า totalPoint ของ user
 */
export async function saveEndingAndUpdatePoint(data: SaveEndingInput) {
  const gameRecord = await prisma.gameRecord.create({
    data: {
      userId:     data.userId,
      endingId:   data.endingId,
      endingName: data.endingName,
      isSuccess:  data.isSuccess,
      score:      data.score,
      roleId:     data.roleId,
      playedAt:   data.playedAt ? new Date(data.playedAt) : new Date(),
    },
  })

  let updatedTotalPoint: number | null = null
  try {
    const updatedUser = await prisma.user.update({
      where: { id: data.userId },
      data: { totalPoint: { increment: data.score } },
      select: { totalPoint: true },
    })
    updatedTotalPoint = updatedUser.totalPoint
  } catch {
    // user ไม่มีใน DB
  }

  return { gameRecord, updatedTotalPoint }
}

/**
 * ดึง game history ของ user
 */
export async function getGameHistoryByUser(userId: number) {
  return await prisma.gameRecord.findMany({
    where: { userId },
    orderBy: { playedAt: "desc" },
  })
}

/**
 * ดึง leaderboard
 */
export async function getLeaderboard(limit = 10) {
  return await prisma.user.findMany({
    orderBy: { totalPoint: "desc" },
    take: limit,
    select: {
      id: true,
      username: true,
      totalPoint: true,
    },
  })
}

/**
 * ✅ ลบ Game Session (เมื่อกด ✕ ออกกลางคัน)
 * โยน error P2025 ถ้า session ไม่มีใน DB
 */
export async function deleteGameSession(id: string) {
  return await prisma.gameSession.delete({
    where: { id },
  })
}