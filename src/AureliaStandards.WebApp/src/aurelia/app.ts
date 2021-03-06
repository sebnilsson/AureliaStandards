import { autoinject } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { Router, RouterConfiguration } from 'aurelia-router';

import { AppRouting } from './app-routing';

export const dateFormatRelativeSignalName = 'date-format-relative';

@autoinject
export class App {
    public router: Router;

    constructor(private appRouting: AppRouting,
        private bindingSignaler: BindingSignaler) {
        setInterval(() => this.bindingSignaler.signal(dateFormatRelativeSignalName), 5000);
    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        this.appRouting.configure(config);

        this.router = router;
    }
}