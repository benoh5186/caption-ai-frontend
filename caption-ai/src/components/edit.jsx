import {useState, useRef} from "react"
import {StylesTab, SubtitlesTab, SettingsTab, TranscribeTab} from "../components/tabs"
import { fetchTranscript } from "../services/fetch-transcript";
import { defaultStyleData } from "../services/default-style-data";
import Subtitle from "./subtitle";
import { SessionExpired } from "../errors/session-expired";

export function EditSession({ sessionId, videoUrl, styleData, setStyleData, transcript, setTranscript, onTranscribe, onSessionExpired }) {
    const hasTranscript = transcript != null;
    const [currentTime, setCurrentTime] = useState(0);
    const videoRef = useRef(null);

    function handleVideoTimeChange(newTime) {
        setCurrentTime(newTime)
        if (videoRef.current) {
            videoRef.current.currentTime = newTime
        }
    }


    return (
        <div className="video-edit-section" id="video-edit-section" >
            <div className="video-preview" id="video-preview">
                <video
                    ref={videoRef} 
                    className="video-player" 
                    id="video-player" 
                    controls src={videoUrl}
                    onTimeUpdate={(event) => {
                        setCurrentTime(event.currentTarget.currentTime);
                    }}
                    >
                </video>
                <div className="subtitle-container" id="subtitle-container">
                    {hasTranscript && (
                      <Subtitle
                        styleData={styleData}
                        transcript={transcript}
                        timeStamp={currentTime}
                      />
                    )}
                </div>
            </div>

            {hasTranscript ? (
                <EditSideBar 
                    styleData={styleData} 
                    setStyleData={setStyleData}
                    transcript={transcript}
                    setTranscript={setTranscript}
                    currentTime={currentTime}
                    setCurrentTime={handleVideoTimeChange}
                     />
            ) : (
                <PreEditSideBar 
                    sessionId={sessionId} 
                    onTranscribe={onTranscribe} 
                    onSessionExpired={onSessionExpired} 
                    />
            )}
        </div>
    )
}

function EditSideBar({ styleData, setStyleData, transcript, setTranscript, currentTime, setCurrentTime}) {
    const [activeTab, setTab] = useState("styles");

    function handleTabClick(tab) {
        switch(tab) {
            case "styles":
                setTab("styles");
                break;
            case "subtitles":
                setTab("subtitles");
                break;
            case "options":
                setTab("options");
                break;
            default:
                setTab("styles");
        }
    }

    function renderTabContent() {
        switch(activeTab) {
            case "styles":
                return <StylesTab 
                            stylesData={styleData} 
                            onStyleChange={(updates) => {
                                setStyleData((current) => {
                                    const next = current ?? defaultStyleData();

                                    return {
                                        ...next,
                                        globalStyle: {
                                            ...next.globalStyle,
                                            ...updates
                                        }
                                    }
                                })
                            }}/>
            case "subtitles":
                return <SubtitlesTab 
                            transcript={transcript} 
                            setTranscript={setTranscript}
                            currentTime={currentTime}
                            setCurrentTime={setCurrentTime}
                            />
            case "options":
                return <SettingsTab/>
            default:
                return <StylesTab 
                            stylesData={styleData}
                            onStyleChange={(updates) => {
                                setStyleData((current) => {
                                    const next = current ?? defaultStyleData();

                                    return {
                                        ...next,
                                        globalStyle: {
                                            ...next.globalStyle,
                                            ...updates
                                        }
                                    }
                                })
                            }}/>
        }
    }
    return (
        <div className="task-editor" id="task-editor">
            <div className="task-choices">
                <button className="task-tab" id="task-styles" onClick={() => handleTabClick("styles")}>
                    ✨ Styles
                </button>
                <button className="task-tab" id="task-subtitles" onClick={() => handleTabClick("subtitles")}>
                    💬 Subtitles
                </button>
                <button className="task-tab" id="task-options" onClick={() => handleTabClick("options")}>
                    🔧 Options
                </button>
            </div>
            <div>
                {renderTabContent()}
            </div>
        </div>
    )

}

function PreEditSideBar({sessionId, onTranscribe, onSessionExpired}) {
    const [error, setError] = useState(false);
    async function handleTranscribe() {
        setError(false)
        try {
            const transcriptData = await fetchTranscript(sessionId)
            const styleData = defaultStyleData(transcriptData)
            onTranscribe?.({transcriptData, styleData})
        }
        catch (err) {
            if (err instanceof SessionExpired) {
                onSessionExpired()
            } else {
                setError(true)
            }
        }
    }

    return(
        <div className="task-editor" id="task-editor">
            {error && (
                <p className="error"> Error has occurred. Please try again</p>
            )}
            <div className="task-choices">
                <button className="task-tab" id="task-transcribe" onClick={handleTranscribe}>
                    Transcribe
                </button>
            </div>
            <div>
                <TranscribeTab/>
            </div>
        </div>
    )
        
}
