interface Camera {
  element: HTMLElement;

  // Position of the focal point
  position: number;

  // TODO: origin? / focus? = hanger
  focus: number;

  init(viewportEl: HTMLElement): void;

  // Needed when changing camera's type
  copy(other: Camera): this;
}

export default Camera;

export interface CameraOption {
  // HTMLElement to apply translation
  element: HTMLElement | string;
}
