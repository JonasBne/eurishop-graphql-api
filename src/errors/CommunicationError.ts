export default class CommunicationError extends Error {
  error: Error;

  constructor(error: Error, message: string = 'CommunicationError') {
    super(message);
    this.name = 'RequestError';
    this.message = message;
    this.error = error;
  }
}
