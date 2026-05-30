// GamePlay.models.ts — Prisma DB operations

import prisma from "../../../lib/prisma.js"
import type { SaveEndingInput } from "../schemas/GamePlay.schemas.js"

/**
 * บันทึก game record และบวก score เข้า totalPoint ของ user
 * ทำใน transaction เดียวกันเพื่อความ consistent
 */
export async function saveEndingAndUpdatePoint(data: SaveEndingInput) {
  return await prisma.$transaction(async (tx) => {

    // 1. สร้าง GameRecord
    const gameRecord = await tx.gameRecord.create({
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

    // 2. บวก score เข้า totalPoint ของ user
    const updatedUser = await tx.user.update({
      where: { id: data.userId },
      data: {
        totalPoint: { increment: data.score },
      },
      select: { totalPoint: true },
    })

    return { gameRecord, updatedTotalPoint: updatedUser.totalPoint }
  })
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
 * ดึง leaderboard — top users by totalPoint
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