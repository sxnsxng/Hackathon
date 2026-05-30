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
    <div
      style={{
        background: "rgba(20, 20, 20, 0.80)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: 14,
        border: "1px solid rgba(255, 255, 255, 0.08)",
        width: 530,
        padding: "48px 40px 40px",
        position: "relative",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
      }}
    >
      {/* close button */}
      {onClose && (
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 18,
            right: 22,
            background: "transparent",
            border: "none",
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: "35px",
            fontWeight: 200,
            cursor: "pointer",
            lineHeight: 1,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)")}
        >
          ×
        </button>
      )}

      <h2
        style={{
          color: "#fff",
          fontSize: "42px",
          fontWeight: 300,
          textAlign: "center",
          margin: "0 0 16px",
          fontFamily: "'Segoe UI', Roboto, sans-serif",
          letterSpacing: "1px",
        }}
      >
        Top Score
      </h2>

      <hr style={{ border: "none", borderTop: "2px solid rgba(255, 255, 255, 0.4)", marginBottom: 16 }} />

      {loading ? (
        <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", fontFamily: "sans-serif" }}>
          Loading...
        </p>
      ) : entries.length === 0 ? (
        <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", fontFamily: "sans-serif" }}>
          No scores yet.
        </p>
      ) : (
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
          {entries.map((entry, i) => (
            <LeaderBoardRow key={entry.id} entry={entry} rank={i + 1} />
          ))}
        </ul>
      )}
    </div>
  );
}
