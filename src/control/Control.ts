import Flicking from "~/Flicking";
import { INPUT } from "~/consts/option";
import { ValueOf } from "~/types/internal";

export interface ControlOption {
  inputs: Array<ValueOf<typeof INPUT>>;
}

interface Control {
  init(flicking: Flicking): this;
}

export default Control;
