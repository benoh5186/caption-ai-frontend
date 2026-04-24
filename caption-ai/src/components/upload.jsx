import { uploadVideo } from "../services/upload-video";

export function Upload(sessionId, onUploadComplete) {
    const[videoUploading, setVideoUploading] = useState(false);
    const[uploadFailed, setUploadFailed] = useState(false);
    const [isDragging, setDragging] = useState(false);

    async function handleDragOver(event) {
        event.preventDefault()
        setDragging(true);
        const videoFile = event.dataTransfer.files[0]
        handleUpload(videoFile);
    }

    async function handleUploadInput(event) {
        event.preventDefault()
        const videoFile = event.target.files[0];
        handleUpload(videoFile);
    }

    async function handleUpload(videoFile) {
        setVideoUploading(true);
        setUploadFailed(false);
        try {
            await uploadVideo(sessionId, videoFile)
            onUploadComplete?.({videoUrl: videoFile} )
        } 
        catch (error) {
            setUploadFailed(true);
        }
    }


    if (videoUploading) {
        return (
            <div>Uploading..</div>
        )
    }
    return (
        <div>
            upload video 
            <input onDragOver={handleDragOver} onChange={handleUploadInput}>           
            </input>
        </div>

    )



}
