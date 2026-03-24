import { useState, useEffect } from "react"
import { fetchSession } from "../services/fetch-session";

function SessionPage(sessionId) {
    [videoFile, setVideoFile] = useState(null);
    [isLoading, setLoading] = useState(false);
    [transcriptData, setTranscriptData] = useState([]);
    [styleData, setStyleData] = useState({});
    [error, setError] = useState(false);

    useEffect(() => {
        async function loadSession() {
            setLoading(true)
            try {
                const data = fetchSession(sessionId);
                setTranscriptData(data.transcript);
            }
            catch (err) {
                setError(true)
            }
            finally {
                setLoading(false)
            }
        }


    },
    [sessionId])
}