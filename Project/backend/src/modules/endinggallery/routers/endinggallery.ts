import { Router } from "express";
import { getUnlockedEndings, unlockEnding, deleteEnding } from "../controllers/endinggallery.js";

const router = Router();

// GET  /api/endings/:userId   → string[] of unlocked endingIds
router.get("/:userId", getUnlockedEndings);
// POST   /api/endings/unlock  → { userId, endingId } → unlock an ending (idempotent)
router.post("/unlock", unlockEnding);
// DELETE /api/endings/unlock  → { userId, endingId } → remove an ending
router.delete("/unlock", deleteEnding);

export default router;
