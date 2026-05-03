export class SessionCountLimit extends Error {
  constructor(message) {
    super(message)
    this.name = "SessionCountLimit"
  }
}