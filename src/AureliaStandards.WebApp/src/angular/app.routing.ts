import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list.component';
import { DetailsComponent } from './details.component';
import { AboutComponent } from './about.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: 'list', component: ListComponent, data: { name: 'List' } },
    { path: 'details/:id', component: DetailsComponent },
    { path: 'about', component: AboutComponent, data: { name: 'About' } },
    { path: '**', redirectTo: '/list' }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });