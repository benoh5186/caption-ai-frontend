

export async function uploadVideo(sessionId, videoFile) {
    const formData = new FormData();
    formData.append("video", videoFile);

    const response = await fetch(`http://localhost:8000/api/v1/session/upload-video/${encodeURIComponent(sessionId)}`
    , {
        method: "POST",
        credentials: "include",
        body: formData,
    })

    if (response.ok) {
        return
    }

    const message = await response.text()
    throw new Error(message || "failed to upload")
}
