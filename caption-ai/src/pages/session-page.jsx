import { useState, useEffect, useRef } from "react"
import { fetchSession } from "../services/fetch-session";
import { fetchSessionVideo } from "../services/fetch-session-video";
import { SessionLoadError } from "../errors/session-load-error"
import { SessionExpired } from "../errors/session-expired"
import { VideoLoadError } from "../errors/video-load-error";
import { JobNotFound } from "../errors/job-not-found";
import { Upload } from "../components/upload";
import { EditSession } from "../components/edit";
import { defaultStyleData } from "../services/default-style-data";
import { autoSave, requestSave } from "../services/save-session";
import { checkJobStatus } from "../services/check-job-status";

export default function SessionPage({sessionId, onSessionExpired}) {
    const [videoUrl, setVideoUrl] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [transcriptData, setTranscriptData] = useState(null);
    const [styleData, setStyleData] = useState(null);
    const [title, setTitle] = useState(null);
    const [error, setError] = useState(null);
    const latestSessionRef = useRef(null);
    const saveInFlightRef = useRef(false);
    const pendingSaveRef = useRef(false);
    const [job, setJob] = useState(null);

    useEffect(() => {
        if (job === null) return;
        const intervalId = setInterval(async () => {
            try {
                const status = await checkJobStatus(job.jobId)
                setJob((prev) => ({...prev, completed: status}))
                if (status === true || status === false) {
                    clearInterval(intervalId)
                } 
            }
            catch (err) {
                if (err instanceof JobNotFound) {
                    setJob(null)
                } else if (err instanceof SessionExpired) {
                    onSessionExpired()
                }
                clearInterval(intervalId)
            }

        }, 10000)
        return () => clearInterval(intervalId)
    },[job?.jobId])



    useEffect(() => {
        async function loadSession() {
            setLoading(true)
            try {
                const data = await fetchSession(sessionId);
                const videoData = await fetchSessionVideo(sessionId);
                setVideoUrl(videoData)
                setTitle(data.title)
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
                else if (err instanceof SessionExpired) {
                    onSessionExpired()
                }
            }
            finally {
                setLoading(false)
            }
        }
        loadSession()

        return () => {
            const sessionData = latestSessionRef.current
            if (!sessionData?.transcriptData || !sessionData?.styleData) {
              return;
            }
            requestSave(
                sessionId, 
                latestSessionRef,
                pendingSaveRef,
                saveInFlightRef
            )
        }
    },
    [sessionId])

    useEffect(() => {
        latestSessionRef.current = {
            styleData: styleData,
            transcriptData: transcriptData,
            title: title
        }
        const timeOutId = autoSave(
                        sessionId, 
                        latestSessionRef, 
                        pendingSaveRef,
                        saveInFlightRef
                    )
        return () => clearTimeout(timeOutId)
    }, [styleData, transcriptData, title])


    if (isLoading) {
        return (
            <h1>Loading..</h1>
        )
    }

    return (
        <div>
            {error && (
            <p className="error"> {error.message} </p>
            )}
            <input
                className="session-title"
                value={title ?? ""}
                onChange={(event) => setTitle(event.target.value)}
            />

            {videoUrl ? (
                <EditSession 
                    sessionId={sessionId}
                    videoUrl={videoUrl} 
                    styleData={styleData} 
                    setStyleData={setStyleData}
                    setTranscript={setTranscriptData}
                    transcript={transcriptData}
                    onTranscribe={({ transcriptData, styleData }) => {
                        setTranscriptData(transcriptData)
                        setStyleData(styleData)
                    }}
                    onSessionExpired={onSessionExpired}
                    onError = {(err) => {
                        setError(err)
                    }}
                    job={job}
                    onSetJob={(jobId) => {
                        setJob({jobId : jobId, completed: null})
                    }}
                    onClearJob={() => setJob(null)}
                />
            ) : (
                <Upload 
                    sessionId={sessionId}
                    onUploadComplete={({ videoUrl }) => {
                        setVideoUrl(videoUrl)
                    }}
                    onError={(err) => {
                        setError(err)
                    }}
                />
            )}
        </div>
    )

    }


