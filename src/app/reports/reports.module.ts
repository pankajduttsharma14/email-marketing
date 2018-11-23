import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReportsRoutingModule } from './reports-routing.module';
import {ReportsComponent} from './reports.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NgxDatatableModule,
    NgbModule
  ],
  declarations: [ReportsComponent]
})
export class ReportsModule { }
