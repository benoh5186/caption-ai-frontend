import { VideoLoadError } from "../errors/video-load-error"

export async function fetchSessionVideo(s3Object) {
    const response = await fetch(`localhost:8000/api/load-video?${encodeURIComponent(s3Object)}`)
    if (response.ok) {
        const videoBlob = await response.blob()
        return URL.createObjectURL(videoBlob)
    } else {
        throw new VideoLoadError("Failed to load video")
    }
}