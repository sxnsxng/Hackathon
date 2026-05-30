import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { authAPI } from "./api";

const createSchema = z.object({
    email: z.string().min(1, "Please fill in all the required information.").email("Invalid email format."),
    username: z.string().min(1, "Please fill in all the required information.").min(3, "Username must be at least 3 characters."),
    password: z.string().min(1, "Please fill in all the required information.").min(6, "Password must be at least 6 characters."),
})

const Register: React.FC = () => {

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<{ email?: string; username?: string; password?: string }>({})
    const navigate = useNavigate()

    const handleSignUp = async () => {
        const result = createSchema.safeParse({ email, username, password })

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors
            setErrors({
                email: fieldErrors.email?.[0],
                username: fieldErrors.username?.[0],
                password: fieldErrors.password?.[0],
            })
            return
        }

        setErrors({})

        try {
            await authAPI.register(email, username, password)
            navigate("/login")
        } catch (err: any) {
            const msg: string = err.message || ""
            if (msg.toLowerCase().includes("username")) {
                setErrors({ username: "This username is already in use." })
            } else if (msg.toLowerCase().includes("email")) {
                setErrors({ email: "This email is already in use." })
            } else {
                alert(msg || "Something went wrong.")
            }
        }
    }

    return (
        <div style={{
            display: "flex",
            height: "100vh",
            width: "100vw",
            overflow: "hidden",
            backgroundImage: "url('/BG1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            alignItems: "center",
            justifyContent: "flex-start",
        }}>
            {/* LEFT PANEL */}
            <div style={{
            width: "700px",
            minWidth: "340px",
            height: "100%",
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 40px",
            gap: "24px",
            }}>
                <h1 style={{
                    fontFamily: "'Jura', sans-serif",
                    color: "#fff",
                    fontSize: "5vw",
                    fontWeight: "normal",
                    margin: "0",    
                }}>
                    7 Days to Survive
                </h1>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div>
                        <input
                            style={{
                                width: "50%",
                                padding: "12px 16px",
                                backgroundColor: "transparent",
                                border: `2px solid ${errors.email ? "#ff6b6b" : "rgba(255, 255, 255, 0.6)"}`,
                                borderRadius: "15px",
                                color: "#fff",
                                outline: "none",
                                fontSize: "14px",
                                boxSizing: "border-box",
                                fontFamily: "'Jura', sans-serif"
                            }}
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                            <p style={{
                                color: "#ff6b6b",
                                fontSize: "12px",
                                margin: "6px 0 0 12px",
                                fontFamily: "'Jura', sans-serif",
                                letterSpacing: "0.5px",
                            }}>
                                ⚠ {errors.email}
                            </p>
                        )}
                    </div>
                    <div>
                        <input
                            style={{
                                width: "50%",
                                padding: "12px 16px",
                                backgroundColor: "transparent",
                                border: `2px solid ${errors.email ? "#ff6b6b" : "rgba(255, 255, 255, 0.6)"}`,
                                borderRadius: "15px",
                                color: "#fff",
                                outline: "none",
                                fontSize: "14px",
                                boxSizing: "border-box",
                                fontFamily: "'Jura', sans-serif"
                            }}
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && (
                            <p style={{
                                color: "#ff6b6b",
                                fontSize: "12px",
                                margin: "6px 0 0 12px",
                                fontFamily: "'Jura', sans-serif",
                                letterSpacing: "0.5px",
                            }}>
                                ⚠ {errors.username}
                            </p>
                        )}
                    </div>
                    <div>
                        <input
                            style={{
                                width: "50%",
                                padding: "12px 16px",
                                backgroundColor: "transparent",
                                border: `2px solid ${errors.email ? "#ff6b6b" : "rgba(255, 255, 255, 0.6)"}`,
                                borderRadius: "15px",
                                color: "#fff",
                                outline: "none",
                                fontSize: "14px",
                                boxSizing: "border-box",
                                fontFamily: "'Jura', sans-serif"
                            }}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                            <p style={{
                                color: "#ff6b6b",
                                fontSize: "12px",
                                margin: "6px 0 0 12px",
                                fontFamily: "'Jura', sans-serif",
                                letterSpacing: "0.5px",
                            }}>
                                ⚠ {errors.password}
                            </p>
                        )}
                    </div>
                </div>

                <button
                    onClick={handleSignUp}
                    style={{
                        width: "50%",
                        padding: "12px",
                        backgroundColor: "#fff",
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: "15px",
                        border: "none",
                        borderRadius: "15px",
                        cursor: "pointer",
                        fontFamily: "'Jura', sans-serif"
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#ccc")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                >
                    Sign Up
                </button>

                <div
                    onClick={() => navigate("/login")}
                    style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
                >
                    <span style={{ color: "#fff", fontSize: "13px" }}>▶</span>
                    <span style={{
                        color: "#fff",
                        fontSize: "13px",
                        fontWeight: "bold",
                        letterSpacing: "3px",
                        fontFamily: "'Jura', sans-serif",
                    }}>
                        Already have an account?
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Register;