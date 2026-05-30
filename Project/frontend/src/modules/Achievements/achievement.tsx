import { useEffect, useState } from "react"
import { achievementAPI } from "../LoginRegistration/api"
import type { AchievementAPI } from "../LoginRegistration/api"

interface Props {
    userId: number
}

const AchievementSection: React.FC<Props> = ({ userId }) => {

    const [unlocked, setUnlocked] = useState<AchievementAPI[]>([])

    useEffect(() => {
        const init = async () => {
            try {
                await achievementAPI.unlock(userId, 1)
            } catch {
                // already unlocked, ignore
            }

            const data = await achievementAPI.getUnlocked(userId)
            setUnlocked(data)
        }
        init()
    }, [userId])

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <span style={{
                color: "#fff",
                fontFamily: "'Jura', sans-serif",
                fontWeight: "bold",
                fontSize: "14px",
                letterSpacing: "2px",
            }}>
                ACHIEVEMENT
            </span>

            {unlocked.length === 0 ? (
                <span style={{
                    color: "rgba(255,255,255,0.4)",
                    fontFamily: "'Jura', sans-serif",
                    fontSize: "13px",
                }}>
                    No achievements unlocked yet.
                </span>
            ) : (
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    {unlocked.map((a) => (
                        <div
                            key={a.id}
                            title={`${a.name}: ${a.description}`}
                            style={{
                                width: "52px",
                                height: "52px",
                                borderRadius: "50%",
                                backgroundColor: "rgba(255,255,255,0.2)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                border: "1px solid rgba(255,255,255,0.3)",
                            }}
                        >
                            <span style={{ fontSize: "20px" }}>🏆</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AchievementSection