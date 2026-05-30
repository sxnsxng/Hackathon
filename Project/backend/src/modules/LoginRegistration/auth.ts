import { Router } from "express"
import bcrypt from "bcrypt"
import prisma from "../../lib/prisma.js"

const router = Router()

const SALT_ROUNDS = 10

// POST /api/auth/register
router.post("/register", async (req, res) => {
    const { email, username, password } = req.body
    if (!email || !username || !password) {
        return res.status(400).json({ success: false, message: "Please fill in all required fields." })
    }
    try {
        const existing = await prisma.user.findFirst({ where: { OR: [{ email }, { username }] } })
        if (existing) return res.status(409).json({ success: false, message: "Email or username already exists." })
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
        const user = await prisma.user.create({ data: { email, username, password: hashedPassword } })
        return res.status(201).json({ success: true, message: "Register successful.", data: { id: user.id, email: user.email, username: user.username } })
    } catch (err) {
        console.error("[Register Error]", err)  // เพิ่มบรรทัดนี้
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})

// POST /api/auth/login
router.post("/login", async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ success: false, message: "Please fill in all required fields." })
    try {
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return res.status(401).json({ success: false, message: "Invalid email or password." })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(401).json({ success: false, message: "Invalid email or password." })
        return res.json({ success: true, message: "Login successful.", data: { id: user.id, email: user.email, username: user.username, profilePicture: user.profilePicture } })
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error." })
    }
})

export default router
