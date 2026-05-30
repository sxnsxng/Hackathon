import { Router } from "express";
import { getLeaderboard, getUserScores, createEntry } from "../controllers/leaderboard.js";

const router = Router();

// GET /api/leaderboard?limit=10   → top scores
router.get("/", getLeaderboard);
// GET /api/leaderboard/user/:id   → scores ของ user
router.get("/user/:userId", getUserScores);
// POST /api/leaderboard           → บันทึก score ใหม่
router.post("/", createEntry);

export default router;
