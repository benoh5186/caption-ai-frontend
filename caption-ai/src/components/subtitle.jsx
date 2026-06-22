import { getSegmentStyle } from "../services/default-style-data";
import { CaptionRenderer } from "./captions/captionRenderer";

export default function Subtitle({styleData, transcript, timeStamp}) {
    const activeSegment = transcript?.segments?.find((segment) => {
        return segment.start <= timeStamp && segment.end >= timeStamp}) 
    if (!activeSegment) {
      return null;
    }
    const captionStyle = getSegmentStyle(styleData, activeSegment.id)

    return (
      <CaptionRenderer
        videoCurrentTime={timeStamp}
        segmentStyle={captionStyle}
        segment={activeSegment}
      />
    )
}