export class VideoNotFound extends Error {
    constructor(message) {
        super(message)
        this.name = "VideoNotFound"
    }
}