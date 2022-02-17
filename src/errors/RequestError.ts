export default class RequestError extends Error {
  status: number;

  constructor(status: number, message: string = 'HttpError') {
    super(message);
    this.name = 'RequestError';
    this.message = message;
    this.status = status;
  }
}
