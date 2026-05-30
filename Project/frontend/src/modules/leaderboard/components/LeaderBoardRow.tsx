import type { LeaderboardEntry } from "../types/LeaderBoardTypes";

interface Props {
  entry: LeaderboardEntry;
  rank: number;
}

function LeaderBoardRow({ entry, rank }: Props) {
  return (
    <li className="flex justify-between items-center bg-linear-to-r from-[rgba(80,80,80,0.4)] to-[rgba(50,50,50,0.25)] rounded-r-md px-4 py-2.5 text-sm tracking-wide" style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
      <span className="text-white/85">{rank}. {entry.username}</span>
      <span className="font-normal text-white/70">{entry.score.toLocaleString()} pts</span>
    </li>
  );
}

export default LeaderBoardRow;
