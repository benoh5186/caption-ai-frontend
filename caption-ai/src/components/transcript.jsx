import { StylesTab } from "./tabs"
import { defaultStyleData } from "../services/default-style-data"
import { useState } from "react"

export default function TranscriptSegments({transcript, onTranscriptChange, timeStamp, onTimeStampChange, styleData, setStyleData}) {
    const [editSegmentId, setEditSegment] = useState(null);
    const isActiveSegment = (start, end) => start <= timeStamp && end >= timeStamp
    function editSegment(styleData, segmentId) {
        return (
            <StylesTab
                stylesData={styleData}
                onStyleChange={ (updates) =>
                    setStyleData((current) => {
                        const next = current ?? defaultStyleData();
                        return {
                            ...next,
                            segmentStyles: {
                                ...next.segmentStyles,
                                [segmentId]: {
                                    ...(next.segmentStyles?.[segmentId] ?? {}),
                                    ...updates} 
                            }
                        }
                })}
                segmentId={segmentId}
            />
        )
    }
    return (
        editSegmentId !== null ? editSegment(styleData, editSegmentId) : (
            <div className="transcript-area">
            {transcript?.segments?.map(segment => 
                (
                    <div 
                        key={segment.id}
                        className={`segment ${isActiveSegment(segment.start, segment.end) ? "active" : "" }`}
                        onClick={() => onTimeStampChange(segment.start)}
                    >
                        <h4>{`${segment.start} -> ${segment.end}`}</h4>
                        <button className="edit" onClick={ () => setEditSegment(segment.id)}>edit</button>
                        <textarea
                            value={segment.text}
                            onChange={(event) => onTranscriptChange(segment.id, event.target.value)}
                        >
                        </textarea>
                    </div>
                )
            )}
        </div>

        )
    )
}