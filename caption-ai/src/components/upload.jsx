import { uploadVideo } from "../services/upload-video";
import { useEffect, useState } from "react";
import "./upload.css"
import {fetchSessionVideo} from "../services/fetch-session-video"

export function Upload({sessionId, onUploadComplete, onError, job, onSetJob, onClearJob}) {
    const[videoUploading, setVideoUploading] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);
    const[uploadFailed, setUploadFailed] = useState(null);
    const [isDragging, setDragging] = useState(false);

    useEffect(() => {
        if (job === null) return;
        if (job?.completed === null) return;
        else if (job?.completed === false) {
            setUploadFailed(true)
            setVideoUrl(null)
            onClearJob()
            setVideoUploading(false);
            return 
        } else if (job?.completed === true) {
            if (videoUrl === null) {
                console.log("Video url is none!")
                setUploadFailed(true)
                setVideoUploading(false);
                return 
            }
            console.log(`here is vid url: ${videoUrl.videoUrl}`)
            onUploadComplete?.(videoUrl)
            onClearJob()
            setVideoUploading(false);
            return 
        }
    }, 
    [job?.completed])

    useEffect(() => {
        if (uploadFailed) onError({"message" : "Failed to upload. Please try again."})
    }, 
    [uploadFailed])

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
        }
    }


    if (videoUploading) {
        return (
            <div>Uploading..</div>
        )
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
