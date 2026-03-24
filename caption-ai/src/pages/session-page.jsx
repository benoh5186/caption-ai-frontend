import { useState, useEffect } from "react"
import { fetchSession } from "../services/fetch-session";
import { fetchSessionVideo } from "../services/fetch-session-video";
import { SessionLoadError } from "../errors/session-load-error"
import { VideoLoadError } from "../errors/video-load-error";

function SessionPage(sessionId) {
    [videoFile, setVideoFile] = useState(null);
    [videoUrl, setVideoUrl] = useState(null);
    [isLoading, setLoading] = useState(false);
    [transcriptData, setTranscriptData] = useState([]);
    [styleData, setStyleData] = useState({});
    [error, setError] = useState(false);

    useEffect(() => {
        async function loadSession() {
            setLoading(true)
            try {
                const data = await fetchSession(sessionId);
                setTranscriptData(data.transcript);
                
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


    },
    [sessionId])
}