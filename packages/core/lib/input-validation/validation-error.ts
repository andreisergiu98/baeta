export class ValidationError extends Error {
  constructor(public innerError: Error, public path: Array<string | number>) {
    super(innerError.message);
  }
}
