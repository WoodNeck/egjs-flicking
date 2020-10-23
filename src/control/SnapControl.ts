import Control, { ControlOption } from "./Control";
import * as OPTIONS from "~/consts/option";
import Flicking from "~/Flicking";

export interface StrictControlOption extends ControlOption {
  step: number;
}

class StrictControl implements Control {
  // Components
  private _flicking: Flicking;
  private _controller

  // Options
  private _step: StrictControlOption["step"];

  // Options getter/setter
  public get step() { return this._step; }
  public set step(val: StrictControlOption["step"]) {
    this._step = val;
  }

  constructor({
    step = 1,
    inputs = [OPTIONS.INPUT.MOUSE, OPTIONS.INPUT.TOUCH],
  }: Partial<StrictControlOption> = {}) {
    this.step = step;
  }

  public init(flicking: Flicking) {
    this._flicking = flicking;
    return this;
  }

  public setControlAreaElement(el: HTMLElement) {

  }
}

export default StrictControl;
