import "./css/caption.css"
import "./css/kineticCaption.css"


export function KineticWordCaption({videoCurrentTime, segmentStyle, segment}) {

    return (
        <div className="subtitle-overlay kinetic-caption"
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
                if (wordData.start <= videoCurrentTime && wordData.end >= videoCurrentTime) {
                    return <span 
                                className="caption-word active-word"
                                style={getCurrentWordStyle(segmentStyle)}
                                >{wordData.word}
                            </span>
                } else {
                    return <span className="caption-word">{wordData.word}</span>
                }
            })}
        </div>
    )
}


function getCurrentWordStyle(segmentStyle) {
    const backgroundColor = getContrastColor(segmentStyle.backgroundColor)

    return {
        backgroundColor: backgroundColor
    }
}

function getContrastColor(hexColor) {
  if (!hexColor) return "#000000";

  const hex = hexColor.replace("#", "");

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? "#000000" : "#ffffff";
}