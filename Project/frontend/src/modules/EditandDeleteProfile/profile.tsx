import { useEffect, useState } from "react";
import EditProfile from "./editprofile";
import DeleteAccount from "./deleteaccount";
import Achievement from "../Achievements/achievement";

const Profile: React.FC = () => {
    const [showProfile, setShowProfile] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
    const [username, setUsername] = useState(currentUser.username || "")
    const [totalPoint, setTotalPoint] = useState<number>(currentUser.totalPoint ?? 0)

    useEffect(() => {
        if (!currentUser.id) return
        fetch(`/api/users/${currentUser.id}`)
            .then(r => r.json())
            .then(res => { if (res.success && res.data.totalPoint != null) setTotalPoint(res.data.totalPoint) })
            .catch(() => {})
    }, [currentUser.id])

    return (
        <>
            {/* PROFILE ICON */}
            <div
                onClick={() => setShowProfile(true)}
                className="absolute top-5 right-5 flex items-center gap-2.5 bg-black/60 rounded-full px-4 py-2 cursor-pointer"
            >
                <span className="font-jura text-white font-bold text-base">{totalPoint} PT.</span>
                <div className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden">
                    <img src="/Profile.png" alt="Profile" width="52" height="52"
                        onMouseOver={(e) => (e.currentTarget.src = "/Profile2.png")}
                        onMouseOut={(e) => (e.currentTarget.src = "/Profile.png")}
                    />
                </div>
            </div>

            {/* PROFILE MODAL */}
            {showProfile && (
                <div className="fixed inset-0 flex items-center justify-center z-100 bg-black/60">
                    <div className="bg-[#111] border border-white/30 rounded-2xl px-10 py-8 w-[70%] flex flex-col gap-6 relative">

                        <div className="flex justify-between items-center">
                            <span className="font-jura text-white font-bold text-xl tracking-[2px]">PROFILE</span>
                            <span onClick={() => setShowProfile(false)} className="text-white text-xl cursor-pointer">✕</span>
                        </div>

                        <div className="border-t border-white/30" />

                        {/* USERNAME */}
                        <div className="flex flex-col gap-2">
                            <span className="font-jura text-white font-bold text-sm tracking-[2px]">USERNAME</span>
                            <div className="flex items-center gap-3">
                                <span className="text-white text-sm">▶</span>
                                <span className="font-jura text-white font-bold text-base tracking-[2px]">{username}</span>
                                <img src="/EditUser.png" onClick={() => setShowEdit(true)} alt="EditUser"
                                    className="w-6 h-6 cursor-pointer"
                                    onMouseOver={(e) => (e.currentTarget.src = "/EditUser2.png")}
                                    onMouseOut={(e) => (e.currentTarget.src = "/EditUser.png")}
                                />
                            </div>
                        </div>

                        {/* SCORE */}
                        <div className="flex flex-col gap-2">
                            <span className="font-jura text-white font-bold text-sm tracking-[2px]">SCORE</span>
                            <div className="flex items-center gap-3">
                                <span className="text-white text-sm">▶</span>
                                <span className="font-jura text-white font-bold text-base tracking-[2px]">{totalPoint} PT.</span>
                            </div>
                        </div>

                        {/* ACHIEVEMENT */}
                        <div className="flex flex-col gap-3">
                            <Achievement userId={currentUser.id} />
                        </div>

                        {/* DELETE */}
                        <div className="flex justify-end">
                            <img src="/DeleteAccount.png" onClick={() => setShowDelete(true)} alt="DeleteAccount"
                                className="w-6 h-7 cursor-pointer"
                                onMouseOver={(e) => (e.currentTarget.src = "/DeleteAccount2.png")}
                                onMouseOut={(e) => (e.currentTarget.src = "/DeleteAccount.png")}
                            />
                        </div>
                    </div>
                </div>
            )}

            {showEdit && (
                <EditProfile
                    userId={currentUser.id}
                    currentUsername={username}
                    onClose={() => setShowEdit(false)}
                    onSuccess={(newUsername) => {
                        setUsername(newUsername)
                        const stored = JSON.parse(localStorage.getItem("currentUser") || "{}")
                        localStorage.setItem("currentUser", JSON.stringify({ ...stored, username: newUsername }))
                    }}
                />
            )}

            {showDelete && <DeleteAccount userId={currentUser.id} onClose={() => setShowDelete(false)} />}
        </>
    )
}

export default Profile
