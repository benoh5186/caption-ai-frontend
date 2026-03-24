import { useState, useEffect } from "react"
import { fetchSession } from "../services/fetch-session";

function SessionPage(sessionId) {
    [videoFile, setVideoFile] = useState(null);
    [isLoading, setLoading] = useState(false);
    [transcriptData, setTranscriptData] = useState([]);
    [styleData, setStyleData] = useState({});

    useEffect(() => {


    },
    [sessionId])
}