import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Logout: React.FC = () => {
    const [showLogout, setShowLogout] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("currentUser")
        navigate("/Login")
    }

    return (
        <>
            <div onClick={() => setShowLogout(true)} className="absolute bottom-10 right-10 cursor-pointer">
                <img
                    src="/Logout.png"
                    alt="Logout"
                    className="w-5 h-5"
                    onMouseOver={(e) => (e.currentTarget.src = "/Logout2.png")}
                    onMouseOut={(e) => (e.currentTarget.src = "/Logout.png")}
                />
            </div>

            {showLogout && (
                <div className="fixed inset-0 flex items-center justify-center z-100 bg-black/60">
                    <div className="bg-[#111] border border-white/30 rounded-[15px] p-10 w-120 flex flex-col gap-8 relative">

                        <span onClick={() => setShowLogout(false)} className="absolute top-4 right-5 text-white text-xl cursor-pointer">✕</span>

                        <p className="font-jura text-white font-bold text-lg tracking-[2px] text-center m-0">
                            DO YOU WANT LOGOUT
                        </p>

                        <div className="flex gap-4">
                            <button onClick={() => setShowLogout(false)} className="flex-1 py-3.5 bg-transparent text-white font-jura font-bold text-[15px] tracking-[2px] border border-white/40 rounded-[15px] cursor-pointer">
                                CANCEL
                            </button>
                            <button onClick={handleLogout} className="flex-1 py-3.5 bg-white text-black font-jura font-bold text-[15px] tracking-[2px] border-0 rounded-[15px] cursor-pointer">
                                LOGOUT
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Logout
