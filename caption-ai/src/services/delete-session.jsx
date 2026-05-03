import { SessionExpired } from "../errors/session-expired"

export async function deleteSession(sessionId) {
    const response = await fetch(`/api/v1/delete-session?session_id=${encodeURIComponent(sessionId)}`, {
        method: "DELETE",
        credentials: "include"
    })
    const status = response.status 

    if (response.ok) {
        return
    } else if (status === 401) {
        throw new SessionExpired("Session expired.")
    } else {
        throw new Error("Unexpected error has occurred. Please try again")
    }
}
