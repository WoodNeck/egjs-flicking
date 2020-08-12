import BasicRenderer from "~/renderer/BasicRenderer";
import BasicCamera from "~/camera/BasicCamera";
import FlickingError from "~/core/FlickingError";
import { ALIGN } from "~/consts/option";
import * as ERROR from "~/consts/error";

import El from "./helper/El";
import { createFlicking } from "./helper/test-utils";

describe("Basics", () => {
  it("can be created", () => {
    expect(() => {
      createFlicking(El.DEFAULT_STRUCTURE);
    }).not.throw();
  });

  it("should throw an Error when no element is given", () => {
    expect(() => {
      createFlicking(null);
    }).to.throw(FlickingError, typeof null)
      .with.property("code", ERROR.CODES.WRONG_TYPE);
  });

  it("should throw an Error when element with given selector is not found", () => {
    const selector = "#definitely-not-a-flicking-selector";
    expect(() => {
      createFlicking(selector);
    }).to.throw(FlickingError, selector)
      .with.property("code", ERROR.CODES.ELEMENT_NOT_FOUND);
  });

  it("should throw an Error when no renderer is given", () => {
    expect(() => {
      createFlicking(El.DEFAULT_STRUCTURE, { renderer: null });
    }).to.throw(FlickingError, /renderer/i)
      .with.property("code", ERROR.CODES.VAL_MUST_NOT_NULL);
  });

  it("should throw an Error when no camera is given", () => {
    expect(() => {
      createFlicking(El.DEFAULT_STRUCTURE, { camera: null });
    }).to.throw(FlickingError, /camera/i)
      .with.property("code", ERROR.CODES.VAL_MUST_NOT_NULL);
  });

  it("is okay to not give any controls on Flicking", () => {
    expect(() => {
      createFlicking(El.DEFAULT_STRUCTURE, { control: null });
    }).not.to.throw();
  });
});

describe("Options", () => {
  describe("align", () => {
    it("should override renderer & camera's align", () => {
      // Given
      const renderer = new BasicRenderer({
        align: ALIGN.LEFT,
      });
      const camera = new BasicCamera({
        align: ALIGN.RIGHT,
      });

      // When
      const flicking = createFlicking(El.DEFAULT_STRUCTURE, {
          align: ALIGN.CENTER,
          renderer,
          camera,
        },
      );

      // Then
      expect(flicking.align).equals(ALIGN.CENTER);
      expect(renderer.align).equals(ALIGN.CENTER);
      expect(camera.align).equals(ALIGN.CENTER);
    });

    it("can be changed at anytime", () => {
      // Given
      const flicking = createFlicking(El.DEFAULT_STRUCTURE, {
          align: ALIGN.CENTER,
        },
      );

      // When
      flicking.align = ALIGN.LEFT;

      // Then
      expect(flicking.align).equals(ALIGN.LEFT);
      expect(flicking.renderer.align).equals(ALIGN.LEFT);
      expect(flicking.camera.align).equals(ALIGN.LEFT);
    });
  });
});
