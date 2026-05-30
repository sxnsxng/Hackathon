import { useEffect, useState } from "react";
import LeaderBoardRow from "../components/LeaderBoardRow";
import type { LeaderboardEntry } from "../types/LeaderBoardTypes";

interface Props {
  onClose?: () => void;
}

export default function LeaderBoardPage({ onClose }: Props) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/gameplay/leaderboard?limit=10")
      .then(r => r.json())
      .then((data: { id: number; username: string; totalPoint: number }[]) => {
        setEntries(data.map((u, i) => ({
          id: i + 1,
          userId: String(u.id),
          username: u.username,
          score: u.totalPoint,
          role: "-",
          dayReached: 0,
          ending: "-",
          createdAt: "",
        })))
      })
      .catch(() => setEntries([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="relative bg-[rgba(20,20,20,0.80)] backdrop-blur-md rounded-2xl border border-white/10 w-96 px-7 py-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">

      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-5 bg-transparent border-none text-white/50 text-4xl font-light cursor-pointer leading-none hover:text-white transition-colors"
        >
          ×
        </button>
      )}

      <h2 className="text-white text-3xl font-light text-center mb-4 tracking-wide" style={{ fontFamily: "'Segoe UI', Roboto, sans-serif" }}>
        Top Score
      </h2>

      <hr className="border-none border-t-2 border-white/40 mb-4" />

      {loading ? (
        <p className="text-white/40 text-center font-sans">Loading...</p>
      ) : entries.length === 0 ? (
        <p className="text-white/40 text-center font-sans">No scores yet.</p>
      ) : (
        <ul className="list-none m-0 p-0 flex flex-col gap-1.5">
          {entries.map((entry, i) => (
            <LeaderBoardRow key={entry.id} entry={entry} rank={i + 1} />
          ))}
        </ul>
      )}
    </div>
  );
}
