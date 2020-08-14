import FlickingError from "~/core/FlickingError";
import * as ERROR from "~/consts/error";
import * as OPTIONS from "~/consts/option";
import { ValueOf } from "./types/internal";

export function getElement(el: HTMLElement | string | null, parent?: HTMLElement): HTMLElement {
  let targetEl: HTMLElement | null = null;

  if (typeof el === "string") {
    const parentEl = parent ? parent : document;
    const queryResult = parentEl.querySelector(el);
    if (!queryResult) {
      throw new FlickingError(ERROR.MESSAGES.ELEMENT_NOT_FOUND(el), ERROR.CODES.ELEMENT_NOT_FOUND);
    }
    targetEl = queryResult as HTMLElement;
  } else if (el && el.nodeType === Node.ELEMENT_NODE) {
    targetEl = el;
  }

  if (!targetEl) {
    throw new FlickingError(ERROR.MESSAGES.WRONG_TYPE(el, ["HTMLElement", "string"]), ERROR.CODES.WRONG_TYPE);
  }

  return targetEl;
}

export function checkExistence(value: any, nameOnErrMsg: string) {
  if (!value) {
    throw new FlickingError(ERROR.MESSAGES.VAL_MUST_NOT_NULL(value, nameOnErrMsg), ERROR.CODES.VAL_MUST_NOT_NULL);
  }
}

export function range(end: number): number[] {
  return Array.apply(0, Array(end)).map((undef, idx) => idx);
}

export function clamp(x: number, min: number, max: number) {
  return Math.max(Math.min(x, max), min);
}

// Linear interpolation between a and b
export function mix(a: number, b: number, t: number) {
  return a * (1 - t) + b * t;
}

export function circulate(val: number, min: number, max: number) {
  const size = max - min;

  if (val < min) {
    const offset = (min - val) % size;
    val = max - offset;
  } else if (val > max) {
    const offset = (val - max) % size;
    val = min + offset;
  }

  return val;
}

export function merge(target: object, ...srcs: object[]): object {
  srcs.forEach(source => {
    Object.keys(source).forEach(key => {
      const value = source[key];
      if (Array.isArray(target[key]) && Array.isArray(value)) {
        target[key] = [...target[key], ...value];
      } else {
        target[key] = value;
      }
    });
  });

  return target;
}

export function findIndex<T>(target: T, list: T[]) {
  let index = -1;
  for (const itemIndex of range(list.length)) {
    if (list[itemIndex] === target) {
      index = itemIndex;
      break;
    }
  }
  return index;
}

export function parseAlign(align: ValueOf<typeof OPTIONS.ALIGN> | number, size: number): number {
  let alignPoint: number;
  if (typeof align === "string") {
    switch (align) {
      case OPTIONS.ALIGN.LEFT:
      case OPTIONS.ALIGN.TOP:
        alignPoint = 0;
        break;
      case OPTIONS.ALIGN.CENTER:
        alignPoint = 0.5;
        break;
      case OPTIONS.ALIGN.RIGHT:
      case OPTIONS.ALIGN.BOTTOM:
        alignPoint = 1;
        break;
      default:
        throw new FlickingError(
          ERROR.MESSAGES.WRONG_TYPE(align, Object.keys(OPTIONS.ALIGN).map(key => OPTIONS.ALIGN[key])),
          ERROR.CODES.WRONG_TYPE,
        );
    }
  } else {
    // So, 1px from left/top isn't possible.
    alignPoint = align;
  }

  return alignPoint <= 1
    ? alignPoint * size
    : alignPoint;
}
