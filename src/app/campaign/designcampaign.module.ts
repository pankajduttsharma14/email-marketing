import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerModule } from 'ngx-color-picker';
import { DesigncampaignRoutingModule } from './designcampaign-routing.module';
import {DesigncampaignComponent} from './designcampaign.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragulaModule } from 'ng2-dragula';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CampaignslistComponent } from './campaignslist/campaignslist.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CreatecampaignComponent } from './createcampaign/createcampaign.component';
import { EditcampaignComponent } from './updatecampaign/editcampaign.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import {SharedModule} from '../sharedmodule/sharedmodule.module';


@NgModule({
  imports: [
    CommonModule,SharedModule,
    DesigncampaignRoutingModule,NgbModule,ColorPickerModule,DragulaModule,FormsModule,NgxDatatableModule,ReactiveFormsModule,SweetAlert2Module.forRoot({
            buttonsStyling: false,
            customClass: 'modal-content',
            confirmButtonClass: 'btn btn-primary',
            cancelButtonClass: 'btn'
        }),
    
    

  ],
  declarations: [DesigncampaignComponent,CampaignslistComponent, CreatecampaignComponent,EditcampaignComponent]
})
export class DesigncampaignModule { }
