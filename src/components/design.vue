<template>
   <div class="design_page">
      <!-- Preview popup -->
      <div class="image_preview" v-bind:class="{'ShowGallery':ShowGallery==true}">
         <h3>Select Image <span class="cross_icon" v-on:click="HideImagePopup()"><i class="fa fa-times"></i></span></h3>
         <div class="tab_box">
            <ul role="tablist" class="nav nav-tabs justify-content-start">
               <li class="nav-item" style="cursor:pointer">
                  <a class="nav-link" v-bind:class="{'active':Imagetabid==3}" v-on:click="ImageTab(3)">
                  <b>Upload Image</b>
                  </a>
               </li>
               <li class="nav-item" style="cursor:pointer">
                  <a class="nav-link" v-bind:class="{'active':Imagetabid==4}" v-on:click="ImageTab(4)">
                  <b>Choose From Gallery</b>
                  </a>
               </li>
            </ul>
            <div class="tab-content">
               <div role="tabpanel" class="tab-pane active" v-if="Imagetabid==3">
                  <div class="col-md-12 mt-2">
                     <div class="form-group">
                        <label>Choose Image</label>
                        <div class="input-group">
                           <div class="input-group-prepend">
                              <span class="input-group-text">Upload</span>
                           </div>
                           <div class="custom-file">
                              <input type="file" class="custom-file-input" id="inputGroupFile01" accept="image/*" @change="ImageUpload($event
                                 )">
                              <label class="custom-file-label" for="inputGroupFile01"><span v-if="FileName==''">Choose file</span>
                              <span v-if="FileName!=''">{{FileName}}</span>
                              </label>
                           </div>
                        </div>
                     </div>
                     <div class="form-group">
                        <div class="form-group">
                           <button class="btn btn-info waves-effect waves-light" type="button" v-on:click="UploadImage()" :disabled="!FileName">
                           <span class="btn-label"><i class="fa fa-upload"></i></span>Upload Image
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
               <div role="tabpanel" class="tab-pane active" v-if="Imagetabid==4">
                  <div class="image_gallery">
                     <ul>
                        <li v-bind:key="image" v-for="image in GalleryImages.data" v-on:click="SelectedImage($event)"><img :src="image"></li>
                     </ul>
                  </div>
                  <div class="form-group text-left">
                     <button class="btn btn-info waves-effect waves-light ml-4" type="button" :disabled="SelectedImagePath==null" @click="SetImageFromGallery()"> <span class="btn-label"><i class="fa fa-check" ></i></span>Set Image</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- Preview popup -->
      <!-- Dont remove id from template html -->
      <div class="overlay" v-if="ShowOverlay"></div>
      <div class="row">
         <div class="col-8 set_column">
            <div class="email_main" style="padding: 20px 0px; margin-bottom: 40px;">
               <div class="subject_box input-group">
                  <div class="input-group-prepend">
                     Subject:
                  </div>
                  <input type="text" class="form-control" v-model="MailSubject" @input="UpdateMailSubject">
               </div>
                <div class="email_template dragndrop" style="width: 600px; margin: 0px auto;" v-drag-and-drop:options="options">
                </div>
            </div>
         </div>
         <div class="col-md-4">
            <div class="card">
               <div class="card-body tabs_box">
                  <h3 class="card-title" v-if="DesignHeading">{{DesignHeading}}</h3>
                  <h6 class="card-subtitle">Design your email campaign</h6>
                  <hr>
                  <ul role="tablist" class="nav nav-tabs justify-content-start" v-if="!DesignMode">
                     <li class="nav-item" style="cursor:pointer">
                        <a class="nav-link" v-bind:class="{'active':tabid==1}" v-on:click="TabChange(1)">
                        <b>Block</b>
                        </a>
                     </li>
                     <li class="nav-item" style="cursor:pointer">
                        <a class="nav-link" v-bind:class="{'active':tabid==2}" v-on:click="TabChange(2)">
                        <b>Styles</b>
                        </a>
                     </li>
                  </ul>
                  <div class="tab-content" v-if="!DesignMode">
                     <div role="tabpanel" class="tab-pane active" v-if="tabid==1">
                        <div class="main_tab blocks mt-2">
                           <ul class="append_box mt-2">
                              <li v-on:click="AddElement('text')"><span><i class="mdi mdi-format-text"></i></span>
                                 <br> Text
                              </li>
                              <li v-on:click="AddElement('heading')"><span><i class="mdi mdi-format-font"></i></span>
                                 <br> Heading
                              </li>
                              <li v-on:click="AddElement('divider')"><span><i class="mdi mdi-window-minimize"></i></span>
                                 <br> Devider
                              </li>
                              <li v-on:click="AddElement('button')"><span><i class="mdi mdi-link"></i></span>
                                 <br> Button
                              </li>
                              <li v-on:click="AddElement('image')"><span><i class="mdi mdi-image"></i></span>
                                 <br> Image
                              </li>
                              <li id="iconTrigger" v-on:click="AddElement('icon')"><span><i class="mdi mdi-share-variant"></i></span>
                                 <br> Social Icons
                              </li>
                           </ul>
                           <div class="select_icon" v-bind:class="{'showIcons':showIcons==true}">
                              <ul>
                                 <li v-bind:key="icon.name" v-for="icon in SocialArray" @click="AddSocialIcon(icon.name,icon.path)"><img :src="icon.path"></li>
                              </ul>
                           </div>
                        </div>
                     </div>
                     <div role="tabpanel" class="tab-pane active" v-if="tabid==2">
                        <div class="main_tab blocks mt-2">
                           <label>TEMPLATE BACKGROUND</label>
                           <Sketch v-model="bg_color" @input="SetTemplateBackground"></Sketch>
                        </div>
                     </div>
                  </div>
                  <!-- design mode on -->
                  <div class="DesignMode" v-if="DesignMode">
                     <!-- Text design   -->
                     <div class="design_mode_inner" v-if="DesignType=='text' || DesignType=='heading'">
                        <!-- <h3>Text Style</h3>     -->
                        <div class="form-group">
                           <label>Font Style</label>
                           <ul class="font_style">
                              <li><a href="javascript:void(0)" v-on:click="BoldToggle()"><i class="fa fa-bold"></i></a></li>
                              <li><a href="javascript:void(0)" v-on:click="ItalicToggle()"><i class="fa fa-italic"></i></a></li>
                           </ul>
                        </div>
                        <div class="form-group">
                           <label>Text Alignment</label>
                           <ul class="align_buttons">
                              <li><a href="javascript:void(0);" v-on:click="AlignText('left')" title="Left"><i class="mdi mdi-format-align-left"></i></a></li>
                              <li><a href="javascript:void(0);" v-on:click="AlignText('right')" title="Right"><i class="mdi mdi-format-align-right"></i></a></li>
                              <li><a href="javascript:void(0);" v-on:click="AlignText('center')" title="Center"><i class="mdi mdi-format-align-center"></i></a></li>
                              <li><a href="javascript:void(0);" v-on:click="AlignText('justify')" title="Justify"><i class="mdi mdi-format-align-justify"></i></a></li>
                           </ul>
                        </div>
                        <div class="form-group">
                           <label>Font</label>
                           <select class="form-control" v-model="fontfamily" @change="SetTextFont($event)">
                              <option value="" :selected="true">Font</option>
                              <!-- <option value="sq-market">SQ Market</option> -->
                              <option value="arial">Arial</option>
                              <option value="caveat-brush">Caveat Brush</option>
                              <option value="comic-sans-ms">Comic Sans MS</option>
                              <option value="courier-new">Courier New</option>
                              <option value="dancing-script">Dancing Script</option>
                              <option value="georgia">Georgia</option>
                              <option value="helvetica">Helvetica</option>
                              <option value="lora">Lora</option>
                              <option value="lucida">Lucida</option>
                              <option value="palatino">Palatino</option>
                              <option value="tahoma">Tahoma</option>
                              <option value="times-new-roman">Times New Roman</option>
                              <option value="verdana">Verdana</option>
                           </select>
                        </div>
                        <div class="form-group">
                           <label>Size</label>
                           <select class="form-control" v-model="fontsize" @change="SetTextFontSize($event)">
                              <option value="" :selected="true">Size</option>
                              <option value="12">12px</option>
                              <option value="14">14px</option>
                              <option value="16">16px</option>
                              <option value="18">18px</option>
                              <option value="24">24px</option>
                              <option value="28">28px</option>
                              <option value="36">36px</option>
                           </select>
                        </div>
                        <div class="form-group">
                           <label>Color</label>
                           <Sketch v-model="textcolor" @input="SetTextFontColor"></Sketch>
                        </div>
                        <div class="form-group">
                           <label>Top Spacing</label>
                           <select class="form-control" v-model="marginTop" @change="SetTopSpacing">
                              <option value="" :selected="true">Select Top Spacing</option>
                              <option value="0">0px</option>
                              <option value="5">5px</option>
                              <option value="10">10px</option>
                              <option value="15">15px</option>
                              <option value="20">20px</option>
                              <option value="25">25px</option>
                              <option value="30">30px</option>
                              <option value="40">40px</option>
                              <option value="50">50px</option>
                           </select>
                        </div>
                        <div class="form-group">
                           <label>Bottom Spacing</label>
                           <select class="form-control" v-model="marginBottom" @change="SetBottomSpacing($event)">
                              <option value="" :selected="true">Select Bottom Spacing</option>
                              <option value="0">0px</option>
                              <option value="5">5px</option>
                              <option value="10">10px</option>
                              <option value="15">15px</option>
                              <option value="20">20px</option>
                              <option value="25">25px</option>
                              <option value="30">30px</option>
                              <option value="40">40px</option>
                              <option value="50">50px</option>
                           </select>
                        </div>
                     </div>
                     <!-- Text design   -->
                     <!-- button design -->
                     <div class="design_mode_inner" v-if="DesignType=='button'">
                        <div class="form-group">
                           <label>Label</label>
                           <input type="text" class="form-control" v-model="ButtonLabel" @input="ChangeLabel($event)">
                        </div>
                        <div class="form-group">
                           <label>Link</label>
                           <input type="url" class="form-control" v-model="ButtonLink" @blur="ChangeLink($event)">
                        </div>
                        <div class="form-group">
                           <label>Background Color</label>
                           <Sketch @input="SetButtonColor" v-model="ButtonColor"></Sketch>
                        </div>
                        <div class="form-group">
                           <label>Label Color</label>
                           <Sketch @input="SetButtonTextColor" v-model="ButtonTextColor"></Sketch>
                        </div>
                        <div class="form-group">
                           <label>Shape</label>
                           <select v-model="ButtonShape" @change="ButtonShapeChange($event)" class="custom-select">
                              <option value="10">Rounded</option>
                              <option value="0">Rectangle</option>
                           </select>
                        </div>
                        <div class="form-group">
                           <label>Width</label>
                           <select v-model="ButtonWidth" @change="ButtonWidthChange($event)" class="custom-select">
                              <option value="auto">Regular</option>
                              <option value="100">Full</option>
                           </select>
                        </div>
                        <div class="form-group">
                           <label>Size</label>
                           <select v-model="ButtonSize" @change="ButtonSizeChange($event)" class="custom-select">
                              <option value="14">Small</option>
                              <option value="18">Medium</option>
                              <option value="22">Large</option>
                           </select>
                        </div>
                        <div class="form-group">
                           <label>Font</label>
                           <select class="form-control custom-select" v-model="fontfamily" @change="SetButtonFont($event)" >
                              <option value="" :selected="true">Font</option>
                              <option value="arial">Arial</option>
                              <option value="caveat-brush">Caveat Brush</option>
                              <option value="comic-sans-ms">Comic Sans MS</option>
                              <option value="courier-new">Courier New</option>
                              <option value="dancing-script">Dancing Script</option>
                              <option value="georgia">Georgia</option>
                              <option value="helvetica">Helvetica</option>
                              <option value="lora">Lora</option>
                              <option value="lucida">Lucida</option>
                              <option value="palatino">Palatino</option>
                              <option value="tahoma">Tahoma</option>
                              <option value="times-new-roman">Times New Roman</option>
                              <option value="verdana">Verdana</option>
                           </select>
                        </div>
                        <div class="form-group">
                           <label>Top Spacing</label>
                           <select class="form-control" v-model="marginTop" @change="SetTopSpacing($event)">
                              <option value="" :selected="true">Select Top Spacing</option>
                              <option value="0">0px</option>
                              <option value="5">5px</option>
                              <option value="10">10px</option>
                              <option value="15">15px</option>
                              <option value="20">20px</option>
                              <option value="25">25px</option>
                              <option value="30">30px</option>
                              <option value="40">40px</option>
                              <option value="50">50px</option>
                           </select>
                        </div>
                        <div class="form-group">
                           <label>Bottom Spacing</label>
                           <select class="form-control" v-model="marginBottom" @change="SetBottomSpacing($event)">
                              <option value="" :selected="true">Select Bottom Spacing</option>
                              <option value="0">0px</option>
                              <option value="5">5px</option>
                              <option value="10">10px</option>
                              <option value="15">15px</option>
                              <option value="20">20px</option>
                              <option value="25">25px</option>
                              <option value="30">30px</option>
                              <option value="40">40px</option>
                              <option value="50">50px</option>
                           </select>
                        </div>
                     </div>
                     <!-- button design -->
                     <!-- divider -->
                     <div class="design_mode_inner" v-if="DesignType=='seprator'">
                        <div class="form-group">
                           <label>Color</label>
                           <Sketch @input="SetLineColor" v-model="LineColor"></Sketch>
                        </div>
                        <div class="form-group">
                           <label>STROKE STYLE</label>
                           <select class="custom-select" @change="SetStrokeStyle" v-model="StrokeStyle">
                              <option value="solid">Solid</option>
                              <option value="dashed">Dashed</option>
                              <option value="dotted">Dotted</option>
                           </select>
                        </div>
                        <div class="form-group">
                           <label>STROKE WIDTH</label>
                           <select class="custom-select" @change="SetStrokeWidth" v-model="StrokeWidth">
                              <option value="1">Light</option>
                              <option value="4">Medium</option>
                              <option value="8">Heavy</option>
                           </select>
                        </div>
                        <div class="form-group">
                           <label>Size</label>
                           <select class="custom-select" @change="SetStrokeSize" v-model="StrokeSize">
                              <option value="50">Small</option>
                              <option value="75">Medium</option>
                              <option value="100">Large</option>
                           </select>
                        </div>
                        <div class="form-group">
                           <label>ALIGNMENT</label>
                           <select class="custom-select" @change="SetStrokeAlignment" v-model="StrokeAlignment">
                              <option value="left">Left</option>
                              <option value="right">Right</option>
                              <option value="center">Center</option>
                           </select>
                        </div>
                        <div class="form-group">
                           <label>Top Spacing</label>
                           <select class="form-control" v-model="marginTop" @change="SetTopSpacing">
                              <option value="" :selected="true">Select Top Spacing</option>
                              <option value="0">0px</option>
                              <option value="5">5px</option>
                              <option value="10">10px</option>
                              <option value="15">15px</option>
                              <option value="20">20px</option>
                              <option value="25">25px</option>
                              <option value="30">30px</option>
                              <option value="40">40px</option>
                              <option value="50">50px</option>
                           </select>
                        </div>
                        <div class="form-group">
                           <label>Bottom Spacing</label>
                           <select class="form-control" v-model="marginBottom" @change="SetBottomSpacing">
                              <option value="" :selected="true">Select Bottom Spacing</option>
                              <option value="0">0px</option>
                              <option value="5">5px</option>
                              <option value="10">10px</option>
                              <option value="15">15px</option>
                              <option value="20">20px</option>
                              <option value="25">25px</option>
                              <option value="30">30px</option>
                              <option value="40">40px</option>
                              <option value="50">50px</option>
                           </select>
                        </div>
                     </div>
                     <!-- divider -->
                     <!--social_icons-->
                     <div class="design_mode_inner" v-if="DesignType=='socialicons'">
                        <div class="form-group">
                           <label>Color</label>
                           <Sketch v-model="IconColor" @input="SetIconColor"></Sketch>
                        </div>
                        <div class="form-group">
                           <label>Icon Link</label>
                           <input type="url" v-model="IconUrl" class="form-control" @blur="SetIconUrl">
                        </div>
                     </div>
                     <!--social_icons-->
                     <!-- Image Design -->
                     <div class="design_mode_inner" v-if="DesignType=='image'">
                        <div class="image_show">
                           <img :src="ImageLink" alt="image">
                        </div>
                        <div class="form-group">
                           <button class="btn btn-info btn-block btn_done  mb-2" v-on:click="UpdateImage">Change Image</button>
                        </div>
                        <div class="form-group">
                           <label>Link</label>
                           <input type="url" v-model="ImageUrl" class="form-control" @blur="ChangeImageLink">
                        </div>
                     </div>
                     <!-- Image Design -->
                      <!-- Header -->
                        <div class="design_mode_inner" v-if="DesignType=='header'">
              <!-- Design type   -->
              <ul class="header_tabs">
                <li @click="ChangeHeaderStyle('color')" v-bind:class="{'active':HeaderType=='color'}">Color</li>
                <li @click="ChangeHeaderStyle('image')" v-bind:class="{'active':HeaderType=='image'}">Image</li>
              </ul>
              <!-- Design type   -->
              <!-- design type image -->
              <div v-if="HeaderType=='image'">
                <h3>Header Style</h3>
                <p><small>Select an image to use for your header or use a background color.</small></p>
                <div class="image_show">
                  <img :src="ImageLink" alt="image">
                </div>
                  <div class="form-group">
                    <button class="btn btn-info btn-block btn_done  mb-2" v-on:click="UpdateHeader()">Change Header Image</button>
                  </div>
                </div>
                <!-- design type image -->
                <!-- design type color -->
                <div v-if="HeaderType=='color'" class="Picker_color text-center">

                  <Sketch v-model="HeaderColor" @input="SetHeaderColor"></Sketch>
                </div>
                <!-- design type color -->
                <h3>Logo and Business Name</h3>
                <div class="form-group">
                  <select class="input custom-select" v-model="LogoOptions" @change="ChangeLogoOptions($event)">
                    <option value="BOTH">Show Business Name and Logo</option>
                    <option value="MERCHANT_NAME">Show Business Name</option>
                    <option value="LOGO">Show Logo</option>
                    <option value="NONE">None</option>
                  </select>
                </div>
                <div class="logo_show" v-if="LogoOptions=='BOTH' || LogoOptions=='LOGO'">
                  <img :src="LogoLink" alt="Logo">
                </div>
                  <div class="form-group" v-if="LogoOptions=='BOTH' || LogoOptions=='LOGO'">
                    <button class="btn btn-info btn-block btn_done  mb-2" v-on:click="UpdateLogo()">Change Business Logo</button>
                  </div>
                  <div class="form-group" v-if="LogoOptions=='BOTH' || LogoOptions=='MERCHANT_NAME'">
                    <label>Business Name</label>
                    <input type="text" class="form-control" v-model="BusinessName" @input="ChangeBusinessName($event)">
                  </div>
                  <div class="form-group" v-if="LogoOptions=='BOTH' || LogoOptions=='MERCHANT_NAME'">
                    <label>Business Name Color</label>
                    <Sketch v-model="BusinessNameColor" @input="SetBusinessNameColor"></Sketch>
                  </div>
                </div>
                      <!-- Header -->


                  </div>
                  <button class="btn btn-info btn-block btn_done  mb-2" type="button" @click="HideDesignMode" v-if="DesignMode"><i class="fa fa-check"></i> Done</button>
               </div>
            </div>
            <!-- design mode on -->
         </div>
      </div>
   </div>
