import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { CampaignService } from '../../services/campaign.service';
import swal, { SweetAlertOptions } from 'sweetalert2';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-editcampaign',
  templateUrl: './editcampaign.component.html',
  styleUrls: ['./editcampaign.component.css'],
  providers: [CampaignService]
})
export class EditcampaignComponent implements OnInit {
  @ViewChild('saveSwal') private saveSwal: SwalComponent;
  
  time = { hour: 12, minute: 10 };
  seconds = false;
  constructor(private fb: FormBuilder,
    private CampaignService: CampaignService,
    private activatedRoute: ActivatedRoute
  ) {}

  CampaignID:any;
  CampaignDetails:any=[];
  ngOnInit() {
    // init edit form
    
    // Get route params
    this.activatedRoute.params.subscribe((params: Params) => {
      this.CampaignID = params['id'];
      let DatabaseName: any = localStorage.getItem('db_name');
  
      // get Campaings by id
      this.CampaignService.GetCampaignById(this.CampaignID).subscribe(
        res => {
          this.CampaignDetails = res.data;
          }, err => { });
    });

  
  }



  // Update campaign
  UpdateCampaign(formData) {

    let data = {
      "user_id": localStorage.getItem('user_id'),
      "cmp_name": formData.cmp_name,
      "campaign_id": formData.campaign_id,
      "cmp_description": formData.cmp_description,
      "cmp_start_date": formData.cmp_start_date.day+'-'+formData.cmp_start_date.month+'-'+formData.cmp_start_date.year+" " + formData.time.hour + ":" + formData.time.minute,
      "cmp_end_date": formData.cmp_start_date.day+'-'+formData.cmp_start_date.month+'-'+formData.cmp_start_date.year+" " + formData.time.hour + ":" + formData.time.minute,
      "cmp_status": formData.cmp_status,

    };
    // this.EditFormInit();

    this.CampaignService.UpdateCampaign(data).subscribe(res => {
      if (res.status == 200) {
        
        swal({
          title: "Campaign updated successfully!",
          
          type: "success",


        })
        
      } else {
        
        swal({
          title: "Can't update Campaign!",
          text: res.message,
          type: "error",


        })
      }
    }, err => {
      
      swal({
        title: "Can't update Campaign!",
        text: err.message,
        type: "error",


      })
    });


  }

  // alert Messages
  StatusMsg: any = {};
  AlertHandler(type: string, msg: string) {
    this.StatusMsg.type = type;
    this.StatusMsg.msg = msg;
    setTimeout(() => {
      this.StatusMsg = {};
    }, 3000);

  }

  // incrment steps
  steps:any=1;
  StepsIncrement()
  {
     if(this.steps>3)
     {
       return false;
     }
     else{
       this.steps=this.steps+1;  
     }
     
     
  }
  // Select template from3 
  SelectedTemplate:any=null;
  SelectTemplate(value:any)
  {
    this.SelectedTemplate=value;
    // console.log(value);
  }

  SetTemplate()
  {
      this.StepsIncrement();
  }

 

}
