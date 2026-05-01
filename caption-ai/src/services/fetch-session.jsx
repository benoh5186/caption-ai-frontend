import { SessionLoadError } from "../errors/session-load-error"
import { SessionNotFound } from "../errors/session-not-found"
import { SessionExpired } from "../errors/session-expired"

export async function fetchSession(sessionId) {
    const response = await fetch(`localhost:8000/api/load-session?${encodeURIComponent(sessionId)}`,
    {credentials: "include"
    })
    const status = response.status
    if (response.ok) {
        const data = await response.json()
        return data 
    } else if (status === 404) {
        throw new SessionNotFound("Session Not Found")
    } else if (status === 401) {
        throw new SessionExpired("Session Expired")
    }
    else {
        throw new SessionLoadError("Failed to load session")
    }
}