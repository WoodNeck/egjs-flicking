import Camera, { CameraOption } from "./Camera";

export interface BasicCameraOption extends CameraOption {

}

class BasicCamera extends Camera {
  constructor(options: Partial<BasicCameraOption> = {}) {
    super(options);
  }

  public copy(camera: Camera): this {
    return this;
  }
}

export default BasicCamera;
