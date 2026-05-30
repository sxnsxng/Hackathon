import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod"
import { authAPI } from "./api";

const loginSchema = z.object({
    email: z.string().min(1, "Please fill in all the required information.").email("Invalid email format."),
    password: z.string().min(1, "Please fill in all the required information.")
})

const Login: React.FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
    const navigate = useNavigate()

    const handleLogin = async () => {
        const result = loginSchema.safeParse({ email, password })
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors
            setErrors({ email: fieldErrors.email?.[0], password: fieldErrors.password?.[0] })
            return
        }
        setErrors({})
        try {
            const user = await authAPI.login(email, password)
            localStorage.setItem("currentUser", JSON.stringify(user))
            navigate("/Main")
        } catch (err: any) {
            alert(err.message || "Invalid email or password.")
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
                        {errors.email && (
                            <p className="text-[#ff6b6b] text-xs mt-1.5 ml-3 font-jura tracking-[0.5px]">
                                ⚠ {errors.email}
                            </p>
                        )}
                    </div>
                    <div>
                        <input
                            className={`w-1/2 px-4 py-3 bg-transparent border-2 ${errors.password ? "border-[#ff6b6b]" : "border-white/60"} rounded-[15px] text-white outline-none text-sm font-jura`}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                            <p className="text-[#ff6b6b] text-xs mt-1.5 ml-3 font-jura tracking-[0.5px]">
                                ⚠ {errors.password}
                            </p>
                        )}
                    </div>
                </div>

                <button
                    onClick={handleLogin}
                    className="w-1/2 py-3 bg-white text-black font-bold text-[15px] border-0 rounded-[15px] cursor-pointer font-jura hover:bg-[#ccc] transition-colors"
                >
                    Log In
                </button>

                <div onClick={() => navigate("/Register")} className="flex items-center gap-2 cursor-pointer">
                    <span className="text-white text-sm">▶</span>
                    <span className="text-white text-sm font-bold tracking-[3px] font-jura">REGISTER</span>
                </div>
            </div>
        </div>
    )
}

export default Login;
