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
        if (!username.trim()) {
            setError("⚠ Username cannot be empty.")
            return
        }
        try {
            const updated = await userAPI.updateProfile(userId, { username })
            onSuccess(updated.username)
            onClose()
        } catch (err: any) {
            setError("⚠ " + (err.message || "Something went wrong."))
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
                padding: "32px 40px",
                width: "480px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
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

                {/* TITLE */}
                <span style={{
                    color: "#fff",
                    fontFamily: "'Jura', sans-serif",
                    fontWeight: "bold",
                    fontSize: "16px",
                    letterSpacing: "2px",
                }}>
                    EDIT USERNAME
                </span>

                {/* INPUT */}
                <div>
                    <input
                        value={username}
                        onChange={(e) => { setUsername(e.target.value); setError("") }}
                        style={{
                            width: "100%",
                            padding: "12px 16px",
                            backgroundColor: "#000",
                            border: "1px solid rgba(255,255,255,0.3)",
                            borderRadius: "15px",
                            color: "#fff",
                            outline: "none",
                            fontSize: "14px",
                            fontFamily: "'Jura', sans-serif",
                            boxSizing: "border-box",
                        }}
                    />
                    {error && (
                        <p style={{
                            color: "#ff6b6b",
                            fontSize: "12px",
                            margin: "6px 0 0 12px",
                            fontFamily: "'Jura', sans-serif",
                        }}>
                            {error}
                        </p>
                    )}
                </div>

                {/* BUTTONS */}
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
                        onClick={handleConfirm}
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
                        CONFIRM
                    </button>
                </div>

            </div>
        </div>
    )
}

export default EditProfile