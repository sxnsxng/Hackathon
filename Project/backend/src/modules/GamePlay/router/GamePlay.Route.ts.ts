import { Router, Request, Response } from 'express';
import prisma from '../../../lib/prisma.js';
import { CreateSessionSchema } from '../schemas/GamePlay.schemas.js';
import { saveEnding, getHistory, leaderboard, deleteSession } from '../controllers/Gameplay.controller.js';

const router = Router();

// POST /api/game/start
router.post('/start', async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = CreateSessionSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({
        message: "Validation Error",
        errors: validation.error.issues
      });
      return;
    }

    const { role } = validation.data;

    const newSession = await prisma.gameSession.create({
      data: {
        role: role,
        day: 1,
        supplies: 60,
        safety: 50,
        population: 70,
        morale: 65
      }
    });

    res.status(201).json({
      message: "Game session started successfully",
      session: newSession
    });

  } catch (error) {
    console.error("Error creating game session:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST /api/gameplay/ending
router.post('/ending', saveEnding);

// GET /api/gameplay/history/:userId
router.get('/history/:userId', getHistory);

// GET /api/gameplay/leaderboard
router.get('/leaderboard', leaderboard);

// DELETE /api/game/session/:id
router.delete('/session/:id', deleteSession);

// GET /api/gameplay/count/:userId
router.get('/count/:userId', async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId as string)
    const count = await prisma.gameRecord.count({
      where: { userId }
    })
    res.json({ count })
  } catch (error) {
    console.error("Error getting game count:", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
})

export default router;