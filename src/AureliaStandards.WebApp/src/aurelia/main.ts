import 'isomorphic-fetch';
import { Aurelia, PLATFORM } from 'aurelia-framework';

export function configure(aurelia: Aurelia) {
    console.log('main.configuration');

    aurelia.use.standardConfiguration();

    let appModuleName = PLATFORM.moduleName('app');
    console.log(`appModuleName: '${appModuleName}'`);

    //aurelia.start().then(() => aurelia.setRoot(appModuleName));
    aurelia.start().then(() => aurelia.setRoot());
}