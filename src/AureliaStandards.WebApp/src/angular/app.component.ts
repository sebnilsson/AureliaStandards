import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app',
    templateUrl: './dist/templates/app.component.html'
    //template: '<div>TEMPLATE APP<router-outlet></router-outlet></div>',
})
export class AppComponent {
    constructor(private router: Router) {
    }
}