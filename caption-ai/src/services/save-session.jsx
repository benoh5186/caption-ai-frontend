import { SessionExpired } from "../errors/session-expired"

export async function saveSession(sessionId, title, transcript, styleData) {
    const response = await fetch(`http://localhost:8000/api/v1/sessions/save-session/${encodeURIComponent(sessionId)}`, 
        {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(
                {
                    title : title,
                    transcript: transcript,
                    styleData: styleData
                }
            )
        }
    )
    if (response.ok) {
        return
    } else if (status === 401) {
        throw new SessionExpired("Session expired.")
    } else {
        throw new Error("Unexpected error has occurred. Please try again")
    }
}