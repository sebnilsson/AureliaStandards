import 'core-js/es6';
import 'core-js/es7/reflect';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
require('zone.js');

import {AppModule} from "./app.module";

platformBrowserDynamic().bootstrapModule(AppModule);