<template>
<div class="design_main">
 <div class="objective_popup" v-bind:class="{'ObjectiveBoxShow':ObjectiveBoxShow==true}">
    <div class="">
      <div class="card">
        <ul class="stepper">
          <li class="pull-left cross_icon" v-on:click="ToggleObjective()" v-if="DesignStep==1">
            <svg id="ember5788" viewBox="0 -1 18 18" height="18" width="18" class="svg-icon svg-icon-close-x svg-icon--theme-color-medium svg-icon-close-x--large ember-view">
              <!---->
              <g stroke="#70767C" stroke-width="2" fill="none" fill-rule="evenodd" class="svg-icon__stroke">
                <path d="M17 0L1 16M1 0l16 16"></path>
              </g>
            </svg>
          </li>
          <li class="pull-left back_icon" v-if="DesignStep>1" v-on:click="DesignStepsDecrement">
            <i class="mdi mdi-arrow-left"></i>
          </li>
          <li v-bind:class="{'active':DesignStep>=1, 'current':DesignStep==1}"><span>OBJECTIVE</span></li>
          <li v-bind:class="{'active':DesignStep>=2, 'current':DesignStep==2}"><span>DESIGN</span></li>
          <!-- <li v-bind:class="{'active':DesignStep>=3}"><span>Sender</span></li> -->
          <li v-bind:class="{'active':DesignStep>=3, 'current':DesignStep==3}"><span>AUDIENCE</span></li>
          <li v-bind:class="{'active':DesignStep==4, 'current':DesignStep==4}" class="no_icon"><span>Review & Send</span></li>
          <li class="pull-right">
            <button class="btn btn-info waves-effect waves-light" type="button" v-on:click="DesignStepsIncrement();" v-if="DesignStep==1">
              <span class="btn-label"><i class="fa fa-angle-double-right"></i></span>Next
            </button>
            <button class="btn btn-info waves-effect waves-light" type="button" v-on:click="ReviewSend();" v-if="DesignStep==2">
              <span class="btn-label"><i class="fa fa-angle-double-right"></i></span>Next
            </button>
          </li>
        </ul>
      </div>
    </div>
    <!-- DesignStep 1 -->
    <div class="container" v-if="DesignStep==1">
      <div class="row">
        <div class="col-md-4">
          <div class="Compaign_type">
            <h3>Select a Campaign Type</h3>
            <small>Automated Campaigns</small>
          </div>
          <div class="campaigntype_list">
            <ul>
              <li v-on:click="SelectTemplate(1);" v-bind:class="{'active':TemplateType=='1'}"><i class="fa fa fa-bullhorn"></i> Welcome new customers</li>
              <li v-on:click="SelectTemplate(2);" v-bind:class="{'active':TemplateType=='2'}"><i class="fa fa-pagelines"></i> Bring back lapsed Customer Campaign</li>
              <li v-on:click="SelectTemplate(3);" v-bind:class="{'active':TemplateType=='3'}"><i class="fa fa-envelope"></i> Other Custom Campaign</li>
            </ul>
          </div>
        </div>
        <div class="col-md-8">
          <div class="Preview_heding">
          </div>
          <div class="template_heading">
            <h3>{{TemplateHeading}}</h3>
            <p>{{TemplateText}}</p>
          </div>
          <div class="Template_preview" v-html="TemplateHTML">
          </div>
        </div>
      </div>
    </div>
    <!-- DesignStep 1 -->
    <!--DesignStep 2-->
    <div class="container-fluid" v-if="DesignStep==2">
      <Design/>
    </div>
    <!--DesignStep 2-->
    <!--DesignStep 3-->
    <div class="container" v-if="DesignStep==3">
      <div class="review_send">
        <div class="row">
          <div class="col-md-6">
            <div class="Re_Content">
              <h2>Who do you want to reach?</h2>
              <h3>Email</h3>
              <p>Filter which customers you send this campaign to by using groups and locations, otherwise this campaign will be sent to all reachable customers.</p>
              <div class="email_options">
                  <ul>
                    <li v-on:click="SelectedEmailOption(1);" v-bind:class="{'activeOptions':SelectedOptionValue==1}">
                      <h3>All Customers</h3>
                      <p>Send to all reachable customers</p>
                    </li>
                    <li v-on:click="SelectedEmailOption(2);" v-bind:class="{'activeOptions':SelectedOptionValue==2}">
                      <h3>Custom</h3>
                      <p>Send to a subset of reachable customers</p>
                    </li>
                  </ul>
              </div>
              <div class="form-group" v-if="SelectedOptionValue==2">
                <label>Enter customer email to send an email.</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"><i class="fa fa-envelope"></i></span>
                  </div>
                  <input type="text" class="form-control" placeholder="Email" v-model="MailTo">
                </div>
                <div class="input-group">
                  <button class="btn btn-info waves-effect waves-light" type="button" v-on:click="SendMail();">
                    <span class="btn-label"><i class="fa fa-paper-plane"></i></span>Send Email
                  </button>
                </div>
              </div>
              <div class="form-group" v-if="SelectedOptionValue==1">
                  <h3>Coming Soon...</h3>
              </div>
            </div>
          </div>
          <div class="col-md-6">
              <div class="mobile_frame">
                <div class="preview_mail">
                  <span class="">
                    Send yourself a preview of your email.<br>
                    <a href="javascript:void(0)" v-on:click="SendToSelf($event);">andy@addmi.com</a>
                  </span>
                </div>
                  <div class="scroll_box">
                    <div class="Template_preview" v-html="FinalEmailer" id="mobile_temp"></div>
                  </div>
              </div>

          </div>
        </div>
      </div>
    </div>
    <!--DesignStep 3-->
  </div>
