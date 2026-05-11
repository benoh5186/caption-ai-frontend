export function defaultStyleData() {
  return {
    globalStyle: {
      fontFamily: "Arial",
      fontSize: "16px",
      bold: false,
      italic: false,
      textColor: "#000000",
      backgroundColor: "#ffffff",
      backgroundOpacity: 1,
      outlineColor: "#000000",
      outlineWidth: "0px",
    },
    segmentStyles: {},
  };
}
export function getSegmentStyle(styleData, segmentId) {
    const defaultData = defaultStyleData()
    if (!styleData) {
        return defaultData.globalStyle
    }
    return {
        ...defaultData.globalStyle,
        ...(styleData.globalStyle ?? {}),
        ...(styleData.segmentStyles[segmentId] ?? {}),
    }
}
