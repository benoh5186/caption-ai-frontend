import { useState, useEffect } from "react"
import { fetchSession } from "../services/fetch-session";
import { fetchSessionVideo } from "../services/fetch-session-video";
import { SessionLoadError } from "../errors/session-load-error"
import { VideoLoadError } from "../errors/video-load-error";
import { Upload } from "../components/upload";
import { EditSession } from "../components/edit";

function SessionPage(sessionId) {
    const [videoUrl, setVideoUrl] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [transcriptData, setTranscriptData] = useState([]);
    const [sessionData, setSessionData] = useState({});
    const [styleData, setStyleData] = useState({});
    const [s3Key, setS3Key] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function loadSession() {
            setLoading(true)
            try {
                const data = await fetchSession(sessionId);
                setTranscriptData(data.transcript);
                setStyleData(data.session_info)
                if (data.s3_key) {
                    setS3Key(data.s3_key)
                    const videoData = await fetchSessionVideo(s3Key)
                    setVideoUrl(videoData)
                }
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
            videoUrl ? <Upload 
            sessionId={sessionId}
            onUploadComplete={({videoUrl, s3Key}) => {
                setVideoUrl(videoUrl)
                setS3Key(s3Key)

            }}
            /> : 
            <EditSession videoUrl={videoUrl} styleData={styleData} transcript={transcriptData}/>

        </div>)
    }


