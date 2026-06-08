import { SessionExpired } from "../errors/session-expired"

export async function fetchTranscript(sessionId, endpointType) {
    const response = await fetch(`http://localhost:8000/api/v1/transcribe/${endpointType}/${encodeURIComponent(sessionId)}`,
    {
        method: "POST",
        credentials: "include",
    })
    const status = response.status
    if (response.ok) {
        return await response.json()
    } else if (status === 401) {
        throw new SessionExpired("Session Expired")
    } else {
        throw new Error()
    }
}