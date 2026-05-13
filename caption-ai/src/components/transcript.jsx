export default function TranscriptSegments({transcript, onTranscriptChange, timeStamp, onTimeStampChange}) {
    const isActiveSegment = (start, end) => start <= timeStamp && end >= timeStamp
    return (
        <div className="transcript-area">
            {transcript?.segments?.map(segment => 
                (
                    <div 
                        key={segment.id}
                        className={`segment ${isActiveSegment(segment.start, segment.end) ? "active" : "" }`}
                        onClick={() => onTimeStampChange(segment.start)}
                    >
                        <h4>{`${segment.start} -> ${segment.end}`}</h4>
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
}