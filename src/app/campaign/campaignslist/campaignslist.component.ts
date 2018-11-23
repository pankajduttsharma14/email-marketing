import { Component, OnInit, ViewChild, ViewEncapsulation,ElementRef,Renderer } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { DomSanitizer} from '@angular/platform-browser';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import swal, { SweetAlertOptions } from 'sweetalert2';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
// import { CreatecampaignComponent } from '../createcampaign/createcampaign.component';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
// declare var swal: any;
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import {DesigncampaignComponent} from '../designcampaign.component';
import { APIEndpoint } from '../../appsettings/BaseUrl';




@Component({
  selector: 'app-campaignslist',
  templateUrl: './campaignslist.component.html',
  styleUrls: ['./campaignslist.component.css'],
  providers: [CampaignService],
  encapsulation: ViewEncapsulation.None,

})

export class CampaignslistComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('saveSwal') private saveSwal: SwalComponent;
  @ViewChild(DesigncampaignComponent) DesigncampaignComponent;
  
  BASE_URL:string;
  AddCampaign: FormGroup;
  time = { hour: 13, minute: 30 };
  seconds = false;
  Loader:boolean=false;
  constructor(private CampaignService: CampaignService
    ,private sanitizer: DomSanitizer,
    private fb:FormBuilder,
     private elementRef: ElementRef,
     private render:Renderer
    ) {
    this.BASE_URL = APIEndpoint.BaseUrl;
}

  DeleteID: any;
  // Delete campaign
  showAlert(value) {

    let that = this;

    this.DeleteID = value;
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",

    }).then((result) => {
      if (result.value) {
        that.DeleteCampaign(this.DeleteID);
      } else {
        swal({
          title: "Campaign is not deleted!",
          text: "Your Data is safe",
          type: "error",


        })
      }
    });
  }




  ngOnInit() {
    // Get All campaign list
    this.GetAllCampaignList();
    // Create templates html array
    this.CreateTemplatesArray();
    // selected template
    this.SelectedEmailOption(2);
    

  }


   // Get All campaign list
  GetAllCampaignList() {

    this.CampaignService.GetAllCampaignList().subscribe(res => {
      if(res.status==200)
      {
        this.rows = res.data;
      this.temp = [...res.data];
      }
      else
      {
         this.rows = [];
         this.temp = [];
      }
      
      
    }, err => {});
  }
  temp:any = [];
  data:any = [];
  rows:any = [];
  columns = [
    { prop: 'name' },
    { name: 'Campaing Id', prop: 'campaign_id' },
    { name: 'Discription', prop: 'discription' },
    { name: 'Status', prop: 'status' },
    { name: 'Options', prop: 'campaign_id' },

  ];

  // data table filter code
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  // Delete campaign
  DeleteCampaign(id) {
    this.Loader=true;
    let data = {
      "user_id": localStorage.getItem('user_id'),
      "campaign_id": id
    }
    this.CampaignService.DeleteCampaign(data).subscribe(res => {
      if (res.status == 200) {
        this.Loader=false;
        swal({
          title: "Campaign Deleted Successfully!",
          // text: "!",
          type: "success",


        })
        this.GetAllCampaignList();
      }
      else
      {
        this.Loader=false;
      }

    }, err => {
      this.Loader=false;
      swal({
        title: "Campaign is not deleted!",
        text: "Your Data is safe",
        type: "error",


      })
    });
  }
  
 
  // First step tamplte selection box toggle
  ObjectiveBoxShow:any=false;
  ToggleObjective()
  {   this.Step=1;   
      this.ObjectiveBoxShow=this.ObjectiveBoxShow==false? true:false;
      if (this.ObjectiveBoxShow==false) {
            localStorage.removeItem('selected_mailer');
            localStorage.removeItem('subject');
            localStorage.removeItem('Temp_id');
            $('body').css('overflow','auto');
      }  
      else
      {
         this.SelectTemplate(1); 
         $('body').css('overflow','hidden');
      }

  }  
  TemplateType:any=1;
  TemplateData:any=new Array();

  // create template array with heading discription and html
  CreateTemplatesArray()
  {
      this.TemplateData=[
      { id:1, 
        heading:'Turn new customers into repeat customers',
        text:'After you customize and activate this campaign, your new customers will automatically get an email within 24 hours of their first visit. Sweeten the deal with a coupon good towards their next purchase.',
        html:'<div class="box_main ignore-drag"> <div class="editable" id="header1" style="background-size:cover; background-image:url(http://dev.syscraft-sqemailmarketingtool.tk/uploads/gallery_images/8aa7db4399cbfea4dabb9b13981f41d2.jpg);  height: 200px; max-width: 100%; text-align: center;"><div class="logo" style="background-position: center; background-size: contain; background-image:url('+this.BASE_URL+'/uploads/icon_images/store.png); border: 3px solid #fff; height:77px; width:77px; background-color: #2E93C8; border-radius:11px; display: inline-block; background-repeat: no-repeat; margin-top:45px;"></div><p style="color: #ffffff; font-weight: 500; font-size: 16px; margin-top: 6px;">Business Name</p></div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" contenteditable="true" id="heading1" placeholder="Add Some Text" style="font-family: Arial, sans-serif;text-align: center;margin-top: 10px;margin-bottom: 10px;font-weight: 700;font-style: italic;font-size: 16px;color: #000;">Save with these Labor Day deals.</div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" contenteditable="true" id="text1" placeholder="Add Some Text" style="font-family: Arial, sans-serif;text-align: center;margin-top: 10px;margin-bottom: 10px;font-weight: 300;font-style: normal;font-size: 14px;color: #000;">Summer is winding down but there’s still time for big savings. Come in and stock up at our Labor Day sale.</div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" id="image1"> <a href="#"> <img src="http://dev.syscraft-sqemailmarketingtool.tk/uploads/gallery_images/4b07241ea1baf51286a0dfd2c3f67b41.jpg" style="width: auto; max-width:100%; margin: 20px auto;display: block;"> </a> </div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" contenteditable="true" id="text2" placeholder="Add Some Text" style="font-family: Arial, sans-serif;text-align: center;margin-top: 10px;margin-bottom: 10px;">Or tell the cashier the rewards code below when you pay</div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" id="button847" style="text-align: center;"> <a href="#" style="font-family:Arial, sans-serif; margin:0px auto;background-color: #007bff;padding-right:20px; padding-left:20px; padding-top: 10px;padding-bottom: 10px; text-align: center; margin: 10px auto; color: #fff;font-weight: 600;border-radius: 0px; display:inline-block; border:none; font-size: 14px; width:auto; text-decoration:none;">Button</a> </div></div><div class="box_main ignore-drag" style="padding:0 20px;"> <div class="editable" id="socialicons1" style="background-color:transparent; display:block; text-align: center; margin-bottom:10px;"> <a href="#" id="Facebook" style="margin-right:10px;  background-color: #7d8b92;  display: inline-block; padding:10px;" title="Facebook"> <img alt="Facebook" src="'+ this.BASE_URL+'uploads/icon_images/facebook.png" style="height: 30px; width:30px;"> </a> <a href="#" id="Twitter" style="margin-right:10px;  background-color: #7d8b92;  display: inline-block; padding:10px;" title="Twitter"> <img alt="Twitter" src="'+ this.BASE_URL+'uploads/icon_images/twitter.png" style="height: 30px; width:30px;"> </a> <a href="#" id="Linkedin" style="margin-right:10px;  background-color: #7d8b92;  display: inline-block; padding:10px;" title="Linkedin"> <img alt="Linkedin" src="'+ this.BASE_URL+'uploads/icon_images/linkedin.png" style="height: 30px; width:30px;"> </a> </div></div><div class="box_main ignore-drag" style="padding:0 20px;"> <div class="editable footer_mail" contenteditable="true" placeholder="Add Some Text" style="font-family: Arial, sans-serif;text-align: center;padding-top: 10px;padding-bottom: 10px; margin-bottom: 20px; font-size: 12px;" id="text21">Footer Content Here</div></div>',
      },
      { id:2, 
        heading:'Encourage your lapsed customers to return',
        text:'Turn on this campaign to automatically send an email to any customers who used to visit your store frequently, but have not returned in 6 weeks. Include a special offer to entice them to come back.',
        html:'<div class="box_main ignore-drag"> <div class="editable" id="header1" style="background-size:cover; background-image:url(http://qa.syscraft-sqemailmarketingtool.tk/uploads/gallery_images/e02e45365a9dde2a1019613fe416db53.jpg);  height: 200px; max-width: 100%; text-align: center;"><div class="logo" style="background-position: center; background-size: contain; background-image:url('+this.BASE_URL+'/uploads/icon_images/store.png); border: 3px solid #fff; height:77px; width:77px; background-color: #2E93C8; border-radius:11px; display: inline-block; background-repeat: no-repeat; margin-top:45px;"></div><p style="color: #ffffff; font-weight: 500; font-size: 16px; margin-top: 6px;">Business Name1</p></div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" contenteditable="true" id="heading1" placeholder="Add Some Text" style="font-family: Arial, sans-serif;text-align: center;margin-top: 10px;margin-bottom: 10px;font-weight: 700;font-style: italic;font-size: 16px;color: #000;">Save with these Labor Day deals.</div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" contenteditable="true" id="text1" placeholder="Add Some Text" style="font-family: Arial, sans-serif;text-align: center;margin-top: 10px;margin-bottom: 10px;font-weight: 300;font-style: normal;font-size: 14px;color: #000;">Summer is winding down but there’s still time for big savings. Come in and stock up at our Labor Day sale.</div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" id="image1"> <a href="#"> <img src="http://dev.syscraft-sqemailmarketingtool.tk/uploads/gallery_images/4b07241ea1baf51286a0dfd2c3f67b41.jpg" style="width: auto; max-width:100%; margin: 20px auto;display: block;"> </a> </div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" contenteditable="true" id="text2" placeholder="Add Some Text" style="font-family: Arial, sans-serif;text-align: center;margin-top: 10px;margin-bottom: 10px;">Or tell the cashier the rewards code below when you pay</div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" id="button847" style="text-align: center;"> <a href="#" style="font-family:Arial, sans-serif; margin:0px auto;background-color: #007bff;padding-right:20px; padding-left:20px; padding-top: 10px;padding-bottom: 10px; text-align: center; margin: 10px auto; color: #fff;font-weight: 600;border-radius: 0px; display:inline-block; border:none; font-size: 14px; width:auto; text-decoration:none;">Button</a> </div></div><div class="box_main ignore-drag" style="padding:0 20px;"> <div class="editable" id="socialicons1" style="background-color:transparent; display:block; text-align: center; margin-bottom:10px;"> <a href="#" id="Facebook" style="margin-right:10px;  background-color: #7d8b92;  display: inline-block; padding:10px;" title="Facebook"> <img alt="Facebook" src="'+ this.BASE_URL+'uploads/icon_images/facebook.png" style="height: 30px; width:30px;"> </a> <a href="#" id="Twitter" style="margin-right:10px;  background-color: #7d8b92;  display: inline-block; padding:10px;" title="Twitter"> <img alt="Twitter" src="'+ this.BASE_URL+'uploads/icon_images/twitter.png" style="height: 30px; width:30px;"> </a> <a href="#" id="Linkedin" style="margin-right:10px;  background-color: #7d8b92;  display: inline-block; padding:10px;" title="Linkedin"> <img alt="Linkedin" src="'+ this.BASE_URL+'uploads/icon_images/linkedin.png" style="height: 30px; width:30px;"> </a> </div></div><div class="box_main ignore-drag" style="padding:0 20px;"> <div class="editable footer_mail" contenteditable="true" placeholder="Add Some Text" style="font-family: Arial, sans-serif;text-align: center;padding-top: 10px;padding-bottom: 10px; margin-bottom: 20px; font-size: 12px;" id="text21">Footer Content Here</div></div>',
      },
      { id:3, 
        heading:'Some Heading Text Here!',
        text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        html:'<div class="box_main ignore-drag"> <div class="editable" id="header1" style="background-size:cover; background-image:url(http://dev.syscraft-sqemailmarketingtool.tk/uploads/gallery_images/cd17319a7b086f850f248d25a914dad1.jpg);  height:200px; max-width: 100%; text-align: center;"><div class="logo" style="background-position: center; background-size: contain; background-image:url('+this.BASE_URL+'/uploads/icon_images/store.png); border: 3px solid #fff; height:77px; width:77px; background-color: #2E93C8; border-radius:11px; display: inline-block; background-repeat: no-repeat; margin-top:45px;"></div><p style="color: #ffffff; font-weight: 500; font-size: 16px; margin-top: 6px;">Business Name 3</p></div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" contenteditable="true" id="heading1" placeholder="Add Some Text" style="font-family: Arial, sans-serif;text-align: center;margin-top: 10px;margin-bottom: 10px;font-weight: 700;font-style: italic;font-size: 16px;color: #000;">Save with these Labor Day deals.</div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" contenteditable="true" id="text1" placeholder="Add Some Text" style="font-family: Arial, sans-serif;text-align: center;margin-top: 10px;margin-bottom: 10px;font-weight: 300;font-style: normal;font-size: 14px;color: #000;">Summer is winding down but there’s still time for big savings. Come in and stock up at our Labor Day sale.</div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" id="image1"> <a href="#"> <img src="http://dev.syscraft-sqemailmarketingtool.tk/uploads/gallery_images/4b07241ea1baf51286a0dfd2c3f67b41.jpg" style="width: auto; max-width:100%; margin: 20px auto;display: block;"> </a> </div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" contenteditable="true" id="text2" placeholder="Add Some Text" style="font-family: Arial, sans-serif;text-align: center;margin-top: 10px;margin-bottom: 10px;">Or tell the cashier the rewards code below when you pay</div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" id="button847" style="text-align: center;"> <a href="#" style="font-family:Arial, sans-serif; margin:0px auto;background-color: #007bff;padding-right:20px; padding-left:20px; padding-top: 10px;padding-bottom: 10px; text-align: center; margin: 10px auto; color: #fff;font-weight: 600;border-radius: 0px; display:inline-block; border:none; font-size: 14px; width:auto; text-decoration:none;">Button</a> </div></div><div class="box_main ignore-drag" style="padding:0 20px;"> <div class="editable" id="socialicons1" style="background-color:transparent; display:block; text-align: center; margin-bottom:10px;"> <a href="#" id="Facebook" style="margin-right:10px;  background-color: #7d8b92;  display: inline-block; padding:10px;" title="Facebook"> <img alt="Facebook" src="'+ this.BASE_URL+'uploads/icon_images/facebook.png" style="height: 30px; width:30px;"> </a> <a href="#" id="Twitter" style="margin-right:10px;  background-color: #7d8b92;  display: inline-block; padding:10px;" title="Twitter"> <img alt="Twitter" src="'+ this.BASE_URL+'uploads/icon_images/twitter.png" style="height: 30px; width:30px;"> </a> <a href="#" id="Linkedin" style="margin-right:10px;  background-color: #7d8b92;  display: inline-block; padding:10px;" title="Linkedin"> <img alt="Linkedin" src="'+ this.BASE_URL+'uploads/icon_images/linkedin.png" style="height: 30px; width:30px;"> </a> </div></div><div class="box_main ignore-drag" style="padding:0 20px;"> <div class="editable footer_mail" contenteditable="true" placeholder="Add Some Text" style="font-family: Arial, sans-serif;text-align: center;padding-top: 10px;padding-bottom: 10px; margin-bottom: 20px; font-size: 12px;" id="text21">Footer Content Here</div></div>',
      }
      ];
  }
  

  
  TemplateHeading:any;
  TemplateText:any;
  TemplateHTML:any;

  // Select template from options
  SelectTemplate(id)
  { 
    this.TemplateType=id; 

    for(let i=0;i<this.TemplateData.length;i++)
    {
        if(this.TemplateData[i].id==id)
        {
            this.TemplateHeading=this.TemplateData[i].heading;
            // this.TemplateText=this.TemplateData[i].text;
            this.TemplateHTML=this.sanitizer.bypassSecurityTrustHtml(this.TemplateData[i].html);
            localStorage.setItem('selected_mailer',this.TemplateData[i].html);
            localStorage.setItem('subject',this.TemplateData[i].heading);
            localStorage.setItem('Temp_id',null);
        }
    }

   


    
  }



  // Increase steps
  Step:any=1;
  StepsIncrement()
  {
     if(this.Step==3)
     {
       return false;
     }
    
     else{
       this.Step=this.Step+1;  
     }
     
     
  }

  // Steps decrese
  StepsDecrement()
  {    var _self=this;
      if(this.Step==1)
      {
        return false;

      }
      else if(this.Step==2){


      this.ShowAlert2(()=>{
      
      var DraftBtn=$('.button_box').find('.dr_btn');
      var DiscardBtn=$('.button_box').find('.dis_btn');
      var CancelBtn=$('.button_box').find('.can_btn');
       $(DraftBtn).bind('click',function(e){
           _self.SaveDraft();
           swal.close();
           _self.Step=_self.Step-1;  
           _self.ToggleObjective();  


       });
       $(DiscardBtn).bind('click',function(e){
          _self.Step=_self.Step-1;  
          _self.ToggleObjective();
          swal.close();

       });
       $(CancelBtn).bind('click',function(e){
           swal.close();
       });
     
      });
      
     }
    

     else{
         this.Step=this.Step-1;  
     }
  }


