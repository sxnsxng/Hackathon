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
            navigate("/login")
        } catch (err: any) {
            alert(err.message || "Something went wrong.")
        }
    }

    return (
        <div style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
            backgroundColor: "rgba(0,0,0,0.6)",
        }}>
            <div style={{
                backgroundColor: "#111",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "15px",
                padding: "40px",
                width: "480px",
                display: "flex",
                flexDirection: "column",
                gap: "32px",
                position: "relative",
            }}>

                {/* X button */}
                <span
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "16px",
                        right: "20px",
                        color: "#fff",
                        fontSize: "20px",
                        cursor: "pointer",
                    }}
                >✕</span>

                <p style={{
                    color: "#fff",
                    fontFamily: "'Jura', sans-serif",
                    fontWeight: "bold",
                    fontSize: "18px",
                    letterSpacing: "2px",
                    margin: 0,
                }}>
                    DELETE ACCOUNT
                </p>

                <div style={{ display: "flex", gap: "16px" }}>
                    <button
                        onClick={onClose}
                        style={{
                            flex: 1,
                            padding: "14px",
                            backgroundColor: "transparent",
                            color: "#fff",
                            fontFamily: "'Jura', sans-serif",
                            fontWeight: "bold",
                            fontSize: "15px",
                            letterSpacing: "2px",
                            border: "1px solid rgba(255,255,255,0.4)",
                            borderRadius: "15px",
                            cursor: "pointer",
                        }}
                    >
                        CANCEL
                    </button>
                    <button
                        onClick={handleDelete}
                        style={{
                            flex: 1,
                            padding: "14px",
                            backgroundColor: "#fff",
                            color: "#000",
                            fontFamily: "'Jura', sans-serif",
                            fontWeight: "bold",
                            fontSize: "15px",
                            letterSpacing: "2px",
                            border: "none",
                            borderRadius: "15px",
                            cursor: "pointer",
                        }}
                    >
                        DELETE
                    </button>
                </div>

            </div>
        </div>
    )
}

export default DeleteAccount