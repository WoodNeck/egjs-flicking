import Camera, { CameraOption } from "./Camera";
import { getElement } from "~/utils";

interface BasicCameraOption extends CameraOption {

}

class BasicCamera implements Camera {
  private _options: Partial<CameraOption>;
  private _el: HTMLElement;

  public get element() { return this._el; }
  public get position() { return 0; }
  public get focus() { return 0; }

  constructor(options: Partial<CameraOption> = {}) {
    this._options = options;
  }

  public init(viewportEl: HTMLElement) {
    const options = this._options;

    if (options.element) {
      this._el = getElement(options.element, viewportEl);
    } else {
      this._el = viewportEl.firstElementChild as HTMLElement;
    }
  }

  public copy(other: Camera) {
    return this;
  }
}

export default BasicCamera;
