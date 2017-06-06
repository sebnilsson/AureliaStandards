import { autoinject } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';

export const dateFormatRelativeSignalName = 'date-format-relative';

@autoinject
export class App {
    constructor(private bindingSignaler: BindingSignaler) {
        console.log('App.constructor');

        setInterval(() => this.bindingSignaler.signal(dateFormatRelativeSignalName), 5000);
    }
}