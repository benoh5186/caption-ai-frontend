export class JobNotFound extends Error {
  constructor(message) {
    super(message)
    this.name = "JobNotFound"
  }
}