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
            try { await achievementAPI.unlock(userId, 1) } catch {}
            const data = await achievementAPI.getUnlocked(userId)
            setUnlocked(data)
        }
        init()
    }, [userId])

    return (
        <div className="flex flex-col gap-3">
            <span className="font-jura text-white font-bold text-sm tracking-[2px]">ACHIEVEMENT</span>

            {unlocked.length === 0 ? (
                <span className="font-jura text-white/40 text-sm">No achievements unlocked yet.</span>
            ) : (
                <div className="flex gap-3 flex-wrap">
                    {unlocked.map((a) => (
                        <div
                            key={a.id}
                            title={`${a.name}: ${a.description}`}
                            className="w-13 h-13 rounded-full bg-white/20 flex items-center justify-center cursor-pointer border border-white/30"
                        >
                            <span className="text-xl">🏆</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AchievementSection
