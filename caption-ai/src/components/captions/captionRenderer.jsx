import { KineticWordCaption } from "./kineticWordCaption"

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