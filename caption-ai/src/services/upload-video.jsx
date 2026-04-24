

export async function uploadVideo(sessionId, videoFile) {
    const response = await fetch(`localhost:8000/api/upload-video/${encodeURIComponent(sessionId)}`
    , {
        method: "POST",
        headers: {
            "Content-Type" : videoFile.type 
        }, body: videoFile
    })
    if (response.ok) {
        return await response.json()
    } else {
        throw new Error("failed to upload")
    }



}