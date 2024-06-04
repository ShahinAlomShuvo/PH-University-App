export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public stack?: string
  ) {
    super(message);
    this.status = status;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
