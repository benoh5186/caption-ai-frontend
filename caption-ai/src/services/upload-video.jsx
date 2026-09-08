

export async function uploadVideo(sessionId, videoFile) {
    const formData = new FormData();
    formData.append("video", videoFile);
    const videoType = videoFile.type 
    const response = await fetch(`http://localhost:8000/api/v1/session/upload-video-v2/${encodeURIComponent(sessionId)}`
    , {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({"Content-Type" : videoType}),
    })

    if (response.ok) {
        const data = await response.json()
        const uploadResponse = await fetch(data.upload_url, 
            {
                method: "PUT",
                headers : {
                    "Content-Type" : videoType
                },
                body : videoFile
            }
        )
        if (!uploadResponse.ok) {
            throw new Error("Failed to Upload")
        } else {
            const videoJob = await fetch(`http://localhost:8000/api/v1/session/save-video-metadata/${sessionId}`)
            if (videoJob.ok) {
                const vidJobResponse = await videoJob.json()
                return vidJobResponse.job_id 
            } else {
                throw new Error("Failed to enqueue video job")
            }
        }


    }

    const message = await response.text()
    throw new Error(message || "failed to upload")
}
