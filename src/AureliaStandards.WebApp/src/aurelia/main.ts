import { Aurelia, PLATFORM } from 'aurelia-framework';

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging();

    let appModuleName = PLATFORM.moduleName('app');
    aurelia.start().then(() => aurelia.setRoot(appModuleName));
}