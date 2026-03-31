import { uploadVideo } from "../services/upload-video";

export function Upload(sessionId, setVideoUrl) {
    const[videoUploading, setVideoUploading] = useState(false);
    const[uploadFailed, setUploadFailed] = useState(false);
    const [isDragging, setDragging] = useState(false);

    //TODO: post uploaded video to the backend, and then render component(to be made) that prompts user to transcribe the video
    //TODO: after user clicks "transcribe or translate", make api call to fetch transcribe and set transcriptData and stylesData with their setters.
    async function handleDragOver(event) {
        event.preventDefault()
        setDragging(true);
        const videoFile = event.dataTransfer.files[0]
        handleUpload(videoFile);
    }

    async function handleUploadInput(event) {
        event.preventDefault()
        const videoFile = event.target.files[0]
        setVideoUploading(true);
        setUploadFailed(false);
        handleUpload(videoFile);
    }

    async function handleUpload(videoFile) {
        setVideoUploading(true);
        setUploadFailed(false);
        try {
            await uploadVideo(sessionId, videoFile)
            setVideoUrl(URL.createObjectURL(videoFile))
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
