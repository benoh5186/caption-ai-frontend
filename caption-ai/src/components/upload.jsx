import { uploadVideo } from "../services/upload-video";
import { useEffect, useState } from "react";

export function Upload({sessionId, onUploadComplete, onError, job, onSetJob, onClearJob}) {
    const[videoUploading, setVideoUploading] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);
    const[uploadFailed, setUploadFailed] = useState(false);
    const [isDragging, setDragging] = useState(false);

    useEffect(() => {
        if (job === null) return;
        if (job?.completed === null) return;
        else if (job?.completed === false) {
            setUploadFailed(true)
            setVideoUrl(null)
            onClearJob()
            return 
        } else if (job?.completed === true) {
            if (videoUrl === null) {
                setUploadFailed(true)
                return 
            }
            onUploadComplete?.(videoUrl.videoUrl)
            onClearJob()
            return 
        }
    }, 
    [job?.completed])

    async function handleDragOver(event) {
        event.preventDefault()
        setDragging(true);
    }

    async function handleDrop(event) {
        event.preventDefault()
        setDragging(false);
        const videoFile = event.dataTransfer.files[0]
        handleUpload(videoFile);
    }

    async function handleUploadInput(event) {
        event.preventDefault()
        const videoFile = event.target.files[0];
        handleUpload(videoFile);
    }

    async function handleUpload(videoFile) {
        if (!videoFile) {
            setUploadFailed(true);
            return
        }

        setVideoUploading(true);
        setUploadFailed(false);
        try {
            const uploadJobId = await uploadVideo(sessionId, videoFile)
            onSetJob(uploadJobId)
            setVideoUrl({videoUrl: URL.createObjectURL(videoFile)})
        } 
        catch {
            setUploadFailed(true);
        } finally {
            setVideoUploading(false);
        }
    }


    if (videoUploading) {
        return (
            <div>Uploading..</div>
        )
    }
    if (uploadFailed) {
        onError({"message" : "Failed to upload. Please try again."})
    }
    return (
        <div onDragOver={handleDragOver} onDrop={handleDrop}>
            upload video 
            <input
                type="file"
                accept="video/*"
                onChange={handleUploadInput}
            />
            {isDragging && <p>Drop video here</p>}
        </div>

    )



}
