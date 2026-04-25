
export function defaultStyleData(transcript) {
    const subtitleStyle = {
        fontFamily: "Arial",
        fontSize: "16px",
        bold: false,
        italic: false,
        textColor: "#000000",
        backgroundColor: "#ffffff",
        backgroundOpacity: 1,
        outlineColor: "#000000",
        outlineWidth: "0px",
    };
    const styleData = {};
    transcript.array.forEach(segment => {
        styleData[segment.id] = {
            "individual" : false,
            "style" : subtitleStyle            
        }
    });
    return styleData;
}