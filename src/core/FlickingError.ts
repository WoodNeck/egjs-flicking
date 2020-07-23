class FlickingError extends Error {
  // tslint:disable-next-line naming-convention
  public __proto__: FlickingError;

  constructor(
    public message: string,
    public code: number) {
    super(message);
    Object.setPrototypeOf(this, FlickingError.prototype);
    this.name = "FlickingError";
  }
}

export default FlickingError;
