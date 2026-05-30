import type { LeaderboardEntry } from "../types/LeaderBoardTypes";
import LeaderBoardRow from "../components/LeaderBoardRow";

const MOCK_GLOBAL: LeaderboardEntry[] = [
  { id: 1, userId: "u1", username: "SurvivorKing", score: 3454, role: "soldier", dayReached: 30, ending: "victory",  createdAt: "2026-05-01" },
  { id: 2, userId: "u2", username: "DocHero",       score: 2958, role: "doctor",  dayReached: 28, ending: "survived", createdAt: "2026-05-02" },
  { id: 3, userId: "u3", username: "ChefMaster",    score: 2675, role: "chef",    dayReached: 25, ending: "survived", createdAt: "2026-05-03" },
  { id: 4, userId: "u4", username: "BraveSoldier",  score: 1020, role: "soldier", dayReached: 22, ending: "dead",     createdAt: "2026-05-04" },
  { id: 5, userId: "u5", username: "MedicPro",      score:  987, role: "doctor",  dayReached: 20, ending: "dead",     createdAt: "2026-05-05" },
  { id: 6, userId: "u6", username: "NightWalker",   score:  978, role: "soldier", dayReached: 18, ending: "dead",     createdAt: "2026-05-06" },
];

interface Props {
  onClose?: () => void;
}

export default function LeaderBoardPage({ onClose }: Props) {
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
            color: "#fffff",
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

      {/*header*/}
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

      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
        {MOCK_GLOBAL.map((entry, i) => (
          <LeaderBoardRow key={entry.id} entry={entry} rank={i + 1} />
        ))}
      </ul>
    </div>
  );
}