</template>
<script>

import Vue from 'vue';
import eventbus from './eventbus'
import $ from "jquery";
import { Sketch } from "vue-color";
import { GetGalleryImages } from "../api/campaign";
import { UploadImage } from "../api/upload";
const Swal = require("sweetalert2");
import VueDraggable from 'vue-draggable'
Vue.use(VueDraggable)
export default {
  name: "Design",
  components: {
    Sketch,

  },
  data() {
    return {
      fontfamily:'arial',
      MailSubject: "",
      ShowOverlay: "",
      TempId: "",
      DesignElementID: "",
      DesignType: "",
      DesignMode: false,
      DesignHeading: "Design Campaign",
      DelIconString:
        '<span class="del_icon bg-danger"><i class="mdi mdi-delete"></i></span> <span class="move_icon"><i class="mdi mdi-chevron-up el_up"></i> <i class="mdi mdi-chevron-down el_down"></i></span>',
      tabid: 1,
      SocialArray: [],
      showIcons: false,
      BASE_URL: "http://dev.syscraft-sqemailmarketingtool.tk/",
      bg_color: "#efefef",
      Fonts: {
        arial: "Arial, sans-serif",
        "caveat-brush": "Caveat Brush, cursive",
        "comic-sans-ms":
          "Comic Sans MS, Comic Sans, Chalkboard, ChalkboardSE-Regular, sans-serif",
        "courier-new": "Courier New, monospace",
        "dancing-script": "Dancing Script, cursive",
        georgia: "Georgia, serif",
        helvetica: "Helvetica, sans-serif",
        lora: '"Lora", serif',
        lucida: "Lucida, Lucida Sans Unicode, Lucida Grande, sans-serif",
        tahoma: "Tahoma, Geneva, sans-serif",
        palatino: "Palatino, Palatino Linotype, serif",
        "times-new-roman": "Times New Roman, sans-serif",
        verdana: "Verdana, Geneva, sans-serif"
      },
      textcolor: "#000",
      ButtonLabel: "Button",
      ButtonLink: "",
      ButtonColor: "#007bff",
      ButtonTextColor: "#fff",
      marginBottom: 10,
      marginTop: 10,
      ButtonWidth: "auto",
      ButtonSize: "18",
      LineColor: "#7d8b92",
      StrokeStyle: "solid",
      StrokeWidth: "1",
      StrokeSize: "100",
      StrokeAlignment: "center",
      IconColor: "#fff",
      IconUrl: "",
      ShowGallery: false,
      FileName: "",
      GalleryImages: [],
      SelectedFile: {},
      SelectedImagePath: {},
      Imagetabid: 3,
      ImageUpdate:false,
      ImageUrl:'',
      HeaderType:'image',
      LogoOptions:'BOTH',
      BusinessNameColor:'#fff',
      HeaderColor:'#007bff',
      BusinessName:'Business Name',
      UpdateHeaderImage:false,
      BusinessLogo:false,
      options:{
        dropzoneSelector: '.email_template',
        draggableSelector: '.box_main',
        excludeOlderBrowsers: true,
        multipleDropzonesItemsDraggingEnabled: true,
        showDropzoneAreas: true,

        filter:'.disabled'
      },



    };
  },
  created() {

    eventbus.$on('editToggle', this.EditToggle)
    this.eventBinding();
    this.CreateSocialArray();

  },


  methods: {
    // event binding on load
    eventBinding() {
      var _self = this;
      // Function is to add some custom events on newly added or clicked Elements
      $(function() {
        var SelectedEmailer = localStorage.getItem("selected_mailer");
        _self.MailSubject = localStorage.getItem("subject");
        _self.TempId = localStorage.getItem("Temp_id");
        $(".email_template").append(SelectedEmailer);
        $(".email_template")
          .find("div[id^='heading']")
          .prop("contenteditable", true);
        $(".email_template")
          .find("div[id^='text']")
          .prop("contenteditable", true);

        var elem = document.querySelectorAll(".editable");

        for (let i = 0; i < elem.length; i++) {
          //   _self.render.listen(elem[i], "click", e => {
          elem[i].addEventListener("click", e => {
            // if element type is social icon
            if (elem[i].id == "socialicons1") {
              e.stopPropagation();
              _self.EditToggle();
              var ClosestEle = $(e.target).closest(".editable");
              ClosestEle.addClass("Edit_box");
              _self.DesignModeOn(e);
              _self.GetStyle(e);
              _self.RemoveSocialIcons(e);
            }
            // For other element type
            else {
              e.stopPropagation();
              _self.EditToggle();
              ClosestEle = $(e.target).closest(".editable");
              ClosestEle.addClass("Edit_box");
              ClosestEle.after(_self.DelIconString);
              _self.DesignModeOn(e);
              _self.GetStyle(e);
              var delNode = document.querySelector(".del_icon");

              delNode.addEventListener("click", () => {
                _self.DeleteNode();
              });
              _self.MoveBinding();
            }
          });
        }
        // disable paste content
        _self.PasteAsText();
        _self.DisableRedirection();
        $("#socialicons1").click(function(e) {
          if (e.target == this) _self.DesignModeOff();
        });
      });

    },
    // Remove edit from all Element
    EditToggle() {

      let elements = document.querySelectorAll(".Edit_box");
      let ele = document.querySelectorAll(".del_icon");
      let MoveIcon = document.querySelectorAll(".move_icon");
      Array.prototype.forEach.call(ele, function(node) {
        node.parentNode.removeChild(node);
      });
      Array.prototype.forEach.call(MoveIcon, function(node) {
        node.parentNode.removeChild(node);
      });
      if (elements.length > 0) {
        for (let i = 0; i < elements.length; i++) {
          elements[i].classList.remove("Edit_box");
        }
      }
      $(".cross_icon2").remove();
    },
    PasteAsText() {
      let elements = document.querySelectorAll(".editable");
      for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("paste", e => {
          // cancel paste
          e.preventDefault();

          // get text representation of clipboard
          var text = e.clipboardData.getData("text/plain");

          // insert text manually
          document.execCommand("insertHTML", false, text);
        });
      }
    },
    // This code is use to check element type after clicking on element of
    // When we click button this method will detect the type button by id.

    DesignModeOn(e) {
      this.DesignElementID = e.target.id;

      if (this.DesignElementID == "" || this.DesignElementID == null) {
        this.DesignElementID = $(e.target)
          .closest(".editable")
          .attr("id");
      } else {
        this.DesignElementID = e.target.id;
      }

      this.DesignType = this.DesignElementID.replace(/[0-9]/g, "");
      switch (this.DesignType) {
        case "text": {
          this.DesignHeading = "Edit Text";
          this.DesignMode = true;
          break;
        }
        case "heading": {
          this.DesignHeading = "Edit Heading";
          this.DesignMode = true;
          break;
        }
        case "button": {
          this.DesignHeading = "Edit Button";
          this.DesignMode = true;
          break;
        }
        case "seprator": {
          this.DesignHeading = "Edit Seprator";
          this.DesignMode = true;
          break;
        }
        case "image": {
          this.DesignHeading = "Edit Image";
          this.DesignMode = true;
          break;
        }
        case "socialicons": {
          let element = e.target.id;
          if (element == "" || element == null) {
            element = $(e.target)
              .closest("a")
              .attr("id");
          }
          this.DesignHeading = "Customize Icon";
          this.DesignMode = true;
          this.DesignElementID = element;

          break;
        }
        case "header": {
          this.DesignHeading = "Edit Header";
          this.DesignMode = true;
          break;
        }

        default: {
          break;
        }
      }
    },
    // --------------------------------------------------------------
    // ----------------------------------------------------------------
    // -------------------------------------------------------------------

    // This method have switch case which  is use to get element style when you click on element.
    GetStyle(e) {
      let ElementID = e.target.id;

      if (ElementID == "" || ElementID == null) {
        ElementID = $(e.target)
          .closest(".editable")
          .attr("id");
      } else {
        ElementID = e.target.id;
      }
      let NewId;
      NewId = ElementID.replace(/[0-9]/g, "");
      switch (NewId) {
        case "text": {
          var style = getComputedStyle(e.target);
          this.textcolor = style.color;
          this.fontsize = style.fontSize.replace(/[A-Z a-z]/g, "");
          this.marginTop = style.marginTop.replace(/[A-Z a-z]/g, "");
          this.marginBottom = style.marginBottom.replace(/[A-Z a-z]/g, "");
          let fontfamily = style.fontFamily.replace(/"/g, "");

          for (let key in this.Fonts) {
            if (this.Fonts[key] == fontfamily) {
              this.fontfamily = key;
              break;
            }
          }
          break;
        }
        case "heading": {
          style = getComputedStyle(e.target);
          this.textcolor = style.color;
          this.fontsize = style.fontSize.replace(/[A-Z a-z]/g, "");
          this.marginTop = style.marginTop.replace(/[A-Z a-z]/g, "");
          this.marginBottom = style.marginBottom.replace(/[A-Z a-z]/g, "");
          let fontfamily = style.fontFamily.replace(/"/g, "");

          for (let key in this.Fonts) {
            if (this.Fonts[key] == fontfamily) {
              this.fontfamily = key;
              break;
            }
          }
          break;
        }
        case "socialicons": {
          this.RemoveEditIcons();

          let element = e.target.id;
          if (element == "" || element == null) {
            element = $(e.target)
              .closest("a")
              .attr("id");
          }
          this.IconUrl = $("#" + element).attr("href");
          this.IconColor = $("#" + element).css("color");

          break;
        }

        case "button": {
          var element = document.querySelector("#" + this.DesignElementID);
          var ButtonEle = $(element).find("a");
          this.ButtonLabel = $(ButtonEle).html();
          this.ButtonLink = $(ButtonEle).attr("href");
          this.ButtonColor = $(ButtonEle).css("background-color");
          this.ButtonTextColor = $(ButtonEle).css("color");
          this.ButtonShape = $(ButtonEle)
            .css("border-radius")
            .replace("px", "");
          this.ButtonSize = $(ButtonEle)
            .css("font-size")
            .replace("px", "");
          this.ButtonWidth = $(ButtonEle)[0].style.width.replace("%", "");
          let fontfamily = $(ButtonEle)
            .css("font-family")
            .replace(/"/g, "");

          for (let key in this.Fonts) {
            if (this.Fonts[key] == fontfamily) {
              this.fontfamily = key;
              break;
            }
          }

          break;
        }
        case "image": {
          element = document.querySelector("#" + this.DesignElementID);
          var ImgEle = $(element).find("img");
          var ImgLink = $(element).find("a");
          this.ImageLink = $(ImgEle).attr("src");
          this.ImageUrl = $(ImgLink).attr("href");
          break;
        }
        case "header": {
          if (this.HeaderType == "image") {
            var bg = $("#" + this.DesignElementID).css("background-image");
            bg = bg
              .replace("url(", "")
              .replace(")", "")
              .replace(/"/gi, "");
            this.ImageLink = bg;
          } else if (this.HeaderType == "color") {
            bg = $("#" + this.DesignElementID).css("background-color");
            this.HeaderColor = bg;
          }

          var LogoImg = $("#" + this.DesignElementID)
            .find(".logo")
            .css("background-image");
          this.LogoLink = LogoImg.replace("url(", "")
            .replace(")", "")
            .replace(/"/gi, "");
          var BusinessName = $("#" + this.DesignElementID)
            .find("p")
            .html();
          this.BusinessName = BusinessName;
          break;
        }

        default: {
          break;
        }
      }
    },

    // ------------------------------------------
    // ---------------------------------------------
    // Delete icon code
    DeleteNode() {
      let elements = document.querySelectorAll(".Edit_box");
      let del_ele = document.querySelectorAll(".del_icon");
      let MoveIcon = document.querySelectorAll(".move_icon");
      Array.prototype.forEach.call(elements, function(node) {
        node.parentNode.removeChild(node);
      });
      Array.prototype.forEach.call(del_ele, function(node) {
        node.parentNode.removeChild(node);
      });
      Array.prototype.forEach.call(MoveIcon, function(node) {
        node.parentNode.removeChild(node);
      });

      this.DesignModeOff();
      this.EditToggle();
    },
    // This will disable right side options
    DesignModeOff() {
      this.DesignMode = false;
    },

    // Remove and Edit Icons
    RemoveEditIcons() {
      let del_ele = document.querySelectorAll(".del_icon");
      let MoveIcon = document.querySelectorAll(".move_icon");
      Array.prototype.forEach.call(del_ele, function(node) {
        node.parentNode.removeChild(node);
      });
      Array.prototype.forEach.call(MoveIcon, function(node) {
        node.parentNode.removeChild(node);
      });
    },
    // Remove social icon
    RemoveSocialIcons(e) {
      var _self = this;
      var elementId = e.target.id;
      if (e.target.id == "") {
        elementId = $(e.target)
          .closest("a")
          .attr("id");
      }
      $("#socialicons1")
        .find(".cross_icon2")
        .remove();
      $("#" + elementId).append(
        "<span class='cross_icon2'><i class='fa fa-times'></i></span>"
      );

      $(".cross_icon2").bind("click", function(e) {
        $(e.target)
          .closest("a")
          .remove();
        _self.DesignModeOff();
        e.preventDefault();
      });
    },

    // ------------------------------------------------------------
    // Add new element with switch case types are define like heading, text , button, image etc.
    // ------------------------------------------------------------

    AddElement(type) {
      // var DividerString =
      //   '<div class="box_main"><div id="seprator' +
      //   this.id +
      //   '" class="editable" /><hr></div></div>';
      // var mainDiv = document.querySelector(".email_template");

      switch (type) {
        case "text": {
          this.id = Math.floor(Math.random() * 1000 + 1);
          let TextString =
            '<div class="box_main" style="padding:0 20px;"><div contenteditable="true" placeholder="Add Some Text" id="text' +
            this.id +
            '" class="editable" data-type="text' +
            this.id +
            '"></div></div>';
          $(".email_template .box_main:nth-last-child(2)").before(TextString);
          elem = document.querySelector("#text" + this.id);

          this.EditToggle();

          elem.classList.add("Edit_box");

          elem.addEventListener("click", e => {
            e.stopPropagation();
            this.EditToggle();
            this.DesignModeOn(e);
            this.GetStyle(e);
            var ClosestEle = $(e.target).closest(".editable");
            ClosestEle.addClass("Edit_box");
            ClosestEle.after(this.DelIconString);
            var delNode = document.querySelector(".del_icon");
            delNode.addEventListener("click", () => {
              this.DeleteNode();
            });
            this.MoveBinding();
          });

          this.ScrollOnAddNewElement(elem);
          this.id++;

          break;
        }

        case "heading": {
          this.id = Math.floor(Math.random() * 1000 + 1);
          let HeadingString =
            '<div class="box_main" style="padding:0 20px;"><div contenteditable="true" placeholder="Add Some Text" id="heading' +
            this.id +
            '" class="editable" data-type="heading' +
            this.id +
            '"></div></div>';
          $(".email_template .box_main:nth-last-child(2)").before(
            HeadingString
          );
          elem = document.querySelector("#heading" + this.id);
          this.EditToggle();
          elem.classList.add("Edit_box");
          elem.addEventListener("click", e => {
            e.stopPropagation();
            this.EditToggle();
            this.DesignModeOn(e);
            this.GetStyle(e);

            var ClosestEle = $(e.target).closest(".editable");
            ClosestEle.addClass("Edit_box");
            ClosestEle.after(this.DelIconString);
            var delNode = document.querySelector(".del_icon");
            delNode.addEventListener("click", () => {
              this.DeleteNode();
            });
            this.MoveBinding();
          });

          this.ScrollOnAddNewElement(elem);
          this.id++;

          break;
        }
        case "divider": {
          this.id = Math.floor(Math.random() * 1000 + 1);
          let DividerString =
            '<div class="box_main" style="padding:0 20px;"><div style="text-align:center;" id="seprator' +
            this.id +
            '" class="editable"><hr style="background:transparent; border-color:#e0e2e3; border-top-width: 1px; border-style: solid; width:100%; display:inline-block; margin-top:10px; margin-bottom:10px;"/></div></div>';
          $(".email_template .box_main:nth-last-child(2)").before(
            DividerString
          );
          var elem = document.querySelector("#seprator" + this.id);

          this.EditToggle();
          elem.classList.add("Edit_box");
          elem.addEventListener("click", e => {
            e.stopPropagation();
            this.DesignModeOn(e);
            this.GetStyle(e);

            this.EditToggle();
            var ClosestEle = $(e.target).closest(".editable");

            ClosestEle.addClass("Edit_box");
            ClosestEle.after(this.DelIconString);

            var delNode = document.querySelector(".del_icon");
            delNode.addEventListener("click", () => {
              this.DeleteNode();
            });
            this.MoveBinding();
          });

          this.ScrollOnAddNewElement(elem);
          this.id++;
          break;
        }
        case "button": {
          this.id = Math.floor(Math.random() * 1000 + 1);
          let ButtonString =
            '<div class="box_main" style="padding:0 20px;"><div id="button' +
            this.id +
            '" class="editable" style="text-align: center;"><a href="#" style="font-family:Arial, text-decoration:none; sans-serif; margin:0px auto;background-color: #007bff;padding-right:20px; padding-left:20px; padding-top: 10px;padding-bottom: 10px; text-align: center; margin: 10px auto; color: #fff;font-weight: 600;border-radius: 0px; display:inline-block; border:none; font-size: 14px; width:auto;">Button</a></div></div>';
          $(".email_template .box_main:nth-last-child(2)").before(ButtonString);
          elem = document.querySelector("#button" + this.id);
          this.EditToggle();
          this.DisableRedirection();
          elem.classList.add("Edit_box");
          elem.addEventListener("click", e => {
            e.stopPropagation();
            this.EditToggle();
            this.DesignModeOn(e);
            this.GetStyle(e);
            var ClosestEle = $(e.target).closest(".editable");
            ClosestEle.addClass("Edit_box");
            ClosestEle.after(this.DelIconString);
            var delNode = document.querySelector(".del_icon");
            delNode.addEventListener("click", () => {
              this.DeleteNode();
            });
            this.MoveBinding();
          });

          this.ScrollOnAddNewElement(elem);
          this.id++;

          break;
        }
        case "image": {
          this.OpenImagePopup();

          break;
        }

        case "icon": {
          this.showIcons = this.showIcons == false ? true : false;
          // this.AddSocialIcon();

          break;
        }

        default:
          // code...
          break;
      }
    },

    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------

    // switch tabs
    TabChange(id) {
      this.tabid = id;
    },
    ScrollOnAddNewElement(elem) {
      $(".set_column").animate(
        { scrollTop: $(".email_template").height() },
        1000,
        "linear"
      );
      setTimeout(() => {
        elem.focus();
      }, 1000);
    },

    // Disable Redirection of links in editor mode
    DisableRedirection() {
      let _self = this;
      $(function() {
        $(".email_template a").click(function(e) {
          _self.DesignModeOn(e);
          _self.GetStyle(e);
          e.preventDefault();
        });
      });
    },

    // SocialIons array
    CreateSocialArray() {
      this.SocialArray = [
        {
          name: "Facebook",
          path: this.BASE_URL + "uploads/icon_images/facebook.png"
        },
        {
          name: "Twitter",
          path: this.BASE_URL + "uploads/icon_images/twitter.png"
        },
        {
          name: "Linkedin",
          path: this.BASE_URL + "uploads/icon_images/linkedin.png"
        },
        {
          name: "Youtube",
          path: this.BASE_URL + "uploads/icon_images/youtube.png"
        },
        {
          name: "Googleplus",
          path: this.BASE_URL + "uploads/icon_images/googleplus.png"
        },
        {
          name: "Vimeo",
          path: this.BASE_URL + "uploads/icon_images/vimeo.png"
        },
        {
          name: "Pinterest",
          path: this.BASE_URL + "uploads/icon_images/pinterest.png"
        },
        {
          name: "Flickr",
          path: this.BASE_URL + "uploads/icon_images/flickr.png"
        },
        { name: "Rss", path: this.BASE_URL + "uploads/icon_images/rss.png" },
        {
          name: "Skype",
          path: this.BASE_URL + "uploads/icon_images/skype.png"
        },
        {
          name: "Blogger",
          path: this.BASE_URL + "uploads/icon_images/blogger.png"
        },
        { name: "Web", path: this.BASE_URL + "uploads/icon_images/web.png" }
      ];
    },
    // Add social Icon
    AddSocialIcon(name, src) {
      var mainDiv = document.querySelector("#socialicons1");
      // var iconsList = mainDiv.querySelectorAll('a');

      this.id = Math.floor(Math.random() * 1000 + 1);

      let ImageName = name;
      let Newid = ImageName + this.id;

      let IconString =
        '<a href="#" id="' +
        Newid +
        '" style="margin-right:10px;  background-color: #7d8b92;  display: inline-block; padding: 10px;" title="Facebook"> <img alt="Facebook" src="' +
        src +
        '" style="height: 30px; width:30px;"> </a>';
      $(mainDiv).append(IconString);

      var elem = document.querySelector("#" + Newid);
      this.EditToggle();
      elem.classList.add("EditableIcon");
      elem.addEventListener("click", e => {
        e.stopPropagation();
        e.preventDefault();
        this.EditToggle();
        this.DesignModeOn(e);
        this.GetStyle(e);
        this.DisableRedirection();
        this.RemoveSocialIcons(e);
        var ClosestEle = $(e.target).closest(".editable");
        ClosestEle.addClass("Edit_box");
      });

      this.ScrollOnAddNewElement(elem);
      this.id++;
    },
    // change Template Background
    SetTemplateBackground() {
      var element = document.querySelector(".email_template");

      $(element).css("background-color", this.bg_color.hex);
    },
    // Bold and Unbold text
    BoldToggle() {
      var element = document.querySelector("#" + this.DesignElementID);
      if ($(element).css("font-weight") != "700") {
        $(element).css("font-weight", "700");
      } else {
        $(element).css("font-weight", "300");
      }
    },

    // Italic and normal font style
    ItalicToggle() {
      var element = document.querySelector("#" + this.DesignElementID);
      if ($(element).css("font-style") != "italic") {
        $(element).css("font-style", "italic");
      } else {
        $(element).css("font-style", "normal");
      }
    },
    // Set text align ment

    AlignText(type) {
      var element = document.querySelector("#" + this.DesignElementID);
      $(element).css("text-align", type);
    },

    // This method is use to change text font ie arial halvatica etc.
    SetTextFont() {
      let FontValue;
      for (let key in this.Fonts) {
        if (key == this.fontfamily) {
          FontValue = this.Fonts[key];
        }
      }
      FontValue = FontValue.replace('"', "");
      var element = document.querySelector("#" + this.DesignElementID);

      $(element).css("font-family", FontValue);
    },

    // This method is use to change font size
    SetTextFontSize() {
      var element = document.querySelector("#" + this.DesignElementID);

      $(element).css("font-size", this.fontsize + "px");
    },
    // This method is use to change font color
    SetTextFontColor() {
      var element = document.querySelector("#" + this.DesignElementID);
      // element.style+="font-size:'"+this.fontsize+"'px;";
      $(element).css("color", this.textcolor.hex);
    },
    // Set top spacing
    SetTopSpacing() {
      var element = document.querySelector("#" + this.DesignElementID);

      $(element).css("margin-top", this.marginTop + "px");
    },
    // Set top spacing

    // Set bottom spacing
    SetBottomSpacing() {
      var element = document.querySelector("#" + this.DesignElementID);

      $(element).css("margin-bottom", this.marginBottom + "px");
    },
    // Set bottom spacing
    // change button lable

    ChangeLabel() {
      var element = document.querySelector("#" + this.DesignElementID);
      $(element)
        .find("a")
        .html(this.ButtonLabel);
    },
    // Change Link of button

    ChangeLink() {
      var element = document.querySelector("#" + this.DesignElementID);
      $(element)
        .find("a")
        .attr("href", this.ButtonLink);
    },
    // Button color change

    SetButtonColor() {
      var element = document.querySelector("#" + this.DesignElementID);
      $(element)
        .find("a")
        .css("background-color", this.ButtonColor.hex);
    },
    SetButtonTextColor() {
      var element = document.querySelector("#" + this.DesignElementID);
      $(element)
        .find("a")
        .css("color", this.ButtonTextColor.hex);
    },
    // Change button shape

    ButtonShapeChange(e) {
      var element = document.querySelector("#" + this.DesignElementID);
      let shape = e.target.value;

      switch (shape) {
        case "0": {
          $(element)
            .find("a")
            .css("border-radius", "0px");
          break;
        }
        case "10": {
          $(element)
            .find("a")
            .css("border-radius", "10px");
          break;
        }
        default: {
          break;
        }
      }
    },
    ButtonWidthChange() {
      var element = document.querySelector("#" + this.DesignElementID);

      switch (this.ButtonWidth) {
        case "auto": {
          $(element)
            .find("a")
            .css("width", this.ButtonWidth);
          break;
        }
        case "100": {
          $(element)
            .find("a")
            .css("width", this.ButtonWidth + "%");
          break;
        }
        default: {
          break;
        }
      }
    },
    // Chnage button font size
    ButtonSizeChange() {
      var element = document.querySelector("#" + this.DesignElementID);

      switch (this.ButtonSize) {
        case "14": {
          $(element)
            .find("a")
            .css("font-size", this.ButtonSize + "px");
          break;
        }
        case "18": {
          $(element)
            .find("a")
            .css("font-size", this.ButtonSize + "px");
          break;
        }
        case "22": {
          $(element)
            .find("a")
            .css("font-size", this.ButtonSize + "px");
          break;
        }
        default: {
          break;
        }
      }
    },
    // Set button font
    SetButtonFont() {
      let FontValue;
      for (let key in this.Fonts) {
        if (key == this.fontfamily) {
          FontValue = this.Fonts[key];
        }
      }
      FontValue = FontValue.replace('"', "");
      var element = document.querySelector("#" + this.DesignElementID);
      // element.style="font-family:'"+FontValue+"'";
      $(element)
        .find("a")
        .css("font-family", FontValue);
    },
    // **********************************************************
    // Seprator events

    // Set line background
    SetLineColor() {
      var element = document.querySelector("#" + this.DesignElementID);
      $(element)
        .find("hr")
        .css("border-color", this.LineColor.hex);
    },
    // change border style of line ie dotted or solid
    SetStrokeStyle() {
      var element = document.querySelector("#" + this.DesignElementID);
      $(element)
        .find("hr")
        .css("border-style", this.StrokeStyle);
    },
    // change border height of line
    SetStrokeWidth() {
      var element = document.querySelector("#" + this.DesignElementID);
      $(element)
        .find("hr")
        .css("border-top-width", this.StrokeWidth + "px");
    },
    // change line width
    SetStrokeSize() {
      var element = document.querySelector("#" + this.DesignElementID);
      $(element)
        .find("hr")
        .css("width", this.StrokeSize + "%");
    },
    // change line alignment
    SetStrokeAlignment() {
      var element = document.querySelector("#" + this.DesignElementID);
      $(element).css("text-align", this.StrokeAlignment);
    },
    // ------------------------------------------
    // ---------------------------------------------

    // Icon style
    // Setting icon color
    SetIconColor() {
      var element = document.querySelector("#" + this.DesignElementID);

      $(element).css("background-color", this.IconColor.hex);
    },
    // Setting icon Url
    SetIconUrl() {
      var element = document.querySelector("#" + this.DesignElementID);
      $(element).attr("href", this.IconUrl);
    },
    // image popup
    OpenImagePopup() {

      GetGalleryImages()
        .then(res => {
          this.GalleryImages = res.data;
        })
        .catch(e => {
          throw e;
        });
      this.ShowGallery = true;
      this.ShowOverlay = true;
    },
    ImageTab(id) {
      this.Imagetabid = id;
    },
    // Get clicked image path from gallery
    SelectedImage(e) {
      $(".image_gallery li").removeClass("selected");
      $(e.target)
        .parent("li")
        .addClass("selected");
      this.SelectedImagePath = $(e.target).attr("src");
    },
    // Set image from selected image
    SetImageFromGallery() {
      this.ShowImage("image", this.SelectedImagePath);
      this.HideImagePopup();
    },
    // Show selected image
    ShowImage(name, path) {
      if (this.UpdateHeaderImage == true) {
        let id = this.DesignElementID;
        $("#" + id).css("background-image", 'url("' + path + '")');
        this.ImageLink = path;
      } else {
        if (this.ImageUpdate == true) {
          let id = this.DesignElementID;

          $("#" + id)
            .find("img")
            .attr("src", path);
          this.ImageLink = path;
        } else if (this.BusinessLogo == true) {
          let id = this.DesignElementID;
          $("#" + id)
            .find(".logo")
            .css("background-image", 'url("' + path + '")');

          this.LogoLink = path;
        } else {
          this.AddNewImage(name, path);
          this.ImageLink = path;
        }
      }
    },
    AddNewImage(alt, src) {
      // var mainDiv = document.querySelector(".email_template");
      this.id = Math.floor(Math.random() * 1000 + 1);
      let ImageString =
        '<div class="box_main" style="padding:0 20px;"><div id="image' +
        this.id +
        '" class="editable" style="text-align: center;"><a href="#"><img src="#" style="max-width: 100%; margin: 20px auto;display: block;"></a></div></div>';
      $(".email_template .box_main:nth-last-child(2)").before(ImageString);
      var elem = document.querySelector("#image" + this.id);
      $(elem)
        .find("img")
        .attr("src", src);
      $(elem)
        .find("img")
        .attr("alt", alt);
      this.DisableRedirection();
      this.EditToggle();
      elem.classList.add("Edit_box");
      elem.addEventListener("click", e => {
        e.stopPropagation();
        this.EditToggle();
        this.DesignModeOn(e);
        this.GetStyle(e);

        var ClosestEle = $(e.target).closest(".editable");
        ClosestEle.addClass("Edit_box");
        ClosestEle.after(this.DelIconString);
        var delNode = document.querySelector(".del_icon");
        delNode.addEventListener('click',()=>{

          this.DeleteNode();
        });
        this.MoveBinding();
      });

      this.ScrollOnAddNewElement(elem);
      this.id++;
    },
    // Hide image gallery
    HideImagePopup() {
      this.ShowGallery = false;
      this.ShowOverlay = false;
      this.SelectedImagePath = null;
      this.ImageUpdate = false;
      this.UpdateHeaderImage = false;
      this.BusinessLogo = false;
    },
    // Upload New image
  UploadImage() {
    let data = this.SetImage();
    this.SelectedFile = '';
    this.FileName='';
    let _self = this;
    UploadImage(data).then(res=>{
      if (res.status == 200) {
        var imagedata=res.data.data;
        Swal({
          title: "Image uploaded successfully!",
          text: "Image gallery updated!",
          type: "success",

        }).then(function() { _self.HideImagePopup() });
        this.ShowImage(imagedata.image_name, imagedata.image_path);
      } else {
        Swal({
          title: "Image uploaded successfully!",
          text: res.message,
          type: "error",

        })
      }


    }).catch(err=>{
        Swal({
        title: "Can't upload image!",
        text: err.message,
        type: "error",
      })
      });

  },
   // Set selected image from gallery
  SetImage() {
    let fd = new FormData();
    fd.append('gallary_image', this.SelectedFile);
    return fd;
  },

  // Set image from input field
  ImageUpload(event) {

    if (event.target.files.length > 0) {
      this.SelectedFile = event.target.files[0];
      this.FileName=this.SelectedFile.name;
    }
  },
   UpdateImage() {
    this.ImageUpdate = true;
    this.OpenImagePopup();


  },

// image code
  // Chnage image code
  ChangeImageLink() {
    var element = document.querySelector('#' + this.DesignElementID);
    $(element).find('a').attr('href', this.ImageUrl);

  },
   // This method is use hide element design mode in right
  HideDesignMode() {
    let _self = this;


    _self.DesignModeOff();
    _self.EditToggle();


    $('.tabs_box').click(function(e) {
      e.stopPropagation();
    });
    $('.cross_icon2').remove();


  },
  // Get header type to backgroud image or color
  ChangeHeaderStyle(value)
  {
      this.HeaderType=value;

      switch (this.HeaderType) {
        case "color":
          {
            let elem=document.querySelector('#header1');
            this.SwitchToColor(elem);
            break;
          }
          case "image":
          {
            let elem=document.querySelector('#header1');
            this.SwitchToImage(elem);
            break;
          }


        default:
        {
          break;
        }

      }
  },
   // Switch color mode to image and vise versa
  SwitchToColor(elem)
  {

     $(elem).css('background-image','').css('background-color',this.HeaderColor);


  },

  SwitchToImage(elem)
  {
      $(elem).css('background-color','').css('background-image','url("'+this.ImageLink+'")');


  },
  // Change Header color

  SetHeaderColor()
  {
      var element = document.querySelector('#' + this.DesignElementID);
      this.HeaderColor=this.HeaderColor.hex;
      $(element).css("background-color",this.HeaderColor);
      $(element).find('.logo').css('background-color',this.HeaderColor);
  },

   // set header logo and business name options
  ChangeLogoOptions(e)
  {
      this.LogoOptions=e.target.value;

      if(this.LogoOptions=='LOGO')
      {
        var element = document.querySelector('#' + this.DesignElementID);
        $(element).find('p').css('visibility','hidden');
        $(element).find('.logo').css('visibility','visible');
      }
      else if(this.LogoOptions=='MERCHANT_NAME')
      {
        element = document.querySelector('#' + this.DesignElementID);
        $(element).find('.logo').css('visibility','hidden');
        $(element).find('p').css('visibility','visible');
      }
      else if(this.LogoOptions=='BOTH')
      {
        element = document.querySelector('#' + this.DesignElementID);
        $(element).find('.logo').css('visibility','visible');
        $(element).find('p').css('visibility','visible');
      }
      else if(this.LogoOptions=='NONE')
      {
        element = document.querySelector('#' + this.DesignElementID);
        $(element).find('.logo').css('visibility','hidden');
        $(element).find('p').css('visibility','hidden');
      }
  },
  // Change business name color

  SetBusinessNameColor()
  {
    var element = document.querySelector('#' + this.DesignElementID);
    $(element).find('p').css('color',this.BusinessNameColor.hex);
  },
  // Update Business name
  ChangeBusinessName() {
    var element = document.querySelector('#' + this.DesignElementID);
    $(element).find('p').html(this.BusinessName);
  },
  // Update Logo
  UpdateLogo()
  {
    this.BusinessLogo = true;
    this.OpenImagePopup();
  },
  // Update Header image flag
  UpdateHeader() {
    this.UpdateHeaderImage = true;
    this.OpenImagePopup();
  },
  // Move elements
moveUp(element) {

  if(element.previousElementSibling)
    element.parentNode.insertBefore(element, element.previousElementSibling);
},
moveDown(element) {
  if(element.nextElementSibling)
    element.parentNode.insertBefore(element.nextElementSibling, element);
},
MoveBinding()
{
  var _self=this;
  document.querySelector('.move_icon').addEventListener('click', function(e) {

            if($(e.target).hasClass('el_down')) {
              var elem=e.target.parentNode.parentNode;

              _self.moveDown(elem);
              }
            else if($(e.target).hasClass('el_up')) {
              elem=e.target.parentNode.parentNode;
              _self.moveUp(elem)
              }


          });
},
UpdateMailSubject()
{
  localStorage.setItem('subject',this.MailSubject);
}


    // Methods: ends
  }
};
</script>

<style scoped>
.vc-sketch {
  margin: 5px 0;
  width: 250px;
}
</style>
