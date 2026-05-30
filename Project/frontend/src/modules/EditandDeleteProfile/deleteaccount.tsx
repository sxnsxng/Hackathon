import { useNavigate } from "react-router-dom"
import { userAPI } from "../LoginRegistration/api"

interface Props {
    userId: number
    onClose: () => void
}

const DeleteAccount: React.FC<Props> = ({ userId, onClose }) => {
    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
            await userAPI.deleteAccount(userId)
            localStorage.removeItem("currentUser")
            navigate("/Login")
        } catch (err: any) {
            alert(err.message || "Something went wrong.")
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-200 bg-black/60">
            <div className="bg-[#111] border border-white/15 rounded-[15px] p-10 w-120 flex flex-col gap-8 relative">

                <span onClick={onClose} className="absolute top-4 right-5 text-white text-xl cursor-pointer">✕</span>

                <p className="font-jura text-white font-bold text-lg tracking-[2px] m-0">DELETE ACCOUNT</p>

                <div className="flex gap-4">
                    <button onClick={onClose} className="flex-1 py-3.5 bg-transparent text-white font-jura font-bold text-[15px] tracking-[2px] border border-white/40 rounded-[15px] cursor-pointer">
                        CANCEL
                    </button>
                    <button onClick={handleDelete} className="flex-1 py-3.5 bg-white text-black font-jura font-bold text-[15px] tracking-[2px] border-0 rounded-[15px] cursor-pointer">
                        DELETE
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteAccount
