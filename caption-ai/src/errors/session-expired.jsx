export class SessionExpired extends Error {
  constructor(message) {
    super(message)
    this.name = "SessionExpired"
  }
}