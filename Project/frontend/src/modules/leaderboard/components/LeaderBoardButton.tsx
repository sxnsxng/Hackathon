interface Props {
  onClick: () => void;
  isOpen: boolean;
}

export default function LeaderBoardButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      title="Leaderboard"
      style={{
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
    >
      {/* Leader Board Icon */}
            <div>
                <img src="src/assets/leaderboard.png" alt="FileIcon" className="w-20"/>
                <div style={{
                    position: "absolute", top: 0, right: 0,
                    width: 10, height: 10,
                    borderBottom: "2px",
                }} />
            </div>
    </button>
  );
}
