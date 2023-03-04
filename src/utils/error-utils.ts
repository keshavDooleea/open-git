export class CustomError extends Error {
  constructor(message: string) {
    super(message);
  }

  static getMessage(err: unknown, defaultMessage: string): string {
    return err instanceof CustomError ? err.message : defaultMessage;
  }
}
