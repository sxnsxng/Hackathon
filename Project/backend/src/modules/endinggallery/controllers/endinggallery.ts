import { Request, Response } from "express";
import prisma from "../../../lib/prisma.js";

// GET /api/endings/:userId → returns endingId[] that the user has unlocked
export const getUnlockedEndings = async (req: Request, res: Response) => {
  try {
    const userId = String(req.params.userId);
    const rows = await prisma.unlockedEnding.findMany({
      where: { userId },
      orderBy: { unlockedAt: "asc" },
      select: { endingId: true },
    });
    res.json(rows.map((r: { endingId: string }) => r.endingId));
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /api/endings/unlock → { userId, endingId }
export const deleteEnding = async (req: Request, res: Response) => {
  try {
    const { userId, endingId } = req.body as { userId?: string; endingId?: string };
    if (!userId || !endingId) {
      res.status(400).json({ message: "userId and endingId are required" });
      return;
    }
    await prisma.unlockedEnding.delete({
      where: { userId_endingId: { userId, endingId } },
    });
    res.status(200).json({ message: "Ending removed" });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST /api/endings/unlock → { userId, endingId }
// idempotent: unlocking the same ending twice is a no-op
export const unlockEnding = async (req: Request, res: Response) => {
  try {
    const { userId, endingId } = req.body as { userId?: string; endingId?: string };
    if (!userId || !endingId) {
      res.status(400).json({ message: "userId and endingId are required" });
      return;
    }

    const row = await prisma.unlockedEnding.upsert({
      where: { userId_endingId: { userId, endingId } },
      update: {},
      create: { userId, endingId },
    });

    res.status(201).json(row);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};
