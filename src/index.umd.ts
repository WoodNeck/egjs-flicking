import Flicking from "./Flicking";
import * as Core from "./core";
import * as Camera from "./camera";
import * as Control from "./control";
import * as Renderer from "./renderer";
import { CODES } from "./consts/error";
import * as EVENTS from "./consts/event";
import * as OPTIONS from "./consts/option";
import { merge } from "./utils";

merge(Flicking, Core);
merge(Flicking, Camera);
merge(Flicking, Control);
merge(Flicking, Renderer);
merge(Flicking, OPTIONS);

(Flicking as any).ERROR_CODES = CODES;
(Flicking as any).EVENTS = EVENTS;

export default Flicking;
