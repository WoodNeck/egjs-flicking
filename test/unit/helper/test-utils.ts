import Flicking from "~/Flicking";
import BasicRenderer from "~/renderer/BasicRenderer";
import BasicCamera from "~/camera/BasicCamera";
import SnapControl from "~/control/SnapControl";
import El from "./El";

const createSandbox = (id: string): HTMLElement => {
  const tmp = document.createElement("div");

  tmp.className = "_tempSandbox_";
  tmp.id = id;

  document.body.appendChild(tmp);

  return tmp;
};

export function createFlicking(el: El | any, option: Partial<ConstructorParameters<typeof Flicking>[1]> = {}) {
  const sandbox = createSandbox(`flicking-${Date.now()}`);
  const element = el instanceof El ? el.el : el;

  if (el instanceof El) {
    sandbox.appendChild(el.el);
  }

  return new Flicking(element, {
    renderer: new BasicRenderer(),
    camera: new BasicCamera(),
    control: new SnapControl(),
    ...option,
  });
}

export function tick(time) {
  (window as any).timer.tick(time);
}

declare var Simulator: any;
export function simulate(el: HTMLElement, option?: object, time: number = 99999): Promise<void> {
  let targetElement = el.querySelector(".eg-flick-viewport");

  if (!targetElement) {
    targetElement = el;
  }

  return new Promise<void>(resolve => {
    Simulator.gestures.pan(targetElement, {
      pos: [50, 15],
      deltaX: 0,
      deltaY: 0,
      duration: 500,
      easing: "linear",
      ...option,
    }, resolve);

    tick(time);
  });
}
