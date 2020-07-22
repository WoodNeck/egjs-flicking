import Flicking from "./Flicking";
import * as Core from "./core";
import { CODES } from "./consts/error";
import { merge } from "./utils";

merge(Flicking, Core);

(Flicking as any).ERROR_CODES = CODES;

export default Flicking;
