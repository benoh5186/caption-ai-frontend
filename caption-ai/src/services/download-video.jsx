import { SessionExpired } from "../errors/session-expired"

export async function downloadVideo(sessionId) {
    const response = await fetch(`http://localhost:8000/api/v1/transcribe/download/${encodeURIComponent(sessionId)}`,
        {
            method: "POST",
            credentials: "include"
        }
    )
    const status = response.status
    if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)

        const link = document.createElement("a")
        link.href = url
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        URL.revokeObjectURL(url)

    } else if (status === 401) {
            throw new SessionExpired("Session expired.")
    } else {
        throw new Error("failed to download. Try again later")
    }

}