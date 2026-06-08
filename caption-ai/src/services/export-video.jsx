import { SessionExpired } from "../errors/session-expired"

export async function exportVideo(sessionId) {
    const response = await fetch(`http://localhost:8000/api/v1/transcribe/export/${encodeURIComponent(sessionId)}`, {
        method: "POST",
        credentials: "include"
    })
    const status = response.status
    if (response.ok) {
        return await response.json()
    } else if (status === 401) {
        throw new SessionExpired("Session expired.")
    } else {
        throw new Error("failed to export. Try again later")
        }
}