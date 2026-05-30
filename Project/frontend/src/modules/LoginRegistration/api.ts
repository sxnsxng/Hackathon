import axios from "axios";

// API base URL
const BASE = "/api"

// axios instance
const api = axios.create({
    baseURL: BASE,
    headers: { "Content-Type": "application/json" },
})

// helper
async function request<T>(path: string, options?: { method?: string; data?: any; params?: any }): Promise<T> {
    const res = await api.request({
        url: path,
        method: options?.method ?? "GET",
        data: options?.data,
        params: options?.params,
    })
    if (!res.data.success) throw new Error(res.data.message)
    return res.data.data
}

// ─── AUTH ────────────────────────────────────────────────────────────────────
export const authAPI = {
    login: (email: string, password: string) =>
        request<{ id: number; email: string; username: string; profile: string | null }>(
            "/auth/login", { method: "POST", data: { email, password } }
        ),

    register: (email: string, username: string, password: string) =>
        request<{ id: number; email: string; username: string }>(
            "/auth/register", { method: "POST", data: { email, username, password } }
        ),
}
// ─── USERS ───────────────────────────────────────────────────────────────────
export const userAPI = {
    getProfile: (id: number) =>
        request<{ id: number; email: string; username: string; profile: string | null; createdAt: string }>(
            `/users/${id}`
        ),

    // แก้ username และ/หรือ profile avatar URL
    updateProfile: (id: number, data: { username?: string; profile?: string }) =>
        request<{ id: number; email: string; username: string; profile: string | null }>(
            `/users/${id}`, { method: "PUT", data }
        ),

    changePassword: (id: number, currentPassword: string, newPassword: string) =>
        request<null>(`/users/${id}/password`, {
            method: "PUT", data: { currentPassword, newPassword }
        }),

    deleteAccount: (id: number) =>
        request<null>(`/users/${id}`, { method: "DELETE" }),
}

// ─── ACHIEVEMENTS ─────────────────────────────────────────────────────────────

export interface AchievementAPI {
    id: number
    name: string
    description: string
    icon: string | null
}

export const achievementAPI = {
    // get all achievements
    getAll: () =>
        request<AchievementAPI[]>("/achievements"),

    // get unlocked achievements for a user
    getUnlocked: (userId: number) =>
        request<AchievementAPI[]>(`/achievements/${userId}`),

    // unlock an achievement
    unlock: (userId: number, achievementId: number) =>
        request<AchievementAPI>(`/achievements/${userId}/${achievementId}`, {
            method: "POST"
        }),
}
