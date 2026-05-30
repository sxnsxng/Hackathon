import type { LeaderboardEntry } from "../types/LeaderBoardTypes";

interface Props {
  entry: LeaderboardEntry;
  rank: number;
}

function LeaderBoardRow({ entry, rank }: Props) {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "linear-gradient(90deg, rgba(80, 80, 80, 0.4) 0%, rgba(50, 50, 50, 0.25) 100%)",
        borderRadius: "0px 6px 6px 0px",
        padding: "22px 28px",
        color: "#fffff",
        fontSize: "21px",
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        letterSpacing: "0.5px",
      }}
    >
      <span style={{ color: "rgba(255, 255, 255, 0.85)" }}>
        {rank}. {entry.username}
      </span>
      <span style={{ fontWeight: 400, color: "rgba(255, 255, 255, 0.7)" }}>
        {entry.score.toLocaleString()} pts
      </span>
    </li>
  );
}

export default LeaderBoardRow;