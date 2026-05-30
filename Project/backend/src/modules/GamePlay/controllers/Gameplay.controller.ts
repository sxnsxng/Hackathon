// GamePlay.controllers.ts

import type { Request, Response } from "express"
import { SaveEndingSchema } from "../schemas/GamePlay.schemas.js"
import {
  saveEndingAndUpdatePoint,
  getGameHistoryByUser,
  getLeaderboard,
  deleteGameSession,
} from "../models/GamePlay.models.js"

/**
 * POST /api/gameplay/ending
 */
export async function saveEnding(req: Request, res: Response) {
  const parsed = SaveEndingSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid request body",
      details: parsed.error.flatten(),
    })
  }

  try {
    const result = await saveEndingAndUpdatePoint(parsed.data)
    return res.status(201).json(result)
  } catch (err) {
    console.error("[saveEnding]", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}

/**
 * GET /api/gameplay/history/:userId
 */
export async function getHistory(req: Request, res: Response) {
  const userId = Number(req.params.userId)

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid userId" })
  }

  try {
    const history = await getGameHistoryByUser(userId)
    return res.json(history)
  } catch (err) {
    console.error("[getHistory]", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}

/**
 * GET /api/gameplay/leaderboard
 */
export async function leaderboard(req: Request, res: Response) {
  try {
    const limit = Number(req.query.limit) || 10
    const data = await getLeaderboard(limit)
    return res.json(data)
  } catch (err) {
    console.error("[leaderboard]", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}

/**
 * DELETE /api/game/session/:id
 * ลบ session เมื่อผู้เล่นกด ✕ ออกกลางคัน
 */
export async function deleteSession(req: Request, res: Response) {
  const id = req.params.id as string

  if (!id) {
    return res.status(400).json({ error: "Session ID is required" })
  }

  try {
    await deleteGameSession(id)
    return res.json({ message: "Session deleted successfully" })
  } catch (err: any) {
    if (err?.code === "P2025") {
      return res.status(404).json({ error: "Session not found" })
    }
    console.error("[deleteSession]", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}