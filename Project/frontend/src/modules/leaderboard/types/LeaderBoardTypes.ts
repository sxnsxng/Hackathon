export interface LeaderboardEntry {
  id: number;
  userId: string;
  username: string;
  score: number;
  role: string;
  dayReached: number;
  ending: string;
  createdAt: string;
}

export interface CreateEntryInput {
  userId: string;
  username: string;
  score: number;
  role: "doctor" | "chef" | "soldier";
  dayReached: number;
  ending: string;
}
