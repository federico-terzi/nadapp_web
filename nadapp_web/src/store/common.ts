export class SessionError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "SessionError"
    Object.setPrototypeOf(this, SessionError.prototype);
  }
}