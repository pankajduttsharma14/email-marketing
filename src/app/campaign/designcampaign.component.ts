import { Component, OnInit, Renderer, ElementRef, ViewEncapsulation, Inject, ViewChild, OnDestroy } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { DragulaService } from 'ng2-dragula';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadService } from '../services/upload.service';
import { CampaignService } from '../services/campaign.service';
import swal, { SweetAlertOptions } from 'sweetalert2';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Router } from '@angular/router';
import { APIEndpoint } from '../appsettings/BaseUrl';

@Component({
  selector: 'app-designcampaign',
  templateUrl: './designcampaign.component.html',
  styleUrls: ['./designcampaign.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [UploadService, CampaignService]
})

export class DesigncampaignComponent implements OnInit, OnDestroy {
  
  @ViewChild('saveSwal') private saveSwal: SwalComponent;
  DesignHeading: string;
  EditContent: any;
  bg_color: any = '#efefef';
  steps: any = 2;
  WindowUrl: any = window.location.origin;
  Image: any = null;
  MailSubject:any;
  TempId:any=null;
  BASE_URL:any='';
  fontsize: any = 14;
  fontfamily: any = 'arial';
  showIcons: boolean = false;
  id: number = 0;
  DesignMode: boolean = false;
  DesignType: any;
  DesignElementID: any;
  textcolor: string = '#272727';
  marginBottom: any = 10;
  marginTop: any = 10;
  IconUrl: any = '';
  ImageLink: any = '';
  ImageUrl: any = '';
  IconColor: any = '#fff';
  ButtonColor: any = "#007bff"
ButtonTextColor: any = "#fff"
ButtonShape: any = '0';
ButtonLabel: any = 'Button';
ButtonLink: any;
ButtonWidth: any = 'auto';
ButtonSize: any = '18';
ShowEmailer: boolean = false;
  ShowPopup: boolean = false;
  ShowOverlay: boolean = false;
  FinalEmailer: any;
  LineColor: any = "#7d8b92";
  StrokeWidth: any = '1';
StrokeSize: any = '100';
StrokeAlignment: any = 'center';
StrokeStyle: any = 'solid';
ShowGallery: boolean = false;
  ImageHeading: string = "Upload Image";
  GalleryImages: any = [];
  SelectedFile: any;
  FileName:any='';
  SelectedImagePath: any = null;
  SocialArray:any=new Array();
  ImageUpdate: boolean = false;
UpdateHeaderImage: boolean = false;
BusinessLogo: boolean = false;
LogoLink:string;
HeaderType:string='image';
HeaderColor:any='#007bff';
BusinessName: any = 'Business Name';
LogoOptions:any='BOTH';
  constructor(private render: Renderer,
    private elementRef: ElementRef,
    private dragulaService: DragulaService,
    @Inject(DOCUMENT) private document: any,
    private UploadService: UploadService,
    private CampaignService: CampaignService,
    private sanitizer: DomSanitizer,
    private router:Router
  ) {
    
   this.BASE_URL=APIEndpoint.BaseUrl;
  
    // Drag and drop 

    dragulaService.drag.subscribe((value: any) => {
      // console.log(`drag: ${value[0]}`); // value[0] will always be bag name
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value: any) => {
      // console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value: any) => {
      // console.log(`over: ${value[0]}`);
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value: any) => {
      // console.log(`out: ${value[0]}`);
      this.onOut(value.slice(1));
    });
    dragulaService.dropModel.subscribe((value: any) => {
      this.onDropModel(value.slice(1));
    });
    dragulaService.removeModel.subscribe((value: any) => {
      this.onRemoveModel(value.slice(1));
    });
    // dragulaService.setOptions('third-bag', {
    //   moves: function (el, container, handle) {
    //     return handle.className === 'handle';
    //   }
    // });
    dragulaService.setOptions('third-bag', {
      moves: (el, source, handle, sibling) => !el.classList.contains('ignore-drag')
    });
    // Drag and drop


  }

  // html code for delete icon
  DelIconString: string = '<span class="del_icon bg-danger"><i class="mdi mdi-delete"></i></span> <span class="move_icon"><i class="icon-cursor-move"></i></span>';

  ngOnInit() {
    // this method creats social icons array

    this.CreateSocialArray();
    
    var _self = this;
    this.DesignHeading = "Design Campaign";

    // Function is to add some custom events on newly added or clicked Elements
    $(function() {
      var SelectedEmailer: any = localStorage.getItem('selected_mailer');
      _self.MailSubject=localStorage.getItem('subject');
      _self.TempId=localStorage.getItem('Temp_id');
      $('.email_template').append(SelectedEmailer);
      $('.email_template').find("div[id^='heading']").prop('contenteditable', true);
      $('.email_template').find("div[id^='text']").prop('contenteditable', true);
      
      
      var elem = _self.elementRef.nativeElement.querySelectorAll('.editable');
      for (let i = 0; i < elem.length; i++) {

        _self.render.listen(elem[i], 'click', (e) => {
          // if element type is social icon
          if (elem[i].id == 'socialicons1') {
            e.stopPropagation();
            _self.EditToggle();
            var ClosestEle = $(e.target).closest('.editable');
            ClosestEle.addClass('Edit_box');
            _self.DesignModeOn(e);
            _self.GetStyle(e);
            _self.RemoveSocialIcons(e);

          } 
            // For other element type
          else {
            e.stopPropagation();
            _self.EditToggle();
            var ClosestEle = $(e.target).closest('.editable');
            ClosestEle.addClass('Edit_box');
            ClosestEle.after(_self.DelIconString);
            _self.DesignModeOn(e);
            _self.GetStyle(e);
            var delNode = _self.elementRef.nativeElement.querySelector('.del_icon');
            _self.render.listen(delNode, 'click', (e) => {
              _self.DeleteNode();
            });
            
          }

        });


      }
      // disable paste content
      _self.PasteAsText();
      _self.DisableRedirection();
      $('#socialicons1').click(function(e) {

        if (e.target == this) _self.DesignModeOff();



      });


    });




  }



  // Remove drag effect form footer
  ngOnDestroy() {
    const bag: any = this.dragulaService.find('third-bag');
    if (bag !== undefined) { this.dragulaService.destroy('third-bag'); };

  }

  // Edit class toggle event
  ToggleEditClass(e) {

    if (!e.target.classList.contains('Edit_box')) {
      this.render.setElementClass(e.target, 'Edit_box', true);
    } else { this.render.setElementClass(e.target, 'Edit_box', false); }

  }

  // Disable Redirection of links in editor mode
  DisableRedirection() {
    let _self = this;
    $(function() {

      $('.email_template a').click(function(e) {

        _self.DesignModeOn(e);
        _self.GetStyle(e);
        e.preventDefault();

      });



    });
  }
// ------------------------------------------------------------
// Add new element with switch case types are define like heading, text , button, image etc.
// ------------------------------------------------------------
  
  
  DividerString: string = '<div class="box_main"><div id="seprator' + this.id + '" class="editable" /><hr></div></div>';
  AddElement(type: string) {
    var mainDiv = this.elementRef.nativeElement.querySelector('.email_template');
    
    switch (type) {
      case "text":
        {
          this.id = Math.floor((Math.random() * 1000) + 1);
          let TextString: string = '<div class="box_main" style="padding:0 20px;"><div contenteditable="true" placeholder="Add Some Text" id="text' + this.id + '" class="editable" data-type="text' + this.id + '"></div></div>';
          $(".email_template .box_main:nth-last-child(2)").before(TextString);
          var elem = this.elementRef.nativeElement.querySelector('#text' + this.id);
          console.log(this.id);
          this.EditToggle();

          this.render.setElementClass(elem, 'Edit_box', true);
          this.render.listen(elem, 'click', (e) => {
            e.stopPropagation();
            this.EditToggle();
            this.DesignModeOn(e);
            this.GetStyle(e);
            var ClosestEle = $(e.target).closest('.editable');
            ClosestEle.addClass('Edit_box');
            ClosestEle.after(this.DelIconString);
            var delNode = this.elementRef.nativeElement.querySelector('.del_icon');
            this.render.listen(delNode, 'click', () => {
              this.DeleteNode();
            });
          });

          this.ScrollOnAddNewElement(elem);
          this.id++;

          break;

        }

      case "heading":
        {
          this.id = Math.floor((Math.random() * 1000) + 1);
          let HeadingString: string = '<div class="box_main" style="padding:0 20px;"><div contenteditable="true" placeholder="Add Some Text" id="heading' + this.id + '" class="editable" data-type="heading' + this.id + '"></div></div>';
          $(".email_template .box_main:nth-last-child(2)").before(HeadingString);
          var elem = this.elementRef.nativeElement.querySelector('#heading' + this.id);
          this.EditToggle();
          this.render.setElementClass(elem, 'Edit_box', true);
          this.render.listen(elem, 'click', (e) => {
            e.stopPropagation();
            this.EditToggle();
            this.DesignModeOn(e);
            this.GetStyle(e);

            var ClosestEle = $(e.target).closest('.editable');
            ClosestEle.addClass('Edit_box');
            ClosestEle.after(this.DelIconString);
            var delNode = this.elementRef.nativeElement.querySelector('.del_icon');
            this.render.listen(delNode, 'click', (e) => {
              this.DeleteNode();
            });
          });

          this.ScrollOnAddNewElement(elem);
          this.id++;

          break;

        }
      case "divider":
        {
          this.id = Math.floor((Math.random() * 1000) + 1);
          let DividerString: string = '<div class="box_main" style="padding:0 20px;"><div style="text-align:center;" id="seprator' + this.id + '" class="editable"><hr style="background:transparent; border-color:#e0e2e3; border-top-width: 1px; border-style: solid; width:100%; display:inline-block; margin-top:10px; margin-bottom:10px;"/></div></div>';
          $(".email_template .box_main:nth-last-child(2)").before(DividerString);
          var elem = this.elementRef.nativeElement.querySelector('#seprator' + this.id);

          this.EditToggle();
          this.render.setElementClass(elem, 'Edit_box', true);
          this.render.listen(elem, 'click', (e) => {
            e.stopPropagation();
            this.DesignModeOn(e);
            this.GetStyle(e);

            this.EditToggle();
            var ClosestEle = $(e.target).closest('.editable');

            ClosestEle.addClass('Edit_box');
            ClosestEle.after(this.DelIconString);

            var delNode = this.elementRef.nativeElement.querySelector('.del_icon');
            this.render.listen(delNode, 'click', (e) => {
              this.DeleteNode();
            });
          });

          this.ScrollOnAddNewElement(elem);
          this.id++;
          break;

        }
      case "button":
        {

          this.id = Math.floor((Math.random() * 1000) + 1);
          let ButtonString: string = '<div class="box_main" style="padding:0 20px;"><div id="button' + this.id + '" class="editable" style="text-align: center;"><a href="#" style="font-family:Arial, text-decoration:none; sans-serif; margin:0px auto;background-color: #007bff;padding-right:20px; padding-left:20px; padding-top: 10px;padding-bottom: 10px; text-align: center; margin: 10px auto; color: #fff;font-weight: 600;border-radius: 0px; display:inline-block; border:none; font-size: 14px; width:auto;">Button</a></div></div>';
          $(".email_template .box_main:nth-last-child(2)").before(ButtonString);
          var elem = this.elementRef.nativeElement.querySelector('#button' + this.id);
          this.EditToggle();
          this.DisableRedirection();
          this.render.setElementClass(elem, 'Edit_box', true);
          this.render.listen(elem, 'click', (e) => {
            e.stopPropagation();
            this.EditToggle();
            this.DesignModeOn(e);
            this.GetStyle(e);
            var ClosestEle = $(e.target).closest('.editable');
            ClosestEle.addClass('Edit_box');
            ClosestEle.after(this.DelIconString);
            var delNode = this.elementRef.nativeElement.querySelector('.del_icon');
            this.render.listen(delNode, 'click', (e) => {
              this.DeleteNode();
            });
          });

          this.ScrollOnAddNewElement(elem);
          this.id++;

          break;

        }
      case "image":
        {
          this.OpenImagePopup();

          break;

        }

      case 'icon':
        {

          this.showIcons = this.showIcons == false ? true : false;
          // this.AddSocialIcon();

          break;

        }

      default:
        // code...
        break;
    }
  }

// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
  // Remove edit from all Element 
  EditToggle() {
    let elements = this.elementRef.nativeElement.querySelectorAll('.Edit_box');
    let ele = this.elementRef.nativeElement.querySelectorAll('.del_icon');
    let MoveIcon = this.elementRef.nativeElement.querySelectorAll('.move_icon');
    Array.prototype.forEach.call(ele, function(node) {
      node.parentNode.removeChild(node);
    });
    Array.prototype.forEach.call(MoveIcon, function(node) {
      node.parentNode.removeChild(node);
    });
    if (elements.length > 0) {
      for (let i = 0; i < elements.length; i++) {
        this.render.setElementClass(elements[i], 'Edit_box', false);

      }
    }
    $('.cross_icon2').remove();
  }

 // -----------------------------------------------------------
// -----------------------------------------------------------
  // Delete icon code
  DeleteNode() {

    let elements = this.elementRef.nativeElement.querySelectorAll('.Edit_box');
    let del_ele = this.elementRef.nativeElement.querySelectorAll('.del_icon');
    let MoveIcon = this.elementRef.nativeElement.querySelectorAll('.move_icon');
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
  }



  // Draggula Methods for darging

  private hasClass(el: any, name: string): any {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }

  private addClass(el: any, name: string): void {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  private removeClass(el: any, name: string): void {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }

  private onDrag(args: any): void {
    let [e] = args;
    this.removeClass(e, 'ex-moved');
  }

  private onDrop(args: any): void {
    let [e] = args;
    this.addClass(e, 'ex-moved');
  }

  private onOver(args: any): void {
    let [el] = args;
    this.addClass(el, 'ex-over');
  }

  private onOut(args: any): void {
    let [el] = args;
    this.removeClass(el, 'ex-over');
  }



  private onDropModel(args: any): void {
    let [el, target, source] = args;

  }

  private onRemoveModel(args: any): void {
    let [el, source] = args;

  }

// Draggula Methods for darging

// Code to Paste text inside box as a plain text

  PasteAsText() {
    let elements = this.elementRef.nativeElement.querySelectorAll('.editable');

    for (var i = 0; i < elements.length; i++) {

      this.render.listen(elements[i], 'paste', (e) => {
        // cancel paste
        e.preventDefault();

        // get text representation of clipboard
        var text = e.clipboardData.getData("text/plain");

        // insert text manually
        document.execCommand("insertHTML", false, text);


      });

    }



  }
// Code to Paste text inside box as a plain text

  
  // This code is use to check element type after clicking on element of 
  // When we click button this method will detect the type button by id.

  
  DesignModeOn(e) {
    this.DesignElementID = e.target.id;

    if (this.DesignElementID == '' || this.DesignElementID == null) {
      this.DesignElementID = $(e.target).closest('.editable').attr('id');

    } else {
      this.DesignElementID = e.target.id;

    }
    this.DesignType = this.DesignElementID.replace(/[0-9]/g, '');
    switch (this.DesignType) {
      case 'text':
        {
          this.DesignHeading = "Edit Text";
          this.DesignMode = true;
          break;
        }
      case 'heading':
        {
          this.DesignHeading = "Edit Heading";
          this.DesignMode = true;
          break;
        }
      case 'button':
        {
          this.DesignHeading = "Edit Button";
          this.DesignMode = true;
          break;
        }
      case 'seprator':
        {
          this.DesignHeading = "Edit Seprator";
          this.DesignMode = true;
          break;
        }
      case 'image':
        {
          this.DesignHeading = "Edit Image";
          this.DesignMode = true;
          break;
        }
      case 'socialicons':
        {
          let element = e.target.id;
          if (element == '' || element == null) {
            element = $(e.target).closest('a').attr('id');

          }
          this.DesignHeading = "Customize Icon";
          this.DesignMode = true;
          this.DesignElementID = element;

          break;
        }
      case 'header':
        {
          this.DesignHeading = "Edit Header";
          this.DesignMode = true;
          break;
        }

      default:
        {

          break;
        }
    }



  }
// --------------------------------------------------------------

  

  // This will disable right side options 
  DesignModeOff() {
    this.DesignMode = false;

  }

  // all fonts object array
  Fonts: any = {
    'arial': 'Arial, sans-serif',
    'caveat-brush': 'Caveat Brush, cursive',
    'comic-sans-ms': 'Comic Sans MS, Comic Sans, Chalkboard, ChalkboardSE-Regular, sans-serif',
    'courier-new': 'Courier New, monospace',
    'dancing-script': 'Dancing Script, cursive',
    'georgia': 'Georgia, serif',
    'helvetica': 'Helvetica, sans-serif',
    'lora': '"Lora", serif',
    'lucida': 'Lucida, Lucida Sans Unicode, Lucida Grande, sans-serif',
    'tahoma': 'Tahoma, Geneva, sans-serif',
    'palatino': 'Palatino, Palatino Linotype, serif',
    'times-new-roman': 'Times New Roman, sans-serif',
    'verdana': 'Verdana, Geneva, sans-serif',
  };


  // This method is use to change text font ie arial halvatica etc.
  SetTextFont(e) {

    let FontValue: string;
    for (let key in this.Fonts) {
      if (key == this.fontfamily) {
        FontValue = this.Fonts[key];


      }


    }
    FontValue = FontValue.replace("\"", "");
    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);

    $(element).css("font-family", FontValue);


  }

  // This method is use to change font size
  SetTextFontSize(e) {
    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
  
    $(element).css("font-size", this.fontsize + "px");
  }

  // This method is use to change font color
  SetTextFontColor(e) {

    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
    // element.style+="font-size:'"+this.fontsize+"'px;";
    $(element).css("color", this.textcolor);
  }

  // This method is use hide element design mode in right
  HideDesignMode() {
    let _self = this;


    _self.DesignModeOff();
    _self.EditToggle();


    $('.tabs_box').click(function(e) {
      e.stopPropagation();
    });
    $('.cross_icon2').remove();


  }
  
  // Set top spacing
  SetTopSpacing(e) {

    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);

    $(element).css("margin-top", this.marginTop + 'px');
  }
// Set top spacing

// Set bottom spacing
  SetBottomSpacing(e) {

    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);

    $(element).css("margin-bottom", this.marginBottom + 'px');
  }
  // Set bottom spacing

  // Align Text

  TextAlign: any;
  AlignText(type: string) {
    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
    $(element).css("text-align", type);
  }
  // Align Text

  // Bold and Unbold text

  BoldToggle() {
    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
    if ($(element).css("font-weight") != '700') {

      $(element).css("font-weight", '700');
    } else {
      $(element).css("font-weight", '300');
    }
    
  }
  // Bold and Unbold text

  // Italic and normal font style
  ItalicToggle() {
    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
    if ($(element).css("font-style") != 'italic') {

      $(element).css("font-style", 'italic');
    } else {
      $(element).css("font-style", 'normal');
    }

    
  }
  
 