</div>
</template>

<script>
import eventbus from "./eventbus";
import $ from "jquery";
import router from "../routes";
import Design from "./design";
import { SaveAsDraft, SendEmail } from "../api/campaign";
const Swal = require("sweetalert2");

export default {
  name: "Campaign",
  components: {
    Design
  },

  data() {
    return {
      TemplateHeading: "",
      TemplateText: "",
      TemplateType: "",
      TemplateData: [],
      SelectedOptionValue: "",
      ObjectiveBoxShow: false,
      DesignStep: 1,
      TemplateHTML: "",
      BASE_URL: "http://dev.syscraft-sqemailmarketingtool.tk/",
      Subject: "",
      FinalEmailer: "",
      MailTo: ""
    };
  },
  methods: {
    ToggleObjective() {
      this.DesignStep = 1;
      this.ObjectiveBoxShow = this.ObjectiveBoxShow == false ? true : false;
      if (this.ObjectiveBoxShow == false) {
        localStorage.removeItem("selected_mailer");
        localStorage.removeItem("subject");
        localStorage.removeItem("Temp_id");
        $("body").css("overflow", "auto");
        
      } else {
        this.SelectTemplate(1);
        $("body").css("overflow", "hidden");
      }
    },

    DesignStepsIncrement() {
      if (this.DesignStep == 3) {
        return false;
      } else {
        this.DesignStep = this.DesignStep + 1;
      }
    },
    SelectTemplate(id) {
      this.TemplateType = id;

      for (let i = 0; i < this.TemplateData.length; i++) {
        if (this.TemplateData[i].id == id) {
          this.TemplateHeading = this.TemplateData[i].heading;
          this.TemplateHTML = this.TemplateData[i].html;
          localStorage.setItem("selected_mailer", this.TemplateData[i].html);
          localStorage.setItem("subject", this.TemplateData[i].heading);
          localStorage.setItem("Temp_id", null);
        }
      }
    },
    CreateTemplatesArray() {
      this.TemplateData = [
        {
          id: 1,
          heading: "Turn new customers into repeat customers",
          text:
            "After you customize and activate this campaign, your new customers will automatically get an email within 24 hours of their first visit. Sweeten the deal with a coupon good towards their next purchase.",
          html:
            '<div class="box_main ignore-drag"> <div class="editable" id="header1" style="background-size:cover; background-image:url(http://dev.syscraft-sqemailmarketingtool.tk/uploads/gallery_images/8aa7db4399cbfea4dabb9b13981f41d2.jpg);  height: 200px; max-width: 100%; text-align: center;"><div class="logo" style="background-position: center; background-size: contain; background-image:url(' +
            this.BASE_URL +
            'uploads/icon_images/store.png); border: 3px solid #fff; height:77px; width:77px; background-color: #2E93C8; border-radius:11px; display: inline-block; background-repeat: no-repeat; margin-top:45px;"></div><p style="color: #ffffff; font-weight: 500; font-size: 16px; margin-top: 6px;">Business Name</p></div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" contenteditable="true" id="heading1" placeholder="Add Some Text" style="font-family: Arial, sans-serif;text-align: center;margin-top: 10px;margin-bottom: 10px;font-weight: 700;font-style: italic;font-size: 16px;color: #000;">Save with these Labor Day deals.</div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" contenteditable="true" id="text1" placeholder="Add Some Text" style="font-family: Arial, sans-serif;text-align: center;margin-top: 10px;margin-bottom: 10px;font-weight: 300;font-style: normal;font-size: 14px;color: #000;">Summer is winding down but there’s still time for big savings. Come in and stock up at our Labor Day sale.</div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" id="image1"> <a href="#"> <img src="http://dev.syscraft-sqemailmarketingtool.tk/uploads/gallery_images/4b07241ea1baf51286a0dfd2c3f67b41.jpg" style="width: auto; max-width:100%; margin: 20px auto;display: block;"> </a> </div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" contenteditable="true" id="text2" placeholder="Add Some Text" style="font-family: Arial, sans-serif;text-align: center;margin-top: 10px;margin-bottom: 10px;">Or tell the cashier the rewards code below when you pay</div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" id="button847" style="text-align: center;"> <a href="#" style="font-family:Arial, sans-serif; margin:0px auto;background-color: #007bff;padding-right:20px; padding-left:20px; padding-top: 10px;padding-bottom: 10px; text-align: center; margin: 10px auto; color: #fff;font-weight: 600;border-radius: 0px; display:inline-block; border:none; font-size: 14px; width:auto; text-decoration:none;">Button</a> </div></div><div class="box_main ignore-drag" style="padding:0 20px;"> <div class="editable" id="socialicons1" style="background-color:transparent; display:block; text-align: center; margin-bottom:10px;"> <a href="#" id="Facebook" style="margin-right:10px;  background-color: #7d8b92;  display: inline-block; padding:10px;" title="Facebook"> <img alt="Facebook" src="' +
            this.BASE_URL +
            'uploads/icon_images/facebook.png" style="height: 30px; width:30px;"> </a> <a href="#" id="Twitter" style="margin-right:10px;  background-color: #7d8b92;  display: inline-block; padding:10px;" title="Twitter"> <img alt="Twitter" src="' +
            this.BASE_URL +
            'uploads/icon_images/twitter.png" style="height: 30px; width:30px;"> </a> <a href="#" id="Linkedin" style="margin-right:10px;  background-color: #7d8b92;  display: inline-block; padding:10px;" title="Linkedin"> <img alt="Linkedin" src="' +
            this.BASE_URL +
            'uploads/icon_images/linkedin.png" style="height: 30px; width:30px;"> </a> </div></div><div class="box_main ignore-drag" style="padding:0 20px;"> <div class="editable footer_mail" contenteditable="true" placeholder="Add Some Text" style="font-family: Arial, sans-serif;text-align: center;padding-top: 10px;padding-bottom: 10px; margin-bottom: 20px; font-size: 12px;" id="text21">Footer Content Here</div></div>'
        },
        {
          id: 2,
          heading: "Encourage your lapsed customers to return",
          text:
            "Turn on this campaign to automatically send an email to any customers who used to visit your store frequently, but have not returned in 6 weeks. Include a special offer to entice them to come back.",
          html:
            '<div class="box_main ignore-drag"> <div class="editable" id="header1" style="background-size:cover; background-image:url(http://qa.syscraft-sqemailmarketingtool.tk/uploads/gallery_images/e02e45365a9dde2a1019613fe416db53.jpg);  height: 200px; max-width: 100%; text-align: center;"><div class="logo" style="background-position: center; background-size: contain; background-image:url(' +
            this.BASE_URL +
            'uploads/icon_images/store.png); border: 3px solid #fff; height:77px; width:77px; background-color: #2E93C8; border-radius:11px; display: inline-block; background-repeat: no-repeat; margin-top:45px;"></div><p style="color: #ffffff; font-weight: 500; font-size: 16px; margin-top: 6px;">Business Name1</p></div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" contenteditable="true" id="heading1" placeholder="Add Some Text" style="font-family: Arial, sans-serif;text-align: center;margin-top: 10px;margin-bottom: 10px;font-weight: 700;font-style: italic;font-size: 16px;color: #000;">Save with these Labor Day deals.</div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" contenteditable="true" id="text1" placeholder="Add Some Text" style="font-family: Arial, sans-serif;text-align: center;margin-top: 10px;margin-bottom: 10px;font-weight: 300;font-style: normal;font-size: 14px;color: #000;">Summer is winding down but there’s still time for big savings. Come in and stock up at our Labor Day sale.</div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" id="image1"> <a href="#"> <img src="http://dev.syscraft-sqemailmarketingtool.tk/uploads/gallery_images/4b07241ea1baf51286a0dfd2c3f67b41.jpg" style="width: auto; max-width:100%; margin: 20px auto;display: block;"> </a> </div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" contenteditable="true" id="text2" placeholder="Add Some Text" style="font-family: Arial, sans-serif;text-align: center;margin-top: 10px;margin-bottom: 10px;">Or tell the cashier the rewards code below when you pay</div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" id="button847" style="text-align: center;"> <a href="#" style="font-family:Arial, sans-serif; margin:0px auto;background-color: #007bff;padding-right:20px; padding-left:20px; padding-top: 10px;padding-bottom: 10px; text-align: center; margin: 10px auto; color: #fff;font-weight: 600;border-radius: 0px; display:inline-block; border:none; font-size: 14px; width:auto; text-decoration:none;">Button</a> </div></div><div class="box_main ignore-drag" style="padding:0 20px;"> <div class="editable" id="socialicons1" style="background-color:transparent; display:block; text-align: center; margin-bottom:10px;"> <a href="#" id="Facebook" style="margin-right:10px;  background-color: #7d8b92;  display: inline-block; padding:10px;" title="Facebook"> <img alt="Facebook" src="' +
            this.BASE_URL +
            'uploads/icon_images/facebook.png" style="height: 30px; width:30px;"> </a> <a href="#" id="Twitter" style="margin-right:10px;  background-color: #7d8b92;  display: inline-block; padding:10px;" title="Twitter"> <img alt="Twitter" src="' +
            this.BASE_URL +
            'uploads/icon_images/twitter.png" style="height: 30px; width:30px;"> </a> <a href="#" id="Linkedin" style="margin-right:10px;  background-color: #7d8b92;  display: inline-block; padding:10px;" title="Linkedin"> <img alt="Linkedin" src="' +
            this.BASE_URL +
            'uploads/icon_images/linkedin.png" style="height: 30px; width:30px;"> </a> </div></div><div class="box_main ignore-drag" style="padding:0 20px;"> <div class="editable footer_mail" contenteditable="true" placeholder="Add Some Text" style="font-family: Arial, sans-serif;text-align: center;padding-top: 10px;padding-bottom: 10px; margin-bottom: 20px; font-size: 12px;" id="text21">Footer Content Here</div></div>'
        },
        {
          id: 3,
          heading: "Some Heading Text Here!",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          html:
            '<div class="box_main ignore-drag"> <div class="editable" id="header1" style="background-size:cover; background-image:url(http://dev.syscraft-sqemailmarketingtool.tk/uploads/gallery_images/cd17319a7b086f850f248d25a914dad1.jpg);  height:200px; max-width: 100%; text-align: center;"><div class="logo" style="background-position: center; background-size: contain; background-image:url(' +
            this.BASE_URL +
            'uploads/icon_images/store.png); border: 3px solid #fff; height:77px; width:77px; background-color: #2E93C8; border-radius:11px; display: inline-block; background-repeat: no-repeat; margin-top:45px;"></div><p style="color: #ffffff; font-weight: 500; font-size: 16px; margin-top: 6px;">Business Name 3</p></div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" contenteditable="true" id="heading1" placeholder="Add Some Text" style="font-family: Arial, sans-serif;text-align: center;margin-top: 10px;margin-bottom: 10px;font-weight: 700;font-style: italic;font-size: 16px;color: #000;">Save with these Labor Day deals.</div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" contenteditable="true" id="text1" placeholder="Add Some Text" style="font-family: Arial, sans-serif;text-align: center;margin-top: 10px;margin-bottom: 10px;font-weight: 300;font-style: normal;font-size: 14px;color: #000;">Summer is winding down but there’s still time for big savings. Come in and stock up at our Labor Day sale.</div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" id="image1"> <a href="#"> <img src="http://dev.syscraft-sqemailmarketingtool.tk/uploads/gallery_images/4b07241ea1baf51286a0dfd2c3f67b41.jpg" style="width: auto; max-width:100%; margin: 20px auto;display: block;"> </a> </div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" contenteditable="true" id="text2" placeholder="Add Some Text" style="font-family: Arial, sans-serif;text-align: center;margin-top: 10px;margin-bottom: 10px;">Or tell the cashier the rewards code below when you pay</div></div><div class="box_main" style="padding:0 20px;"> <div class="editable" id="button847" style="text-align: center;"> <a href="#" style="font-family:Arial, sans-serif; margin:0px auto;background-color: #007bff;padding-right:20px; padding-left:20px; padding-top: 10px;padding-bottom: 10px; text-align: center; margin: 10px auto; color: #fff;font-weight: 600;border-radius: 0px; display:inline-block; border:none; font-size: 14px; width:auto; text-decoration:none;">Button</a> </div></div><div class="box_main ignore-drag" style="padding:0 20px;"> <div class="editable" id="socialicons1" style="background-color:transparent; display:block; text-align: center; margin-bottom:10px;"> <a href="#" id="Facebook" style="margin-right:10px;  background-color: #7d8b92;  display: inline-block; padding:10px;" title="Facebook"> <img alt="Facebook" src="' +
            this.BASE_URL +
            'uploads/icon_images/facebook.png" style="height: 30px; width:30px;"> </a> <a href="#" id="Twitter" style="margin-right:10px;  background-color: #7d8b92;  display: inline-block; padding:10px;" title="Twitter"> <img alt="Twitter" src="' +
            this.BASE_URL +
            'uploads/icon_images/twitter.png" style="height: 30px; width:30px;"> </a> <a href="#" id="Linkedin" style="margin-right:10px;  background-color: #7d8b92;  display: inline-block; padding:10px;" title="Linkedin"> <img alt="Linkedin" src="' +
            this.BASE_URL +
            'uploads/icon_images/linkedin.png" style="height: 30px; width:30px;"> </a> </div></div><div class="box_main ignore-drag" style="padding:0 20px;"> <div class="editable footer_mail" contenteditable="true" placeholder="Add Some Text" style="font-family: Arial, sans-serif;text-align: center;padding-top: 10px;padding-bottom: 10px; margin-bottom: 20px; font-size: 12px;" id="text21">Footer Content Here</div></div>'
        }
      ];
    },
    // Steps decrese
    DesignStepsDecrement() {
      var _self = this;
      if (this.DesignStep == 1) {
        return false;
      } else if (this.DesignStep == 2) {
        this.ShowAlert2(() => {
          var DraftBtn = $(".button_box").find(".dr_btn");
          var DiscardBtn = $(".button_box").find(".dis_btn");
          var CancelBtn = $(".button_box").find(".can_btn");
          $(DraftBtn).bind("click", function() {
            _self.SaveDraft();
            Swal.close();
            _self.DesignStep = _self.DesignStep - 1;
            _self.ToggleObjective();
          });
          $(DiscardBtn).bind("click", function() {
            _self.DesignStep = _self.DesignStep - 1;
            _self.ToggleObjective();
            Swal.close();
          });
          $(CancelBtn).bind("click", function() {
            Swal.close();
          });
        });
      } else {
        this.DesignStep = this.DesignStep - 1;
      }
    },
    // Save as draft alert
    ShowAlert2(callback) {
      Swal({
        title: "Are you sure?",
        text: "You will not be able to recover this!",
        type: "warning",
        showConfirmButton: false,
        showCancelButton: false,
        confirmButtonColor: "#007bff",
        cancelButtonColor: "#DD6B55",
        confirmButtonText: "Save as Draft",
        cancelButtonText: "Delete",
        html:
          '<div class="button_box"><button class="dr_btn btn btn-primary">Save as draft</button><button class="dis_btn btn btn-danger">Discard</button><button class="can_btn btn btn-warning">Cancel</button></div>'
      });
      setTimeout(() => {
        callback();
      }, 0);
    },

    // Save as draft  and create new or old update campaign
    SaveDraft() {
      // var _self=this;
      eventbus.$emit("editToggle");
      let html_string = $("<div>")
        .append(
          $(".email_template")
            .clone()
            .removeClass("email_template")
            .children("*")
            .removeAttr("contenteditable")
            .wrap(".box_main")
        )
        .html();

      if (localStorage.getItem("Temp_id") == "null") {
        let data = {
          user_id: localStorage.getItem("user_id"),
          cmp_name: localStorage.getItem("subject"),
          cmp_temp_html: html_string,
          cmp_status: "Draft"
        };
        SaveAsDraft(data)
          .then(res => {
            if (res.status == 200) {
              Swal({
                title: "Draft saved successfully!",
                // text: "",
                type: "success"
              });
            } else {
              Swal({
                title: "Can't save Draft!",
                text: res.message,
                type: "error"
              });
            }
          })
          .catch(err => {
            Swal({
              title: "Can't save Draft!",
              text: err.message,
              type: "error"
            });
          });
      } else {
        let data = {
          user_id: localStorage.getItem("user_id"),
          cmp_name: localStorage.getItem("subject"),
          cmp_temp_html: html_string,
          cmp_status: "Draft",
          campaign_id: localStorage.getItem("Temp_id")
        };
        SaveAsDraft(data)
          .then(res => {
            if (res.status == 200) {
              Swal({
                title: "Draft saved successfully!",
                // text: "",
                type: "success"
              });
            } else {
              Swal({
                title: "Can't save Draft!",
                text: res.message,
                type: "error"
              });
            }
          })
          .catch(err => {
            Swal({
              title: "Can't save Draft!",
              text: err.message,
              type: "error"
            });
          });
      }
    },
    ReviewSend() {
      eventbus.$emit("editToggle");
      this.Subject = localStorage.getItem("subject");

      let Emailer = $("<div>")
        .append(
          $(".email_template")
            .clone()
            .removeClass("email_template")
            .children("*")
            .removeAttr("contenteditable")
            .wrap(".box_main")
        )
        .html();
      localStorage.setItem("selected_mailer", Emailer);
      let NewEle = document.createElement("div");
      NewEle.innerHTML = Emailer;
      var bg_color = $(".email_template").css("background-color");

      this.Emailer = $(NewEle)
        .css({ width: "600px", background: bg_color, margin: "0px auto" })
        .wrap("<p/>")
        .parent()
        .html();
      this.DesignStepsIncrement();
      this.SavePreviewEmailer(bg_color);
    },
    SavePreviewEmailer(color1) {
      var EmailerHtml = $("<div>")
        .append(
          $(".email_template")
            .clone()
            .removeClass("email_template")
            .find(".editable")
            .removeAttr("contenteditable")
        )
        .html();
      this.FinalEmailer = EmailerHtml;

      $(function() {
        $(".emailer_preview")
          .find("a")
          .click(function() {
            return false;
          });
        $("#mobile_temp").css("background", color1);
      });
    },

    SelectedEmailOption(val) {
      this.SelectedOptionValue = val;
    },
    // Send mail to particual id
    SendMail() {
      $(".preloader").css("display", "block");

      let data = {
        subject: this.Subject,
        send_to: this.MailTo,
        email_body: this.Emailer,
        campaign_id:
          localStorage.getItem("Temp_id") == "null"
            ? ""
            : localStorage.getItem("Temp_id"),
        user_id: localStorage.getItem("user_id")
      };
      this.MailTo = "";

      SendEmail(data)
        .then(res => {
          $(".preloader").css("display", "none");
          if (res.status == 200) {
            Swal({
              title: "Mail sent successfully!",
              // text: "",
              type: "success"
            });
          } else {
            Swal({
              title: "Sending Failed!",
              text: res.message,
              type: "error"
            });
          }
        })
        .catch(err => {
          $(".preloader").css("display", "none");
          Swal({
            title: "Sending Failed!",
            text: err.message,
            type: "error"
          });
        });
    },
    // Send mail to self
    SendToSelf(e) {
      $(".preloader").css("display", "block");
      let EmailID = $(e.target).html();

      let data = {
        subject: this.Subject,
        send_to: EmailID,
        email_body: this.Emailer,
        campaign_id: localStorage.getItem("Temp_id") == "null" ? "" : localStorage.getItem("Temp_id"),
        user_id: localStorage.getItem("user_id")
      };
      this.MailTo = "";
      SendEmail(data)
        .then(res => {
          $(".preloader").css("display", "none");
          if (res.status == 200) {
            Swal({
              title: "Mail sent successfully!",
              // text: "",
              type: "success"
            });
          } else {
            Swal({
              title: "Sending Failed!",
              text: res.message,
              type: "error"
            });
          }
        })
        .catch(err => {
          $(".preloader").css("display", "none");
          Swal({
            title: "Sending Failed!",
            text: err.message,
            type: "error"
          });
        });
    },



    // methods
  },
  created() {
    setTimeout(() => {
      this.ToggleObjective();
    }, 100);

    this.CreateTemplatesArray();

    this.SelectedEmailOption(2);
  }
};
</script>
