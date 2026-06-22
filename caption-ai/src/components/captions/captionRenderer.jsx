import { KineticWordCaption } from "./kineticWordCaption"
import { DefaultCaption } from "./defaultCaption"

export function CaptionRenderer({videoCurrentTime, segmentStyle, segment}) {
    const captionStyle = segmentStyle?.captionStyle 
    function renderCaptionStyle() {
        switch(captionStyle) {
            case "kineticWordCaption":
                return <KineticWordCaption 
                            videoCurrentTime={videoCurrentTime}
                            segmentStyle={segmentStyle}
                            segment={segment}/>
            default:
                return <KineticWordCaption 
                            videoCurrentTime={videoCurrentTime}
                            segmentStyle={segmentStyle}
                            segment={segment}/>

        } 
    }
    return renderCaptionStyle()
}