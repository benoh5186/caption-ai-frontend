export function defaultStyleData() {
  return {
    captionStyle: "kineticWordCaption",
    globalStyle: {
      fontFamily: "Arial",
      fontSize: "15px",
      bold: false,
      italic: false,
      color: "#000000",
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
        ...defaultData.captionStyle,
        ...defaultData.globalStyle,
        ...(styleData.globalStyle ?? {}),
        ...(styleData.segmentStyles?.[segmentId] ?? {}),
    }
}
