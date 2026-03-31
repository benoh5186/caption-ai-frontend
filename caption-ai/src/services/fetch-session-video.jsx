import { VideoLoadError } from "../errors/video-load-error"
import { VideoNotFound } from "../errors/video-not-found"

export async function fetchSessionVideo(s3Object) {
    const response = await fetch(`localhost:8000/api/load-video?${encodeURIComponent(s3Object)}`)
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