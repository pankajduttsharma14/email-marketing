import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { CampaignService } from '../services/campaign.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [CampaignService],
  encapsulation: ViewEncapsulation.None
})
export class ReportsComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private CampaignService: CampaignService) {}

  ngOnInit() {
    this.GetAllReports();
  }


  GetAllReports() {
    this.CampaignService.GetReports().subscribe(res => {
      this.rows1 = res.data.active_campaign;
      this.rows2 = res.data.scheduled_campaign;
      this.rows3 = res.data.darft_campaign;
      this.rows4 = res.data.completed_campaign;
      // this.temp = [...res.data.active_campaign];

    }, err => {});
  }
  // temp = [];
  // data = {};
  rows1 = [];
  columns1 = [
    { prop: 'name' },
    { name: 'Campaing Id', prop: 'campaign_id' },
    // { name: 'Discription', prop: 'discription' },
    { name: 'Start Date', prop: 'start_date' },
    { name: 'End Date', prop: 'end_date' },
    // { name: 'Sender Name', prop: 'sender_name' },
    // { name: 'Sender Email', prop: 'sender_email' },

  ];
  rows2 = [];
  columns2 = [
    { prop: 'name' },
    { name: 'Campaing Id', prop: 'campaign_id' },
    // { name: 'Discription', prop: 'discription' },
    { name: 'Start Date', prop: 'start_date' },
    { name: 'End Date', prop: 'end_date' },
    // { name: 'Sender Name', prop: 'sender_name' },
    // { name: 'Sender Email', prop: 'sender_email' },

  ];
  rows3 = [];
  columns3 = [
    { prop: 'name' },
    { name: 'Campaing Id', prop: 'campaign_id' },
    // { name: 'Discription', prop: 'discription' },
    { name: 'Start Date', prop: 'start_date' },
    { name: 'End Date', prop: 'end_date' },
    // { name: 'Sender Name', prop: 'sender_name' },
    { name: 'Receiver Email', prop: 'send_to_email' },

  ];
  rows4 = [];
  columns4 = [
    { prop: 'name' },
    { name: 'Campaing Id', prop: 'campaign_id' },
    // { name: 'Discription', prop: 'discription' },
    { name: 'Start Date', prop: 'start_date' },
    { name: 'End Date', prop: 'end_date' },
    // { name: 'Sender Name', prop: 'sender_name' },
    { name: 'Receiver Email', prop: 'send_to_email' },

  ];







}
