export class VideoLoadError extends Error {
    constructor(message) {
        super(message)
        this.name = "VideoLoadError"
    }
}