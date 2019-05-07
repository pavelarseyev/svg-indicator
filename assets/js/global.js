import "babel-polyfill";

import {binder, fwa} from "./libs/binder";
import { staticFunctions, constants, commonFunction, anotherCommonFunction, navFunction, myUnusedFunction } from "./modules/module";



binder({
    bounds: {
        "html": [constants, staticFunctions],
        "body": [commonFunction, anotherCommonFunction],
        ".header": navFunction
    },
    runTests: false
});
