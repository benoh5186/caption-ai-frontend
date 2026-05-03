import { SessionExpired } from "../errors/session-expired"
import { SessionCountLimit } from "../errors/session-count"


export async function createSession() {
    const response = await fetch("/api/v1/create-session", {
        credentials: "include"
    })

    const status = response.status
    if (response.ok) {
        const data = await response.json()
        return data.session_id
    } else if (status === 401) {
        throw new SessionExpired("session expired")
    } else if (status === 403) {
        throw new SessionCountLimit("Can't create anymore sessions")
    } else {
        throw new Error()
    }
}