export class SessionLoadError extends Error {
  constructor(message) {
    super(message)
    this.name = "SessionLoadError"
  }
}