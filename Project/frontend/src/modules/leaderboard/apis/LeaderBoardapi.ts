import type { LeaderboardEntry, CreateEntryInput } from "../types/LeaderBoardTypes";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

//Pull up the leaderboard sorted by highest score.
export const getLeaderboard = async (limit = 10): Promise<LeaderboardEntry[]> => {
  const res = await fetch(`${BASE_URL}/api/leaderboard?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch leaderboard");
  return res.json();
};

//Pull up history score (user)
export const getUserScores = async (userId: string): Promise<LeaderboardEntry[]> => {
  const res = await fetch(`${BASE_URL}/api/leaderboard/user/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user scores");
  return res.json();
};

// save score when end game
export const createEntry = async (data: CreateEntryInput): Promise<LeaderboardEntry> => {
  const res = await fetch(`${BASE_URL}/api/leaderboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create entry");
  return res.json();
};
