import { useState } from "react";
import EditProfile from "./editprofile";
import DeleteAccount from "./deleteaccount";
import Achievement from "../Achievements/achievement";

const Profile: React.FC = () => {

    const [showProfile, setShowProfile] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
    const [username, setUsername] = useState(currentUser.username || "")
    const [showDelete, setShowDelete] = useState(false)

    return (
        <>
            {/* PROFILE ICON — top right trigger */}
            <div
                onClick={() => setShowProfile(true)}
                style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    borderRadius: "999px",
                    padding: "8px 16px",
                    cursor: "pointer",
                }}
            >
                <span style={{
                    color: "#fff",
                    fontFamily: "'Jura', sans-serif",
                    fontWeight: "bold",
                    fontSize: "16px",
                }}>
                    1020 PT.
                </span>
                <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                }}>
                    <img
                        src="/Profile.png"
                        alt="Profile"
                        width="52"
                        height="52"
                        onMouseOver={(e) => (e.currentTarget.src = "/Profile2.png")}
                        onMouseOut={(e) => (e.currentTarget.src = "/Profile.png")}
                    />
                </div>
            </div>

            {/* PROFILE MODAL */}
            {showProfile && (
                <div style={{
                    position: "fixed",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 100,
                    backgroundColor: "rgba(0,0,0,0.6)",
                }}>
                    <div style={{
                        backgroundColor: "#111",
                        border: "1px solid rgba(255,255,255,0.3)",
                        borderRadius: "16px",
                        padding: "32px 40px",
                        width: "70%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                        position: "relative",
                    }}>

                        {/* HEADER */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{
                                color: "#fff",
                                fontFamily: "'Jura', sans-serif",
                                fontWeight: "bold",
                                fontSize: "20px",
                                letterSpacing: "2px",
                            }}>
                                PROFILE
                            </span>
                            <span
                                onClick={() => setShowProfile(false)}
                                style={{ color: "#fff", fontSize: "20px", cursor: "pointer" }}
                            >✕</span>
                        </div>

                        {/* DIVIDER */}
                        <div style={{ borderTop: "1px solid rgba(255,255,255,0.3)" }} />

                        {/* USERNAME */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <span style={{
                                color: "#fff",
                                fontFamily: "'Jura', sans-serif",
                                fontWeight: "bold",
                                fontSize: "14px",
                                letterSpacing: "2px",
                            }}>
                                USERNAME
                            </span>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                <span style={{ color: "#fff", fontSize: "14px" }}>▶</span>
                                <span style={{
                                    color: "#fff",
                                    fontFamily: "'Jura', sans-serif",
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                    letterSpacing: "2px",
                                }}>
                                    {username}
                                </span>
                                <img
                                src="/EditUser.png"
                                onClick={() => setShowEdit(true)}
                                alt="EditUser"
                                style={{ cursor: "pointer", width: "25px", height: "25px" }}
                                onMouseOver={(e) => (e.currentTarget.src = "/EditUser2.png")}
                                onMouseOut={(e) => (e.currentTarget.src = "/EditUser.png")}
                                />
                            </div>
                        </div>

                        {/* SCORE */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <span style={{
                                color: "#fff",
                                fontFamily: "'Jura', sans-serif",
                                fontWeight: "bold",
                                fontSize: "14px",
                                letterSpacing: "2px",
                            }}>
                                SCORE
                            </span>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                <span style={{ color: "#fff", fontSize: "14px" }}>▶</span>
                                <span style={{
                                    color: "#fff",
                                    fontFamily: "'Jura', sans-serif",
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                    letterSpacing: "2px",
                                }}>
                                    1020 PT.
                                </span>
                            </div>
                        </div>

                        {/* ACHIEVEMENT */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <Achievement userId={currentUser.id} />
                        </div>

                        {/* DELETE ACCOUNT — bottom right */}
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <img
                                src="/DeleteAccount.png"
                                onClick={() => setShowDelete(true)}
                                alt="DeleteAccount"
                                style={{ cursor: "pointer", width: "25px", height: "30px" }}
                                onMouseOver={(e) => (e.currentTarget.src = "/DeleteAccount2.png")}
                                onMouseOut={(e) => (e.currentTarget.src = "/DeleteAccount.png")}
                                />
                        </div>

                    </div>
                </div>
            )}

            {/* EDIT USERNAME MODAL */}
            {showEdit && (
                <EditProfile
                    userId={currentUser.id}
                    currentUsername={username}
                    onClose={() => setShowEdit(false)}
                    onSuccess={(newUsername) => {
                        setUsername(newUsername)
                        const stored = JSON.parse(localStorage.getItem("currentUser") || "{}")
                        const updated = { ...stored, username: newUsername }
                        localStorage.setItem("currentUser", JSON.stringify(updated))
                    }}
                />
            )}

            {showDelete && (
                <DeleteAccount
                    userId={currentUser.id}
                    onClose={() => setShowDelete(false)}
                />
            )}

        </>
    )
}

export default Profile