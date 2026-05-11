import { VideoLoadError } from "../errors/video-load-error"
import { VideoNotFound } from "../errors/video-not-found"

export async function fetchSessionVideo(sessionId) {
    const response = await fetch(`http://localhost:8000/api/v1/session/load-session-video/${encodeURIComponent(sessionId)}`,
    {
        method: "POST",
        credentials: "include"
    }
)
    const responseStatus = response.status 
    if (response.ok) {
        const videoBlob = await response.blob()
        return URL.createObjectURL(videoBlob)
    } else if (responseStatus == 404) {
        throw new VideoNotFound("Video not found")
    }
    else {
        throw new VideoLoadError("Failed to load video")
    }
}