// Save as draft alert
ShowAlert2(callback)
{

  swal({
      title: "Are you sure?",
      text: "You will not be able to recover this!",
      type: "warning",
      showConfirmButton:false,
      showCancelButton: false,
      confirmButtonColor: "#007bff",
      cancelButtonColor: "#DD6B55",
      confirmButtonText: "Save as Draft",
      cancelButtonText: "Delete",
      html:'<div class="button_box"><button class="dr_btn btn btn-primary">Save as draft</button><button class="dis_btn btn btn-danger">Discard</button><button class="can_btn btn btn-warning">Cancel</button></div>'

    });
    setTimeout(()=>{
        callback();
    },0);
  }

// Save as draft  and create new or old update campaign
  SaveDraft()
  {
     this.Loader=true;
     this.DesigncampaignComponent.EditToggle(); 
     let html_string=$('<div>').append($('.email_template').clone().removeClass('email_template').children('*').removeAttr('contenteditable').wrap('.box_main')).html();
     
     if(localStorage.getItem('Temp_id')=='null')
     {
         let data={
       "user_id":localStorage.getItem('user_id'),
       "cmp_name":this.DesigncampaignComponent.MailSubject,
       "cmp_temp_html":html_string,
       "cmp_status":"Draft"
     };  
     this.CampaignService.CreateCampaign(data).subscribe(res=>{

       if (res.status == 200) {
         this.Loader=false;
        this.GetAllCampaignList();
        swal({
          title: "Draft saved successfully!",
          // text: "",
          type: "success",


        })
        
      } else {
        this.Loader=false;
        
        swal({
          title: "Can't save Draft!",
          text: res.message,
          type: "error",


        })
      }
    }, err => {
      this.Loader=false;
      
      swal({
        title: "Can't save Draft!",
        text: err.message,
        type: "error",


      })
    });
     }
     else
     {
         let data={
       "user_id":localStorage.getItem('user_id'),
       "cmp_name":this.DesigncampaignComponent.MailSubject,
       "cmp_temp_html":html_string,
       "cmp_status":"Draft",
       "campaign_id":localStorage.getItem('Temp_id')
     };  
     this.CampaignService.UpdateCampaign(data).subscribe(res=>{

       if (res.status == 200) {
         this.Loader=false;
        this.GetAllCampaignList();
        swal({
          title: "Draft saved successfully!",
          // text: "",
          type: "success",


        })
        
      } else {
        this.Loader=false;
        
        swal({
          title: "Can't save Draft!",
          text: res.message,
          type: "error",


        })
      }
    }, err => {
      this.Loader=false;
      
      swal({
        title: "Can't save Draft!",
        text: err.message,
        type: "error",


      })
    });

     }
     
     
  }
    
  // Edit campaign Code load data to local
  EditCampaign(id)
  {
      this.Loader=true;
      let data={
          "user_id":localStorage.getItem('user_id'),
          "campaign_id":id,
      };   
      this.CampaignService.ViewCampaign(data).subscribe(res=>{
        
            if(res.status==200)
            {
                this.Loader=false;
                let records=res.data[0];
                this.ToggleObjective();
                localStorage.setItem('selected_mailer',records.cmp_temp_html);
                localStorage.setItem('subject',records.name);
                localStorage.setItem('Temp_id',records.campaign_id);
                this.Step=2;
                
            }
            else
            {
              this.Loader=false;
                 swal({
        title: "No Records!",
        text: res.message,
        type: "error",


      })
            }
      },err=>{
        this.Loader=false;
           swal({
        title: "No Records!",
        text: err.message,
        type: "error",


      })
      });
  }

  Emailer:any=null;
  Subject:any=null;
  MailTo:any=null;

  // Review and send emailer to id
  ReviewSend()
  { 
    this.DesigncampaignComponent.EditToggle();
    this.Subject=this.DesigncampaignComponent.MailSubject;
    // let Emailer=$('<div>').append($('.email_template').clone().removeClass('email_template').find('.editable').removeAttr('contenteditable')).html();
    // Final wraping code
    let Emailer=$('<div>').append($('.email_template').clone().removeClass('email_template').children('*').removeAttr('contenteditable').wrap('.box_main')).html();
    localStorage.setItem('selected_mailer',Emailer);
    let NewEle=document.createElement('div');
    NewEle.innerHTML= Emailer;
    this.Emailer= $(NewEle).css({'width':'600px','background':this.DesigncampaignComponent.bg_color,'margin':'0px auto'}).wrap('<p/>').parent().html();
    this.StepsIncrement();
    this.SavePreviewEmailer(this.DesigncampaignComponent.bg_color);

  }

  // Send mail to particual id
  SendMail()
  {
    
    this.Loader=true;
    
     let data={
      "subject":this.Subject,
      "send_to":this.MailTo,
      "email_body":this.Emailer,
      "campaign_id":localStorage.getItem('Temp_id')=='null' ? '':localStorage.getItem('Temp_id'),
      "user_id":localStorage.getItem('user_id'),
      }
      this.MailTo='';


      this.CampaignService.SendEmail(data).subscribe(res=>{

       if (res.status == 200) {
        this.GetAllCampaignList();
        this.Loader=false;
        swal({
          title: "Mail sent successfully!",
          // text: "",
          type: "success",


        })
        
      } else {
        this.Loader=false;
        
        swal({
          title: "Sending Failed!",
          text: res.message,
          type: "error",


        })
      }
    }, err => {
      this.Loader=false;
      
      swal({
        title: "Sending Failed!",
        text: err.message,
        type: "error",


      })
    });

  }

  // Send mail to self
  SendToSelf(e)
  {
    
    this.Loader=true;
     let EmailID=$(e.target).html(); 
     console.log(EmailID);
     let data={
      "subject":this.Subject,
      "send_to":EmailID,
      "email_body":this.Emailer,
      "campaign_id":localStorage.getItem('Temp_id')=='null' ? '':localStorage.getItem('Temp_id'),
      "user_id":localStorage.getItem('user_id'),
      }
      this.MailTo='';


      this.CampaignService.SendEmail(data).subscribe(res=>{

       if (res.status == 200) {
        this.GetAllCampaignList();
        this.Loader=false;
        swal({
          title: "Mail sent successfully!",
          // text: "",
          type: "success",


        })
        
      } else {
        this.Loader=false;
        
        swal({
          title: "Sending Failed!",
          text: res.message,
          type: "error",


        })
      }
    }, err => {
      this.Loader=false;
      
      swal({
        title: "Sending Failed!",
        text: err.message,
        type: "error",


      })
    });

  }

  // Preview emailer on phone in final screen
  FinalEmailer: any;

  SavePreviewEmailer(color1) {

    // $('.email_template *').removeAttr('contenteditable');
    var EmailerHtml = $('<div>').append($('.email_template').clone().removeClass('email_template').find('.editable').removeAttr('contenteditable')).html();
    this.FinalEmailer = this.sanitizer.bypassSecurityTrustHtml(EmailerHtml);


    $(function() {
      $('.emailer_preview').find('a').click(function() {
        return false;
      });
      $("#mobile_temp").css('background',color1);
    })

    

  }

  // toggle mail option ie all or custom in last screen
  SelectedOptionValue:any; 
  SelectedEmailOption(val)
  {     
      this.SelectedOptionValue=val;

  }





}
