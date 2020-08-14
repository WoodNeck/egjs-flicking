import * as OPTIONS from "~/consts/option";
import { ValueOf } from "~/types/internal";
import Viewport from "~/core/Viewport";

export interface CameraOption {
  elSelector: HTMLElement | string | null; // HTMLElement to apply translation
  align: ValueOf<typeof OPTIONS.ALIGN> | number;
}

interface Camera {
  align: CameraOption["align"];
  element: HTMLElement;
  destroy(): this;
  init(viewport: Viewport): this;
  lookAt(pos: number): this;
  updateAlignPos(): this;
}

export default Camera;
