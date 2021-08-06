import * as Models from "./extension_model"
export {Models}

import {register_models} from "@bokehjs/base";
register_models(Models as any)
