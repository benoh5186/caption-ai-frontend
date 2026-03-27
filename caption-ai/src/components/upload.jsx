

export function Upload(videoFile, setVideoFile) {
    [videoUploading, setVideoUploading] = useState(false);

    function handleDragOver(event) {
        event.preventDefault()
        setVideoFile(event.dataTransfer.files[0])
        setVideoUploading(true);
    }

    function handleUploadInput(event) {
        event.preventDefault()
        setVideoFile(event.target.files[0])
        setVideoUploading(true);
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