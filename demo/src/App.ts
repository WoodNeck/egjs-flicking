import "../../css/flicking-inline.css";
import Flicking, { BasicRenderer, BasicCamera, SnapControl, ALIGN } from "~/index";

class App {
  private _flicking: Flicking;

  constructor() {
    this._flicking = new Flicking("#flicking", {
      align: ALIGN.CENTER,
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