// ----------------------------------------------------------------
// -------------------------------------------------------------------

  // This method have switch case which  is use to get element style when you click on element.
  GetStyle(e) {


    let ElementID = e.target.id;


    if (ElementID == '' || ElementID == null) {
      ElementID = $(e.target).closest('.editable').attr('id');

    } else {
      ElementID = e.target.id;

    }
    let NewId: any;
    NewId = ElementID.replace(/[0-9]/g, '');
    switch (NewId) {
      case "text":
        {
          var style = getComputedStyle(e.target);
          this.textcolor = style.color;
          this.fontsize = style.fontSize.replace(/[A-Z a-z]/g, '');
          this.marginTop = style.marginTop.replace(/[A-Z a-z]/g, '');
          this.marginBottom = style.marginBottom.replace(/[A-Z a-z]/g, '');
          let fontfamily = style.fontFamily.replace(/"/g, "");


          for (let key in this.Fonts) {
            if (this.Fonts[key] == fontfamily) {
              this.fontfamily = key;
              break;
            }
          }
          break;
        }
      case "heading":
        {
          var style = getComputedStyle(e.target);
          this.textcolor = style.color;
          this.fontsize = style.fontSize.replace(/[A-Z a-z]/g, '');
          this.marginTop = style.marginTop.replace(/[A-Z a-z]/g, '');
          this.marginBottom = style.marginBottom.replace(/[A-Z a-z]/g, '');
          let fontfamily = style.fontFamily.replace(/"/g, "");


          for (let key in this.Fonts) {
            if (this.Fonts[key] == fontfamily) {
              this.fontfamily = key;
              break;
            }
          }
          break;
        }
      case "socialicons":
        {
          this.RemoveEditIcons();


          let element = e.target.id;
          if (element == '' || element == null) {
            element = $(e.target).closest('a').attr('id');

          }
          this.IconUrl = $("#" + element).attr('href');
          this.IconColor = $("#" + element).css('color');


          break;
        }

      case "button":
        {

          var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
          var ButtonEle = $(element).find('a');
          this.ButtonLabel = $(ButtonEle).html();
          this.ButtonLink = $(ButtonEle).attr('href');
          this.ButtonColor = $(ButtonEle).css('background-color');
          this.ButtonTextColor = $(ButtonEle).css('color');
          this.ButtonShape = $(ButtonEle).css('border-radius').replace('px', '');
          this.ButtonSize = $(ButtonEle).css('font-size').replace('px', '');
          this.ButtonWidth = $(ButtonEle)[0].style.width.replace('%', '');
          let fontfamily = $(ButtonEle).css('font-family').replace(/"/g, "");


          for (let key in this.Fonts) {
            if (this.Fonts[key] == fontfamily) {
              this.fontfamily = key;
              break;
            }
          }





          break;
        }
      case "image":
        {

          var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
          var ImgEle = $(element).find('img');
          var ImgLink = $(element).find('a');
          this.ImageLink = $(ImgEle).attr('src');
          this.ImageUrl = $(ImgLink).attr('href');
          break;
        }
      case 'header':
        {  

          if(this.HeaderType=='image')
          {
              var bg = $('#' + this.DesignElementID).css('background-image');
              bg = bg.replace('url(','').replace(')','').replace(/\"/gi, "");
              this.ImageLink=bg;  
          }
          else if(this.HeaderType=='color')
          {
              var bg = $('#' + this.DesignElementID).css('background-color');
              this.HeaderColor=bg;
          }

            var LogoImg=$('#' + this.DesignElementID).find('.logo').css('background-image');
            this.LogoLink=LogoImg.replace('url(','').replace(')','').replace(/\"/gi, "");
            var BusinessName=$('#' + this.DesignElementID).find('p').html();
            this.BusinessName=BusinessName;
          
        }


      default:
        {
          // code...
          break;
        }

    }


  }

// ------------------------------------------
// ---------------------------------------------
  
  // Icon style
  // Setting icon color
  SetIconColor(event) {
    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);

    $(element).css("background-color", this.IconColor);


  }
  // Setting icon Url
  SetIconUrl(e) {
    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
    $(element).attr("href", this.IconUrl);
  }


// ***************************************************************
// Button styles

  // Button color change
  
  SetButtonColor(e) {
    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
    $(element).find('a').css("background-color", this.ButtonColor);
  }


  // Button Text color change
  
  SetButtonTextColor(e) {
    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
    $(element).find('a').css("color", this.ButtonTextColor);
  }



  // Remove and Edit Icons
  RemoveEditIcons() {
    let del_ele = this.elementRef.nativeElement.querySelectorAll('.del_icon');
    let MoveIcon = this.elementRef.nativeElement.querySelectorAll('.move_icon');
    Array.prototype.forEach.call(del_ele, function(node) {
      node.parentNode.removeChild(node);
    });
    Array.prototype.forEach.call(MoveIcon, function(node) {
      node.parentNode.removeChild(node);
    });

  }

  // Change button shape

  
  ButtonShapeChange(e) {
    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
    let shape = e.target.value;

    switch (shape) {
      case ('0'):
        {
          $(element).find('a').css('border-radius', '0px');
          break;
        }
      case ('10'):
        {
          $(element).find('a').css('border-radius', '10px');
          break;
        }
      default:
        {
          break;
        }
    }
  }

  // change button lable
  
  ChangeLabel(e) {
    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
    $(element).find('a').html(this.ButtonLabel);
  }

  // Set button font
  SetButtonFont(e) {

    let FontValue: string;
    for (let key in this.Fonts) {
      if (key == this.fontfamily) {
        FontValue = this.Fonts[key];


      }


    }
    FontValue = FontValue.replace("\"", "");
    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
    // element.style="font-family:'"+FontValue+"'";
    $(element).find('a').css("font-family", FontValue);


  }

  // Change Link of button
  
  ChangeLink(e) {
    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
    $(element).find('a').attr('href', this.ButtonLink);

  }

  // Change button width
  
  ButtonWidthChange(e) {
    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);


    switch (this.ButtonWidth) {
      case ('auto'):
        {
          $(element).find('a').css('width', this.ButtonWidth);
          break;
        }
      case ('100'):
        {
          $(element).find('a').css('width', this.ButtonWidth + '%');
          break;
        }
      default:
        {
          break;
        }
    }
  }


  
  // Chnage button font size
  ButtonSizeChange(e) {
    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);


    switch (this.ButtonSize) {
      case ('14'):
        {
          $(element).find('a').css('font-size', this.ButtonSize + 'px');
          break;
        }
      case ('18'):
        {
          $(element).find('a').css('font-size', this.ButtonSize + 'px');
          break;
        }
      case ('22'):
        {
          $(element).find('a').css('font-size', this.ButtonSize + 'px');
          break;
        }
      default:
        {
          break;
        }
    }
  }

  // ****************************************************
  // Emailer options

  // Save emailer and show preview
  SavePreviewEmailer() {

    
    var EmailerHtml = $('<div>').append($('.email_template').clone().removeClass('email_template').find('.editable').removeAttr('contenteditable')).html();
    this.FinalEmailer = this.sanitizer.bypassSecurityTrustHtml(EmailerHtml);
    this.ShowPopup = true;
    this.ShowOverlay = true;
    $(function() {
      $('.emailer_preview').find('a').click(function() {
        return false;
      });
    })

    

  }
  HidePreview() {


    this.ShowPopup = false;
    this.ShowOverlay = false;



  }


// **********************************************************
// Seprator events
  
  // Set line background
  SetLineColor(e) {
    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
    $(element).find('hr').css('border-color', this.LineColor);
  }


  // change Template Background
  SetTemplateBackground(event) {
    var element = this.elementRef.nativeElement.querySelector('.email_template');
    $(element).css("background-color", this.bg_color);
  }

  // change border style of line ie dotted or solid
  SetStrokeStyle(e) {
    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
    $(element).find('hr').css('border-style', this.StrokeStyle);
  }
  // change border height of line
  SetStrokeWidth(e) {
    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
    $(element).find('hr').css('border-top-width', this.StrokeWidth + 'px');
  }
  
  // change line width
  SetStrokeSize(e) {
    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
    $(element).find('hr').css('width', this.StrokeSize + '%');
  }
  // change line alignment
  SetStrokeAlignment(e) {
    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
    $(element).css('text-align', this.StrokeAlignment);
  }

  // This methods scrolls div when new element added
  ScrollOnAddNewElement(elem) {


    $('.set_column').animate({ scrollTop: $('.email_template').height() }, 1000, 'linear');
    setTimeout(() => { elem.focus(); }, 1000);



  }

  // Hide image gallery
  HideImagePopup() {
    this.ShowGallery = false;
    this.ShowOverlay = false;
    this.SelectedImagePath = null;
    this.ImageUpdate = false;
    this.UpdateHeaderImage = false;
    this.BusinessLogo=false;
  }

  // Open image popup
  OpenImagePopup() {
    this.CampaignService.GetGalleryImages().subscribe(res => {
      this.GalleryImages = res.data;
    }, err => {


    });
    this.ShowGallery = true;
    this.ShowOverlay = true;
  }

  // Show selected image
  ShowImage(name, path) {

    if (this.UpdateHeaderImage == true) {
      let id = this.DesignElementID;
      $("#" + id).css('background-image', 'url("'+path+'")');
      this.ImageLink = path;
    } else {
      if (this.ImageUpdate == true) {
        let id = this.DesignElementID;

        $("#" + id).find('img').attr('src', path);
        this.ImageLink = path;

      }
      else if (this.BusinessLogo==true) {
        let id = this.DesignElementID;
        $("#" + id).find('.logo').css('background-image', 'url("'+path+'")');
        
        this.LogoLink = path;                    
      }
      else {
        this.AddNewImage(name, path);
        this.ImageLink = path;
      }

    }

  }
  // Upload New image
  UploadImage() {
    let data = this.SetImage();
    this.SelectedFile = '';
    this.FileName='';
    let _self = this;
    this.UploadService.UploadImage(data).subscribe(res => {
      if (res.status == 200) {
        swal({
          title: "Image uploaded successfully!",
          text: "Image gallery updated!",
          type: "success",

        }).then(function() { _self.HideImagePopup() });
        this.ShowImage(res.data.image_name, res.data.image_path);

      } else {
        swal({
          title: "Image uploaded successfully!",
          text: res.message,
          type: "error",

        })
      }


    }, err => {
      swal({
        title: "Can't upload image!",
        text: err.message,
        type: "error",


      })
    });
  }



  AddNewImage(alt, src) {
    var mainDiv = this.elementRef.nativeElement.querySelector('.email_template');
    this.id = Math.floor((Math.random() * 1000) + 1);
    let ImageString: string = '<div class="box_main" style="padding:0 20px;"><div id="image' + this.id + '" class="editable" style="text-align: center;"><a href="#"><img src="#" style="max-width: 100%; margin: 20px auto;display: block;"></a></div></div>';
    $(".email_template .box_main:nth-last-child(2)").before(ImageString);
    var elem = this.elementRef.nativeElement.querySelector('#image' + this.id);
    $(elem).find('img').attr('src', src);
    $(elem).find('img').attr('alt', alt);
     this.DisableRedirection();
    this.EditToggle();
    this.render.setElementClass(elem, 'Edit_box', true);
    this.render.listen(elem, 'click', (e) => {
      e.stopPropagation();
      this.EditToggle();
      this.DesignModeOn(e);
      this.GetStyle(e);
      
      
      var ClosestEle = $(e.target).closest('.editable');
      ClosestEle.addClass('Edit_box');
      ClosestEle.after(this.DelIconString);
      var delNode = this.elementRef.nativeElement.querySelector('.del_icon');
      this.render.listen(delNode, 'click', (e) => {
        this.DeleteNode();
      });
    });

    this.ScrollOnAddNewElement(elem);
    this.id++;
  }

  // Set selected image from gallery
  SetImage() {
    let fd = new FormData();
    fd.append('gallary_image', this.SelectedFile);
    return fd;
  }

  // Set image from input field
  ImageUpload(event) {

    if (event.target.files.length > 0) {
      this.SelectedFile = event.target.files[0];
      this.FileName=this.SelectedFile.name;
    }
  }

  // Get clicked image path from gallery
  SelectedImage(e) {
    $('.image_gallery li').removeClass('selected');
    $(e.target).parent('li').addClass('selected');
    this.SelectedImagePath = $(e.target).attr('src');


  }
  // Set image from selected image
  SetImageFromGallery() {
    this.ShowImage('image', this.SelectedImagePath);
    this.HideImagePopup();

  }

  // image code
  // Chnage image code
  ChangeImageLink(e) {
    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
    $(element).find('a').attr('href', this.ImageUrl);

  }

  // Create social icons array with urls
  CreateSocialArray()
  {
    this.SocialArray = [
    { name: 'Facebook', path: this.BASE_URL+'uploads/icon_images/facebook.png' },
    { name: 'Twitter', path: this.BASE_URL+'uploads/icon_images/twitter.png' },
    { name: 'Linkedin', path: this.BASE_URL+'uploads/icon_images/linkedin.png' },
    { name: 'Youtube', path: this.BASE_URL+'uploads/icon_images/youtube.png' },
    { name: 'Googleplus', path: this.BASE_URL+'uploads/icon_images/googleplus.png' },
    { name: 'Vimeo', path: this.BASE_URL+'uploads/icon_images/vimeo.png' },
    { name: 'Pinterest', path: this.BASE_URL+'uploads/icon_images/pinterest.png' },
    { name: 'Flickr', path: this.BASE_URL+'uploads/icon_images/flickr.png' },
    { name: 'Rss', path: this.BASE_URL+'uploads/icon_images/rss.png' },
    { name: 'Skype', path: this.BASE_URL+'uploads/icon_images/skype.png' },
    { name: 'Blogger', path: this.BASE_URL+'uploads/icon_images/blogger.png' },
    { name: 'Web', path: this.BASE_URL+'uploads/icon_images/web.png' },

  ];
  }
 
  // Add social Icon  
  AddSocialIcon(name, src) {
    var mainDiv = this.elementRef.nativeElement.querySelector('#socialicons1');
    var iconsList = mainDiv.querySelectorAll('a');

    this.id = Math.floor((Math.random() * 1000) + 1);

    let ImageName: any = name;
    let Newid = ImageName + this.id;

    let IconString: string = '<a href="#" id="' + Newid + '" style="margin-right:10px;  background-color: #7d8b92;  display: inline-block; padding: 10px;" title="Facebook"> <img alt="Facebook" src="' + src + '" style="height: 30px; width:30px;"> </a>';
    $(mainDiv).append(IconString);

    var elem = this.elementRef.nativeElement.querySelector("#" + Newid);
    this.EditToggle();
    this.render.setElementClass(elem, 'EditableIcon', true);
    this.render.listen(elem, 'click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.EditToggle();
      this.DesignModeOn(e);
      this.GetStyle(e);
      this.DisableRedirection();
      this.RemoveSocialIcons(e);
      var ClosestEle = $(e.target).closest('.editable');
      ClosestEle.addClass('Edit_box');

    });

    this.ScrollOnAddNewElement(elem);
    this.id++;


  }
  // Remove social icon
  RemoveSocialIcons(e) {

    var _self = this;
    var elementId = e.target.id;
    if (e.target.id == '') {
      elementId = $(e.target).closest('a').attr('id');

    }
    $('#socialicons1').find('.cross_icon2').remove();
    $("#" + elementId).append("<span class='cross_icon2'><i class='fa fa-times'></i></span>");

    $('.cross_icon2').bind('click', function(e) {
      $(e.target).closest('a').remove();
      _self.DesignModeOff();
      e.preventDefault();
    });


  }

  // Update image flag
  UpdateImage(name, path) {
    this.ImageUpdate = true;
    this.OpenImagePopup();


  }

  // Update Header image flag
  UpdateHeader() {
    this.UpdateHeaderImage = true;
    this.OpenImagePopup();
  }

  
  // Update Logo image flag
  UpdateLogo()
  {
    this.BusinessLogo = true;
    this.OpenImagePopup();   
  }

  // Header style
  // Get header type to backgroud image or color
  ChangeHeaderStyle(value:string)
  {
      this.HeaderType=value;

      switch (this.HeaderType) {
        case "color":
          {
            let elem=this.elementRef.nativeElement.querySelector('#header1');
            this.SwitchToColor(elem);
            break;  
          }
          case "image":
          {
            let elem=this.elementRef.nativeElement.querySelector('#header1');
            this.SwitchToImage(elem);
            break;  
          }
          
        
        default:
        {
          break;  
        }
        
      }
  }


  // Switch color mode to image and vise versa
  SwitchToColor(elem)
  {
     $(elem).css('background-image','').css('background-color',this.HeaderColor);   
     
  }

  SwitchToImage(elem)
  {
      $(elem).css('background-color','').css('background-image','url("'+this.ImageLink+'")');


  }


  // Change Header color
  
  SetHeaderColor($event)
  {
      var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
      
      $(element).css("background-color",this.HeaderColor);
      $(element).find('.logo').css('background-color',this.HeaderColor);
  }

  // Update Business name
  
  ChangeBusinessName(e) {
    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
    $(element).find('p').html(this.BusinessName);
  }

  // set header logo and business name options
  ChangeLogoOptions(e)
  {
      this.LogoOptions=e.target.value;
      
      if(this.LogoOptions=='LOGO')
      {
        var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
        $(element).find('p').css('visibility','hidden');
        $(element).find('.logo').css('visibility','visible');
      }
      else if(this.LogoOptions=='MERCHANT_NAME')
      {
        var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
        $(element).find('.logo').css('visibility','hidden');
        $(element).find('p').css('visibility','visible');
      }
      else if(this.LogoOptions=='BOTH')
      {
        var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
        $(element).find('.logo').css('visibility','visible');
        $(element).find('p').css('visibility','visible');
      }
      else if(this.LogoOptions=='NONE')
      {
        var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
        $(element).find('.logo').css('visibility','hidden');
        $(element).find('p').css('visibility','hidden');
      }
  }
  // Change business name color
  BusinessNameColor:any='#fff';
  SetBusinessNameColor(e)
  {
    var element = this.elementRef.nativeElement.querySelector('#' + this.DesignElementID);
    $(element).find('p').css('color',this.BusinessNameColor);
  }
}
