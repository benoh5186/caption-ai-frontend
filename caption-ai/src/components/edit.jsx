import {useState} from "react"
import {StylesTab, SubtitlesTab, SettingsTab, TranscribeTab} from "../components/tabs"
import { fetchSession } from "../services/fetch-session";

export function EditSession({ sessionId, videoUrl, styleData, transcript, onTranscribe }) {
    const hasTranscript = transcript != null;

    return (
        <div className="video-edit-section" id="video-edit-section" >
            <div class="video-preview" id="video-preview">
                <video className="video-player" id="video-player" controls src={videoUrl}>
                </video>
                <div className="subtitle-container" id="subtitle-container">
                </div>
            </div>

            {hasTranscript ? (
                <EditSideBar styleData={styleData} transcript={transcript} />
            ) : (
                <PreEditSideBar sessionId={sessionId} onTranscribe={onTranscribe} />
            )}
        </div>
    )
}

function EditSideBar({ styleData, transcript}) {
    const [activeTab, setTab] = useState("styles");

    function handleTabClick(tab) {
        switch(tab) {
            case "styles":
                setTab("styles")
            case "subtitles":
                setTab("subtitles")
            case "options":
                setTab("options")
            default:
                setTab("styles")
        }
    }

    function renderTabContent() {
        switch(activeTab) {
            case "styles":
                return <StylesTab stylesData={styleData}/>
            case "subtitles":
                return <SubtitlesTab transcript={transcript}/>
            case "options":
                return <SettingsTab/>
            default:
                return <StylesTab stylesData={styleData}/>
        }
    }
    return (
        <div className="task-editor" id="task-editor">
            <div className="task-choices">
                <button className="task-tab" id="task-styles" onClick={handleTabClick("styles")}>
                    ✨ Styles
                </button>
                <button className="task-tab" id="task-subtitles" onClick={handleTabClick("subtitles")}>
                    💬 Subtitles
                </button>
                <button className="task-tab" id="task-options" onClick={handleTabClick("options")}>
                    🔧 Options
                </button>
            </div>
            <div>
                {renderTabContent()}
            </div>
        </div>
    )

}

function PreEditSideBar({sessionId, onTranscribe}) {
    async function handleTranscribe() {
        const data = await fetchSession(sessionId)
        onTranscribe?.({transcript: data.transcript, sessionInfo: data.session_info})

    }

    return(
        <div className="task-editor" id="task-editor">
            <div className="task-choices">
                <button class="task-tab" id="task-transcribe" onClick={handleTranscribe}>
                    Transcribe
                </button>
            </div>
            <div>
                <TranscribeTab/>
            </div>
        </div>
    )
        
}
