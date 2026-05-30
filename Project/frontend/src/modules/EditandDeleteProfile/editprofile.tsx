import { useState } from "react";
import { userAPI } from "../LoginRegistration/api";

interface Props {
    userId: number
    currentUsername: string
    onClose: () => void
    onSuccess: (newUsername: string) => void
}

const EditProfile: React.FC<Props> = ({ userId, currentUsername, onClose, onSuccess }) => {
    const [username, setUsername] = useState(currentUsername)
    const [error, setError] = useState("")

    const handleConfirm = async () => {
        if (!username.trim()) { setError("⚠ Username cannot be empty."); return }
        try {
            const updated = await userAPI.updateProfile(userId, { username })
            onSuccess(updated.username)
            onClose()
        } catch (err: any) {
            setError("⚠ " + (err.message || "Something went wrong."))
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-200 bg-black/60">
            <div className="bg-[#111] border border-white/15 rounded-[15px] p-10 w-120 flex flex-col gap-6 relative">

                <span onClick={onClose} className="absolute top-4 right-5 text-white text-xl cursor-pointer">✕</span>

                <span className="font-jura text-white font-bold text-base tracking-[2px]">EDIT USERNAME</span>

                <div>
                    <input
                        value={username}
                        onChange={(e) => { setUsername(e.target.value); setError("") }}
                        className="w-full px-4 py-3 bg-black border border-white/30 rounded-[15px] text-white outline-none text-sm font-jura"
                    />
                    {error && <p className="text-[#ff6b6b] text-xs mt-1.5 ml-3 font-jura">{error}</p>}
                </div>

                <div className="flex gap-4">
                    <button onClick={onClose} className="flex-1 py-3.5 bg-transparent text-white font-jura font-bold text-[15px] tracking-[2px] border border-white/40 rounded-[15px] cursor-pointer">
                        CANCEL
                    </button>
                    <button onClick={handleConfirm} className="flex-1 py-3.5 bg-white text-black font-jura font-bold text-[15px] tracking-[2px] border-0 rounded-[15px] cursor-pointer">
                        CONFIRM
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditProfile
