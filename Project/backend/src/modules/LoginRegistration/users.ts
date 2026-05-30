import { Router } from "express"
import prisma from "../lib/prisma.js"

const router = Router()

// GET /api/users/:id
router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const user = await prisma.user.findUnique({ where: { id } })
        if (!user) return res.status(404).json({ success: false, message: "User not found." })
        return res.json({ success: true, data: { id: user.id, email: user.email, username: user.username, profile: user.profilePicture, createdAt: user.createdAt } })
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error." })
    }
})

// PUT /api/users/:id
router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const { username } = req.body
    try {
        const existing = await prisma.user.findFirst({ where: { username, NOT: { id } } })
        if (existing) return res.status(409).json({ success: false, message: "Username already in use." })
        const user = await prisma.user.update({ where: { id }, data: { username } })
        return res.json({ success: true, data: { id: user.id, email: user.email, username: user.username, profile: user.profilePicture } })
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error." })
    }
})

// DELETE /api/users/:id
router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        await prisma.user.delete({ where: { id } })
        return res.json({ success: true, data: null })
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error." })
    }
})

export default router
