interface Camera {
  // Position of the focal point
  position: number;

  // TODO: origin? / focus? = hanger
  focus: number;

  // Needed when changing camera's type
  copy();
}

export default Camera;

export interface CameraOption {
  // HTMLElement to apply translation
  element: HTMLElement | string;
}
