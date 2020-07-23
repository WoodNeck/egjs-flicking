import Flicking, { BasicRenderer, BasicCamera, SnapControl } from "~/index";

class App {
  private _flicking: Flicking;

  constructor() {
    this._flicking = new Flicking(".flick-viewport", {
      renderer: new BasicRenderer(),
      camera: new BasicCamera(),
      control: new SnapControl(),
    });
    console.log(this._flicking);
  }
}

export default App;

// tslint:disable-next-line
new App();
