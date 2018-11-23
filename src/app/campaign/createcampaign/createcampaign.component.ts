import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { CampaignService } from '../../services/campaign.service';
import swal, { SweetAlertOptions } from 'sweetalert2';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import {SpinnerComponent} from '../../shared/spinner.component';

@Component({
  selector: 'app-createcampaign',
  templateUrl: './createcampaign.component.html',
  styleUrls: ['./createcampaign.component.css'],
  providers: [CampaignService],
  encapsulation:ViewEncapsulation.None
})
export class CreatecampaignComponent implements OnInit {
  @ViewChild('saveSwal') private saveSwal: SwalComponent;
  
  AddCampaign: FormGroup;
  time = { hour: 13, minute: 30 };
  seconds = false;
  constructor(private fb: FormBuilder,
    private CampaignService: CampaignService
  ) {}

  ngOnInit() {
    this.AddFormInit();
    
  }

  AddFormInit() {
    this.AddCampaign = this.fb.group({
      "cmp_name": ['', Validators.compose([Validators.required])],
      "cmp_description": ['', Validators.compose([Validators.required])],
      "cmp_start_date": ['', Validators.compose([Validators.required])],
      "cmp_end_date": ['', Validators.compose([Validators.required])],
      "cmp_status": ['', Validators.compose([Validators.required])],
      "time": [this.time, Validators.compose([Validators.required])],
    });

  }

  status: any
  StatusUpdate(e) {
    this.status = e.target.value;
    if (this.status != 'Scheduled') {
      this.AddCampaign.controls['cmp_start_date'].setValue(this.DateConvert());
      this.AddCampaign.controls['cmp_end_date'].setValue(this.DateConvert());
      this.AddCampaign.controls['time'].setValue(this.time);

    } else {
      this.AddCampaign.controls['cmp_start_date'].setValue('');
      this.AddCampaign.controls['cmp_end_date'].setValue('');
      this.AddCampaign.controls['time'].setValue('');
    }


  }

  DateConvert() {
    var date = new Date();
    console.log(date);
    var day: any = date.getDate();
    var month: any = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var dateConverted = year + "-" + month + "-" + day;
    return dateConverted;
  }


  CreateCampaign(formData) {

    let data = {
      "user_id": localStorage.getItem('user_id'),
      "cmp_name": formData.cmp_name,
      "cmp_description": formData.cmp_description,
      "cmp_start_date": formData.cmp_start_date.day+'-'+formData.cmp_start_date.month+'-'+formData.cmp_start_date.year+" "+formData.time.hour + ":" + formData.time.minute,
      "cmp_end_date": formData.cmp_start_date.day+'-'+formData.cmp_start_date.month+'-'+formData.cmp_start_date.year+" " + formData.time.hour + ":" + formData.time.minute,
      "cmp_status": formData.cmp_status,

    };
    this.AddFormInit();

    this.CampaignService.CreateCampaign(data).subscribe(res => {
      if (res.status == 200) {
        
        swal({
          title: "Campaign created successfully!",
          // text: "",
          type: "success",


        })
        // this.AlertHandler('SUCCESS',"Successfull");
      } else {
        // this.AlertHandler('ERROR', "Failed");
        swal({
          title: "Can't create new Campaign!",
          text: res.message,
          type: "error",


        })
      }
    }, err => {
      // this.AlertHandler('ERROR', err);
      swal({
        title: "Can't create new Campaign!",
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



  SelectedTemplate:any=null;
  SelectTemplate(value:any)
  {
    this.SelectedTemplate=value;
    console.log(value);
  }

  // SetTemplate()
  // {
  //     this.StepsIncrement();
  // }


}
