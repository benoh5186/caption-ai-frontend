import { SessionExpired } from "../errors/session-expired"

export async function downloadVideo(jobId) {
    const response = await fetch(`http://localhost:8000/api/v1/transcribe/download/${encodeURIComponent(jobId)}`,
        {
            method: "POST",
            credentials: "include"
        }
    )
    const status = response.status
    if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const disposition = response.headers.get("Content-Disposition")
        let filename = "captioned-video.mp4"
        if (disposition) {
            const match = disposition.match(/filename="?([^"]+)"?/)
            if (match) filename = match[1]
        }

        const link = document.createElement("a")
        link.href = url
        link.download = filename

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        setTimeout(() => URL.revokeObjectURL(url), 1000)
        return

    } else if (status === 401) {
            throw new SessionExpired("Session expired.")
    } else {
        throw new Error("failed to download. Try again later")
    }

}