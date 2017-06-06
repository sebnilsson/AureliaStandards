//import { autoinject } from 'aurelia-framework';
//import { BindingSignaler } from 'aurelia-templating-resources';

export const dateFormatRelativeSignalName = 'date-format-relative';

//@autoinject
export class App {
    constructor() {
        console.log('App.constructor');
    }
    //constructor(private bindingSignaler: BindingSignaler) {
    //    setInterval(() => this.bindingSignaler.signal(dateFormatRelativeSignalName), 5000);
    //}
}