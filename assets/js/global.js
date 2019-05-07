import "babel-polyfill";

import {binder, fwa} from "./libs/binder";
import { sensorsInit } from "./modules/sensor";



binder({
    bounds: {
        ".sensor": sensorsInit
    },
    runTests: false
});
