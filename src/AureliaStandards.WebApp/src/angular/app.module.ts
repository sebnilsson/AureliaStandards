//import { UrlResolver } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { ListComponent } from './list.component';
import { DetailsComponent } from './details.component';
import { AboutComponent } from './about.component';
import { NavBarComponent } from './nav-bar.component';

import { DateRelativePipe } from './date-relative.pipe'

import { TasksApiService } from './tasks-api.service';
import { TasksData } from './tasks-data';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        ListComponent,
        DetailsComponent,
        AboutComponent,
        NavBarComponent,

        DateRelativePipe
    ],
    //providers: [{ provide: UrlResolver, useValue: new UrlResolver("/src/angular/") }],
    providers: [
        TasksApiService,
        TasksData
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
    }
}