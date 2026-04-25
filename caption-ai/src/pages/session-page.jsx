import { useState, useEffect } from "react"
import { fetchSession } from "../services/fetch-session";
import { fetchSessionVideo } from "../services/fetch-session-video";
import { SessionLoadError } from "../errors/session-load-error"
import { VideoLoadError } from "../errors/video-load-error";
import { Upload } from "../components/upload";
import { EditSession } from "../components/edit";
import { defaultStyleData } from "../services/default-style-data";

function SessionPage(sessionId) {
    const [videoUrl, setVideoUrl] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [transcriptData, setTranscriptData] = useState(null);
    const [styleData, setStyleData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function loadSession() {
            setLoading(true)
            try {
                const data = await fetchSession(sessionId);
                const videoData = await fetchSessionVideo(sessionId);
                setVideoUrl(videoData)
                if (data.transcript) {
                    setTranscriptData(data.transcript);
                    if (data.session_info) {
                        setStyleData(data.session_info)
                    } else {
                        const defaultStyle = defaultStyleData(transcriptData);
                        setStyleData(defaultStyle);
                    }
                }
            }
            catch (err) {
                if (err instanceof SessionLoadError || err instanceof VideoLoadError) {
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

    if (isLoading) {
        return (
            <h1>Loading..</h1>
        )
    }

    return (
        <div>    
            videoUrl ? <Upload 
            sessionId={sessionId}
            onUploadComplete={({videoUrl}) => {
                setVideoUrl(videoUrl)
            }}
            /> : 
            <EditSession 
                sessionId={sessionId}
                videoUrl={videoUrl} 
                styleData={styleData} 
                transcript={transcriptData}
                onTranscribe={({transcript, sessionInfo}) => {
                    setTranscriptData(transcript)
                    setStyleData(sessionInfo)
                }}
                />

        </div>)
    }


