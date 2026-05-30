import { Request, Response } from "express";
import prisma from "../../../lib/prisma.js";

// GET /api/leaderboard?limit=10 ranking from the most score
export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 10, 50);
    const entries = await prisma.leaderboardEntry.findMany({
      orderBy: { score: "desc" },
      take: limit,
    });
    res.json(entries);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/leaderboard/user/:userId from history play session
export const getUserScores = async (req: Request, res: Response) => {
  try {
    const entries = await prisma.leaderboardEntry.findMany({
      where: { userId: String(req.params.userId) },
      orderBy: { createdAt: "desc" },
    });
    res.json(entries);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST /api/leaderboard save score when new play
export const createEntry = async (req: Request, res: Response) => {
  try {
    const { userId, username, score, role, dayReached, ending } = req.body;
    if (!userId || !username || score == null || !role || !dayReached || !ending) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }
    const entry = await prisma.leaderboardEntry.create({
      data: { userId, username, score, role, dayReached, ending },
    });
    res.status(201).json(entry);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};
