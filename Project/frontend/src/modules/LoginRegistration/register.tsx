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
            setErrors({ email: fieldErrors.email?.[0], username: fieldErrors.username?.[0], password: fieldErrors.password?.[0] })
            return
        }
        setErrors({})
        try {
            await authAPI.register(email, username, password)
            navigate("/Login")
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
        <div
            className="flex h-screen w-screen overflow-hidden items-center justify-start"
            style={{ backgroundImage: "url('/BG1.png')", backgroundSize: "cover", backgroundPosition: "center" }}
        >
            <div className="w-[700px] min-w-[340px] h-full flex flex-col justify-center px-10 gap-6">

                <h1 className="font-jura text-white text-[5vw] font-normal m-0">
                    7 Days to Survive
                </h1>

                <div className="flex flex-col gap-4">
                    <div>
                        <input
                            className={`w-1/2 px-4 py-3 bg-transparent border-2 ${errors.email ? "border-[#ff6b6b]" : "border-white/60"} rounded-[15px] text-white outline-none text-sm font-jura`}
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="text-[#ff6b6b] text-xs mt-1.5 ml-3 font-jura">⚠ {errors.email}</p>}
                    </div>
                    <div>
                        <input
                            className={`w-1/2 px-4 py-3 bg-transparent border-2 ${errors.username ? "border-[#ff6b6b]" : "border-white/60"} rounded-[15px] text-white outline-none text-sm font-jura`}
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && <p className="text-[#ff6b6b] text-xs mt-1.5 ml-3 font-jura">⚠ {errors.username}</p>}
                    </div>
                    <div>
                        <input
                            className={`w-1/2 px-4 py-3 bg-transparent border-2 ${errors.password ? "border-[#ff6b6b]" : "border-white/60"} rounded-[15px] text-white outline-none text-sm font-jura`}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="text-[#ff6b6b] text-xs mt-1.5 ml-3 font-jura">⚠ {errors.password}</p>}
                    </div>
                </div>

                <button
                    onClick={handleSignUp}
                    className="w-1/2 py-3 bg-white text-black font-bold text-[15px] border-0 rounded-[15px] cursor-pointer font-jura hover:bg-[#ccc] transition-colors"
                >
                    Sign Up
                </button>

                <div onClick={() => navigate("/Login")} className="flex items-center gap-2 cursor-pointer">
                    <span className="text-white text-sm">▶</span>
                    <span className="text-white text-sm font-bold tracking-[3px] font-jura">Already have an account?</span>
                </div>
            </div>
        </div>
    )
}

export default Register;
