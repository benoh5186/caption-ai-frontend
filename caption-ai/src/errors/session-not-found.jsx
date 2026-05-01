class SessionNotFound extends Error {
  constructor(message) {
    super(message)
    this.name = "SessionNotFound"
  }
}