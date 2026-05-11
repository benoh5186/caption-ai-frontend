import { getSegmentStyle } from "../services/default-style-data";

export default function Subtitle({styleData, transcript, timeStamp}) {
    const activeSegment = transcript?.segments?.find((segment) => {
        return segment.start <= timeStamp && segment.end >= timeStamp
    })   
    if (!activeSegment) {
      return null;
    }
    const captionStyle = getSegmentStyle(styleData, activeSegment.id)

    return (
        <div
          className="subtitle-overlay"
          style={{
            fontFamily: captionStyle.fontFamily,
            fontSize: captionStyle.fontSize,
            fontWeight: captionStyle.bold ? "700" : "400",
            fontStyle: captionStyle.italic ? "italic" : "normal",
            color: captionStyle.textColor,
            backgroundColor: captionStyle.backgroundColor,
          }}
        >
          {activeSegment.text}
        </div>
    )
}