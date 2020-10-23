import Flicking from "~/Flicking";
import * as OPTIONS from "~/consts/option";
import { ValueOf } from "~/types/internal";

export interface CameraOption {
  elSelector: HTMLElement | string | null; // HTMLElement to apply translation
  align: ValueOf<typeof OPTIONS.ALIGN> | number;
}

interface Camera {
  align: CameraOption["align"];
  element: HTMLElement;
  destroy(): this;
  init(flicking: Flicking): this;
  lookAt(pos: number): this;
  updateAlignPos(): this;
}

export default Camera;
