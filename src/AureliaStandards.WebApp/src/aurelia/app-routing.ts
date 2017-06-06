import { RouterConfiguration } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export class AppRouting {
    configure(config: RouterConfiguration): void {
        let appTitle = 'Aurelia ToDo-app';

        config.title = appTitle;

        config.map([
            { route: ['list', ''], name: 'list', moduleId: PLATFORM.moduleName('./list'), nav: true, title: `List` },
            {
                route: 'details/:id',
                name: 'details',
                moduleId: PLATFORM.moduleName('./details'),
                nav: false,
                title: `Details`
            },
            { route: 'about', name: 'about', moduleId: PLATFORM.moduleName('./about'), nav: true, title: `About` }
        ]);
    }
}