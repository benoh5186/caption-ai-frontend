import { useState, useEffect } from "react"
import { fetchSession } from "../services/fetch-session";
import { fetchSessionVideo } from "../services/fetch-session-video";
import { SessionLoadError } from "../errors/session-load-error"
import { VideoLoadError } from "../errors/video-load-error";
import { Upload } from "../components/upload";
import { EditSession } from "../components/edit";

function SessionPage(sessionId) {
    const [videoFile, setVideoFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [transcriptData, setTranscriptData] = useState([]);
    const [styleData, setStyleData] = useState({});
    const [error, setError] = useState(false);

    useEffect(() => {
        async function loadSession() {
            setLoading(true)
            try {
                const data = await fetchSession(sessionId);
                setTranscriptData(data.transcript);
                setStyleData(data.session_info)
                const videoData = await fetchSessionVideo(data.s3_key)
                setVideoUrl(videoData)
            }
            catch (err) {
                if (err instanceof SessionLoadError) {
                    setError(true)
                } 
            }
            finally {
                setLoading(false)
            }
        }
        loadSession()
    },
    [sessionId])
    if (error) {
        return (
             <h1>Error: {error}</h1>
            )
    }

    return (
        <div>
            
            transcriptData ? <Upload 
            videoFile={videoFile} 
            setVideoFile={setVideoFile}
            /> : 
            <EditSession styleData={styleData} transcript={transcriptData}/>

        </div>)
    }


