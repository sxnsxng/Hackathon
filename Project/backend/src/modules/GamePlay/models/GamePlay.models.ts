// GamePlay.models.ts — Prisma DB operations

import prisma from "../../../lib/prisma.js"
import type { SaveEndingInput } from "../schemas/GamePlay.schemas.js"

/**
 * บันทึก game record และบวก score เข้า totalPoint ของ user
 * ทำใน transaction เดียวกันเพื่อความ consistent
 */
export async function saveEndingAndUpdatePoint(data: SaveEndingInput) {
  // 1. สร้าง GameRecord (ไม่ต้องอยู่ใน transaction กับ user update)
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

  // 2. บวก score เข้า totalPoint ของ user (ถ้า user ไม่มีอยู่ก็ข้ามไป)
  let updatedTotalPoint: number | null = null
  try {
    const updatedUser = await prisma.user.update({
      where: { id: data.userId },
      data: { totalPoint: { increment: data.score } },
      select: { totalPoint: true },
    })
    updatedTotalPoint = updatedUser.totalPoint
  } catch {
    // user ไม่มีใน DB — บันทึก record ได้แต่ไม่ update point
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