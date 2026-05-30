import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Logout: React.FC = () => {

    const [showLogout, setShowLogout] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("currentUser")
        navigate("/login")
    }

    return (
        <>
            {/* LOGOUT ICON */}
            <div
                onClick={() => setShowLogout(true)}
                style={{
                    position: "absolute",
                    bottom: "24px",
                    right: "24px",
                    cursor: "pointer",
                }}
            >
                <img
                    src="/Logout.png"
                    alt="Logout"
                    style={{ cursor: "pointer", width: "3vw", height: "3vw" }}
                    onMouseOver={(e) => (e.currentTarget.src = "/Logout2.png")}
                    onMouseOut={(e) => (e.currentTarget.src = "/Logout.png")}
                />
            </div>

            {/* LOGOUT MODAL */}
            {showLogout && (
                <div style={{
                    position: "fixed",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 100,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                }}>
                    <div style={{
                        backgroundColor: "#111",
                        border: "1px solid rgba(255,255,255,0.3)",
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
                            onClick={() => setShowLogout(false)}
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
                            textAlign: "center",
                        }}>
                            DO YOU WANT LOGOUT
                        </p>

                        <div style={{ display: "flex", gap: "16px" }}>
                            <button
                                onClick={() => setShowLogout(false)}
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
                                onClick={handleLogout}
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