import { uploadVideo } from "../services/upload-video";
import { useState } from "react";

export function Upload({sessionId, onUploadComplete}) {
    const[videoUploading, setVideoUploading] = useState(false);
    const[uploadFailed, setUploadFailed] = useState(false);
    const [isDragging, setDragging] = useState(false);

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
            await uploadVideo(sessionId, videoFile)
            onUploadComplete?.({videoUrl: URL.createObjectURL(videoFile)} )
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
    return (
        <div onDragOver={handleDragOver} onDrop={handleDrop}>
            upload video 
            <input
                type="file"
                accept="video/*"
                onChange={handleUploadInput}
            />
            {isDragging && <p>Drop video here</p>}
            {uploadFailed && <p role="alert">Upload failed. Please try again.</p>}
        </div>

    )



}
