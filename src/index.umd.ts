import Flicking from "./Flicking";
import * as Core from "./core";
import * as Camera from "./camera";
import * as Control from "./control";
import * as Renderer from "./renderer";
import { CODES } from "./consts/error";
import { merge } from "./utils";

merge(Flicking, Core);
merge(Flicking, Camera);
merge(Flicking, Control);
merge(Flicking, Renderer);

(Flicking as any).ERROR_CODES = CODES;

export default Flicking;
