import {useState} from "react"
import {StylesTab, SubtitlesTab, SettingsTab} from "../components/tabs"

export function EditSession({ videoUrl, styleData, transcript }) {
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
        <div class="video-edit-section" id="video-edit-section" >
            <div class="video-preview" id="video-preview" style="display: none;">
                <video class="video-player" id="video-player" controls src={videoUrl}>
                </video>
                <div class="subtitle-container" id="subtitle-container">
                </div>
            </div>

            <div class="task-editor" id="task-editor">
                <div class="task-choices">
                    <button class="task-tab" id="task-styles" onClick={handleTabClick("styles")}>
                        ✨ Styles
                    </button>
                    <button class="task-tab" id="task-subtitles" onClick={handleTabClick("subtitles")}>
                        💬 Subtitles
                    </button>
                    <button class="task-tab" id="task-options" onClick={handleTabClick("options")}>
                        🔧 Options
                    </button>
                </div>
                <div>
                    {renderTabContent()}
                </div>
            </div>

        </div>
    )
}
