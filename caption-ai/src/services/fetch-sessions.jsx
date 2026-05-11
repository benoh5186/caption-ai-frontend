import { SessionLoadError } from "../errors/session-load-error"
import { SessionExpired } from "../errors/session-expired"

export async function fetchSessions() {
    const response = await fetch(`http://localhost:8000/api/v1/session/load-sessions`,
    {credentials: "include"})
    const status = response.status
    if (response.ok) {
        const data = await response.json()
        return data 
    } else if (status === 401) {
        throw new SessionExpired("Session expired.")
    }
    else {
        throw new SessionLoadError("Failed to load session")
    }
}