import FlickingError from "~/core/FlickingError";

describe("FlickingError", () => {
  it("is catchable", () => {
    // Given
    const err = new FlickingError("I'M AN ERROR", 0);
    try {
      // When
      throw err;
    } catch (catchedErr) {
      // Then
      expect(catchedErr).equals(err);
    }
  });

  it("is instance of FlickingError", () => {
    // Given & When
    const err = new FlickingError("Test Message", 0);

    // Then
    expect(err).instanceOf(FlickingError);
  });

  it("has a code in it", () => {
    // Given
    const randomCode = Math.floor(Math.random() * 10000);

    // When
    const err = new FlickingError("Random Msg", randomCode);

    // Then
    expect(err.code).equals(randomCode);
  });

  it("has a message in it", () => {
    // Given
    const randomMessage = atob(Math.floor(Math.random() * 10000).toString());

    // When
    const err = new FlickingError(randomMessage, 0);

    // Then
    expect(err.message).equals(randomMessage);
  });

  it("has a stack in it", () => {
    // Given & When
    const err = new FlickingError("", 0);

    // Then
    expect(err.stack).is.not.null;
    expect(err.stack).is.not.undefined;
    expect(err.stack).not.equals("");
  });
});
