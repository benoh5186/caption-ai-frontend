

export function Upload(videoFile, setVideoFile) {

    function handleDragOver(event) {
        event.preventDefault()
        setVideoFile(event.dataTransfer.files[0])
    }

    function handleUploadInput(event) {
        event.preventDefault()
        setVideoFile(event.target.files[0])
    }
    return (
        <div>
            <input onDragOver={handleDragOver} onChange={handleUploadInput}>           
            </input>
        </div>

    )



}