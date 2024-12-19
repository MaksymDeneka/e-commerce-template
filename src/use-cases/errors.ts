export class PublicError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class LoginError extends PublicError {
  constructor() {
    super("Invalid email or password");
    this.name = "LoginError";
  }
}