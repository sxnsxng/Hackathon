import { Router } from "express"
import prisma from "../../lib/prisma.js"

const router = Router()

// GET /api/achievements — get all achievements
router.get("/", async (req, res) => {
    try {
        const achievements = await prisma.achievement.findMany()
        return res.json({ success: true, data: achievements })
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error." })
    }
})

// GET /api/achievements/:userId — get unlocked achievements for a user
router.get("/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId)
    try {
        const userAchievements = await prisma.userAchievement.findMany({
            where: { userId },
            include: { achievement: true },
        })
        return res.json({ success: true, data: userAchievements.map(ua => ua.achievement) })
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error." })
    }
})

// POST /api/achievements/:userId/:achievementId — unlock an achievement
router.post("/:userId/:achievementId", async (req, res) => {
    const userId = parseInt(req.params.userId)
    const achievementId = parseInt(req.params.achievementId)
    try {
        const ua = await prisma.userAchievement.create({
            data: { userId, achievementId },
            include: { achievement: true },
        })
        return res.status(201).json({ success: true, data: ua.achievement })
    } catch (err: any) {
        if (err.code === "P2002") {
            return res.status(409).json({ success: false, message: "Achievement already unlocked." })
        }
        return res.status(500).json({ success: false, message: "Internal server error." })
    }
})

export default router