import {useState, useRef} from "react"
import {StylesTab, SubtitlesTab, SettingsTab} from "../components/tabs"
import { fetchTranscript } from "../services/fetch-transcript";
import { defaultStyleData } from "../services/default-style-data";
import Subtitle from "./subtitle";
import { SessionExpired } from "../errors/session-expired";

export function EditSession({ sessionId, videoUrl, styleData, setStyleData, transcript, setTranscript, onTranscribe, onSessionExpired, onError }) {
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
                    sessionId={sessionId}
                    styleData={styleData} 
                    setStyleData={setStyleData}
                    transcript={transcript}
                    setTranscript={setTranscript}
                    currentTime={currentTime}
                    setCurrentTime={handleVideoTimeChange}
                    onSessionExpired={onSessionExpired}
                    onError={onError}
                     />
            ) : (
                <PreEditSideBar 
                    sessionId={sessionId} 
                    onTranscribe={onTranscribe} 
                    onSessionExpired={onSessionExpired} 
                    onError={onError}
                    />
            )}
        </div>
    )
}

function EditSideBar({ sessionId, styleData, setStyleData, transcript, setTranscript, currentTime, setCurrentTime, onSessionExpired, onError}) {
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
                            styleData={styleData}
                            setStyleData={setStyleData}
                            />
            case "options":
                return <SettingsTab sessionId={sessionId} onSessionExpired={onSessionExpired} onError={onError}/>
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

function PreEditSideBar({sessionId, onTranscribe, onSessionExpired, onError}) {
    async function handleTranscribe() {
        onError(null);
        try {
            const transcriptData = await fetchTranscript(sessionId)
            const styleData = defaultStyleData(transcriptData)
            onTranscribe?.({transcriptData, styleData})
        }
        catch (err) {
            if (err instanceof SessionExpired) {
                onSessionExpired()
            } else {
                onError({message: err.message})
            }
        }
    }

    return(
        <div className="task-editor" id="task-editor">
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
