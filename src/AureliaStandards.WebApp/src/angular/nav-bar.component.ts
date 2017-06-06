import { Component } from "@angular/core";

import { appRoutes } from './app.routing';

@Component({
    selector: 'nav-bar',
    templateUrl: './dist/templates/nav-bar.component.html'
    //template: ''
})
export class NavBarComponent {
    private _routes;

    constructor() {
        let navRoutes = appRoutes.filter(x => x.data && x.data.name);

        this._routes = navRoutes;
    }

    public get routes() {
        return this._routes;
    }
}