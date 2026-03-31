

export function Upload(videoUrl, setVideoUrl, setTranscriptData, setStyleData) {
    [videoUploading, setVideoUploading] = useState(false);

    //TODO: post uploaded video to the backend, and then render component(to be made) that prompts user to transcribe the video
    //TODO: after user clicks "transcribe or translate", make api call to fetch transcribe and set transcriptData and stylesData with their setters.
    function handleDragOver(event) {
        event.preventDefault()
        const videoFile = event.dataTransfer.files[0]
        setVideoUploading(true);
    }

    function handleUploadInput(event) {
        event.preventDefault()
        const videoFile = event.target.files[0]
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
