import { Router, Request, Response } from 'express';
import prisma from '../../../lib/prisma.js';
import { CreateSessionSchema } from '../schemas/GamePlay.schemas.js';

const router = Router();

// POST /api/game/start
router.post('/start', async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Validate request body using Zod
    const validation = CreateSessionSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({
        message: "Validation Error",
        errors: validation.error.issues
      });
      return;
    }

    const { role } = validation.data;

    // 2. Initialize Game Session based on Core Rules
    // Default values: supplies=60, safety=50, population=70, morale=65
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

export default router;