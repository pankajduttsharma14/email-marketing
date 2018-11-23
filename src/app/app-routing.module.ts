import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthGuardService as AuthGuard } from './services/authGuard.service';
import {AnonymousGuardService as LoginGuard} from './services/loginguard.service';
export const routes: Routes = [
{
    path: '',
    component: FullComponent,
    children: [
        { path: '', redirectTo: '/authentication/login', pathMatch: 'full'},
        { path: 'campaign', loadChildren: './campaign/designcampaign.module#DesigncampaignModule',canActivate:[AuthGuard] },
        { path: 'reports', loadChildren: './reports/reports.module#ReportsModule',canActivate:[AuthGuard] }
    ]
},
{
    path: '',
    component: BlankComponent,
    children: [
        {
            path: 'authentication',
            loadChildren: './authentication/authentication.module#AuthenticationModule'
        }
    ]
}, 
{
    path: '**',
    redirectTo: '404' 
}];

@NgModule({
    imports: [RouterModule.forRoot(routes), NgbModule.forRoot()],
    exports: [RouterModule]
})
export class AppRoutingModule { }

