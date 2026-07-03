import "./css/caption.css"

export function DefaultCaption({segmentStyle, segment}) {
    return (
        <div className="subtitle-overlay"
            style={{
                    fontFamily: segmentStyle.fontFamily,
                    fontSize: segmentStyle.fontSize,
                    fontWeight: segmentStyle.bold ? "700" : "400",
                    fontStyle: segmentStyle.italic ? "italic" : "normal",
                    color: segmentStyle.color,
                    backgroundColor: segmentStyle.backgroundColor,
                }}
        >
            {segment?.words?.map((wordData) => {
                return <span className="caption-word">{wordData?.word}</span>
            })}
        </div>
    )
}