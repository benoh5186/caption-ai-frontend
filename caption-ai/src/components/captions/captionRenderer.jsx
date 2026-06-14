import { KineticWordCaption } from "./kineticWordCaption"

export function CaptionRenderer({videoCurrentTime, styleData, transcript}) {
    const captionStyle = styleData?.captionStyle 
    function renderCaptionStyle() {
        switch(captionStyle) {
            case "kineticWordCaption":
                return <KineticWordCaption 
                            videoCurrentTime={videoCurrentTime}
                            styleData={styleData}
                            transcript={transcript}/>
        } 
    }
    return renderCaptionStyle()
}