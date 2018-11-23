import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReportsComponent} from './reports.component';

const routes: Routes = [ 
{
    path: '',
    redirectTo:'reports'
    },
    {
      path: '',
      component: ReportsComponent,
      data: {
        title: 'All Reports',
        urls: [{ title: 'Reports', url: '' }]
      }
    },
    

   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
