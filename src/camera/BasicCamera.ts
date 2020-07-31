import Camera, { CameraOption, CameraEvents } from "./Camera";
import { Component } from "~/core";

export interface BasicCameraOption extends CameraOption {

}

class BasicCamera extends Camera<{
  init: void,
  s: BasicCamera,
}> {

  constructor(options: Partial<BasicCameraOption> = {}) {
    super(options);
  }

  public copy(camera: Camera): this {
    this.trigger("s", this);
    return this;
  }
}

new BasicCamera()

export default BasicCamera;
