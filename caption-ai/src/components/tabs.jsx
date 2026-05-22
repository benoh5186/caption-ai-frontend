import TranscriptSegments from "./transcript"
import { downloadVideo } from "../services/download-video"
import { SessionExpired } from "../errors/session-expired"
import { getSegmentStyle } from "../services/default-style-data"


export function CaptionTab() {

}

export function StylesTab({stylesData, onStyleChange, segmentId = null}) {
  const style = getSegmentStyle(stylesData, segmentId)
  const updateStyle = (updates) => onStyleChange?.(updates)

  return (
          <div className="editor-content" id="styles-content">
            <div className="section-header">Typography</div>
            <div className="control-group typography-section" id="typography-section">
              <div className="control-row">
                <div className="control-item">
                  <label className="control-label tooltip" htmlFor="font-family">
                    Font Family
                  </label>
                  <select
                    name="fontFamily"
	                    id="font-family"
	                    className="dropdown-menu"
	                    value={style.fontFamily ?? "Arial"}
	                    onChange={(event) => updateStyle({ fontFamily: event.target.value })}
	                  >
	                    <option value="Arial">Arial</option>
	                    <option value="Helvetica">Helvetica</option>
                  </select>
                </div>
              </div>

              <div className="control-row">
                <div className="control-item">
                  <label className="control-label tooltip" htmlFor="font-size">
                    Font Size
                  </label>
                  <select
	                    name="fontSize"
	                    id="font-size"
	                    className="dropdown-menu"
	                    value={style.fontSize ?? "16px"}
	                    onChange={(event) => updateStyle({ fontSize: event.target.value })}
	                  >
	                    <option value="16px">16px</option>
	                    <option value="24px">24px</option>
                    <option value="32px">32px</option>
                    <option value="48px">48px</option>
                  </select>
                </div>
              </div>

              <div className="control-row">
                <div className="control-item">
                  <label className="control-label tooltip">Text Style</label>
	                  <button
	                    type="button"
	                    className={style.bold ? "style-btn active" : "style-btn"}
	                    id="bold-btn"
	                    style={{ fontWeight: "bold" }}
	                    onClick={() => updateStyle({ bold: !style.bold })}
	                  >
	                    B
	                  </button>
	                  <button
	                    type="button"
	                    className={style.italic ? "style-btn active" : "style-btn"}
	                    id="italic-btn"
	                    style={{ fontStyle: "italic" }}
	                    onClick={() => updateStyle({ italic: !style.italic })}
	                  >
	                    I
	                  </button>
                </div>
              </div>
            </div>

            <div className="section-header">Color & Effects</div>
            <div className="control-group">
              <div className="control-row">
                <div className="control-item">
                  <label className="control-label" htmlFor="text-color">
                    Text Color
                  </label>
                  <div className="color-group" style={{ backgroundColor: "white" }}>
                    <div
	                      className="color-preview"
	                      id="text-color-preview"
	                      style={{ backgroundColor: style.textColor ?? "#000000" }}
	                    />
	                    <input
	                      type="color"
	                      className="color-input"
	                      id="text-color"
	                      value={style.textColor ?? "#000000"}
	                      onChange={(event) => updateStyle({ textColor: event.target.value })}
	                    />
	                    <div className="color-info">
	                      <div className="color-name" id="text-name">
	                        {style.textColor ?? "#000000"}
	                      </div>
	                    </div>
                  </div>
                </div>
              </div>

              <div className="control-row">
                <div className="control-item">
                  <label className="control-label" htmlFor="outline-color">
                    Outline Color
                  </label>
                  <div className="color-group" style={{ backgroundColor: "white" }}>
                    <div
	                      className="color-preview"
	                      id="outline-color-preview"
	                      style={{ backgroundColor: style.outlineColor ?? "#000000" }}
	                    />
	                    <input
	                      type="color"
	                      className="color-input"
	                      id="outline-color"
	                      value={style.outlineColor ?? "#000000"}
	                      onChange={(event) => updateStyle({ outlineColor: event.target.value })}
	                    />
	                    <div className="color-info">
	                      <div className="color-name" id="outline-name">
	                        {style.outlineColor ?? "#000000"}
	                      </div>
	                    </div>
                  </div>
                </div>
              </div>

              <div className="control-row">
                <div className="control-item">
                  <label className="control-label" htmlFor="outline-width">
                    Outline Width
                  </label>
                  <div className="slider-group">
	                    <div className="slider-info">
	                      <div className="slider-name">Width</div>
	                      <div className="slider-value" id="text-width-value">
	                        {style.outlineWidth ?? "0px"}
	                      </div>
	                    </div>
	                    <input
                      type="range"
                      className="slider"
                      id="outline-width"
                      min="0"
	                      max="2"
	                      step="0.01"
	                      value={parseFloat(style.outlineWidth ?? "0")}
	                      onChange={(event) => updateStyle({ outlineWidth: `${event.target.value}px` })}
	                    />
	                  </div>
                </div>
              </div>

              <div className="control-row">
                <div className="control-item">
                  <label className="control-label" htmlFor="background-color">
                    Background Color
                  </label>
                  <div className="color-group" style={{ backgroundColor: "white" }}>
                    <div
	                      className="color-preview"
	                      id="background-color-preview"
	                      style={{ backgroundColor: style.backgroundColor ?? "#ffffff" }}
	                    />
	                    <input
	                      type="color"
	                      className="color-input"
	                      id="background-color"
	                      value={style.backgroundColor ?? "#ffffff"}
	                      onChange={(event) => updateStyle({ backgroundColor: event.target.value })}
	                    />
	                    <div className="color-info">
	                      <div className="color-name" id="background-name">
	                        {style.backgroundColor ?? "#ffffff"}
	                      </div>
	                    </div>
                  </div>
                </div>
              </div>

              <div className="control-row">
                <div className="control-item">
                  <label className="control-label" htmlFor="background-opacity">
                    Background Opacity
                  </label>
                  <div className="slider-group">
	                    <div className="slider-info">
	                      <div className="slider-name">Opacity</div>
	                      <div className="slider-value" id="background-opacity-value">
	                        {Math.round((style.backgroundOpacity ?? 1) * 100)}%
	                      </div>
	                    </div>
	                    <input
                      type="range"
                      className="slider"
                      id="background-opacity"
                      min="0"
	                      max="1"
	                      step="0.01"
	                      value={style.backgroundOpacity ?? 1}
	                      onChange={(event) => updateStyle({ backgroundOpacity: Number(event.target.value) })}
	                    />
	                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}

export function SubtitlesTab({transcript, setTranscript, currentTime, setCurrentTime, styleData, setStyleData}) {
  return (
    <div className="editor-content" id="subtitles-content">
        <div className="section-header">Transcript</div>
      <div className="control-group">
            <TranscriptSegments
              transcript={transcript}
              onTranscriptChange={
                (segmentId, newText) =>
                  setTranscript((current) => {
                    return {
                      ...current,
                      segments : 
                        current.segments.map((segment) => {
                          if (segmentId !== segment.id) {
                            return segment
                          } 
                          return {
                            ...segment,
                            text : newText}
                        })
                    }
                  })
              }
              timeStamp={currentTime}
              onTimeStampChange={
                (newTime) =>
                setCurrentTime(newTime)
              }
              styleData={styleData}
              setStyleData={setStyleData}
            />
        </div>
      </div>
  )


}

export function SettingsTab({sessionId, onSessionExpired, onError}) {
    async function handleDownload() {
      onError(null)
      try {
          downloadVideo(sessionId)
      } 
      catch (err) {
        if (err instanceof SessionExpired) {
          onSessionExpired()
          return 
        } else {
          onError({message: err.message})
        }
      }
    }
    return (
        <div className="editor-content" id="option-content">
            <div className="section-header">Download</div>
            <div className="control-group">
              <div className="download-area" id="download-area">
                <button
                  type="button"
                  className="video-download-button"
                  id="video-download-button"
                  onClick={handleDownload}
                >
                  download
                </button>
              </div>
            </div>
        </div>
    )
}
