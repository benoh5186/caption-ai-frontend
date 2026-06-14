
export function KineticWordCaption({videoCurrentTime, styleData, transcript}) {
    const highlightedWord = transcript?.words.find((wordData) => {
        return wordData.start <= videoCurrentTime && wordData.end >= videoCurrentTime
    })

}