import { SessionLoadError } from "../errors/session-load-error"

export async function fetchSession(sessionId) {
    const response = await fetch(`example.com/api/load-session?${encodeURIComponent(sessionId)}`)
    if (response.ok) {
        const data = await response.json()
        return data 
    } else {
        throw new SessionLoadError("Failed to load session")
    }
}