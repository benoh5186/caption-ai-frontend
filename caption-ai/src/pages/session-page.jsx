import { useState } from "react"

function SessionPage() {
    [videoFile, setVideoFile] = useState(null);
    [isLoading, setLoading] = useState(false);
    [transcriptData, setTranscriptData] = useState([]);
    [styleData, setStyleData] = useState({});
}