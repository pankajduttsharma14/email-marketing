import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { APIEndpoint } from '../appsettings/BaseUrl';


@Injectable()
export class CampaignService {

   private BASE_URL: string;
  _headers: any;
  constructor(private http: HttpClient) {
    this.BASE_URL = APIEndpoint.BaseUrl;
   	this._headers= new HttpHeaders({
    'auth-key': 'SQE-EM@2018',
    'end-client': 'SQE-EM',
    'Content-Type': 'application/json'
  })
  }

  GetAllCampaignList():Observable < any >
  {
  	const url: string = this.BASE_URL + 'all-campaign';
    return this.http.post(url, {user_id:localStorage.getItem('user_id')}, { headers: this._headers }).map(res=>res).catch((e:any)=>{
      return Observable.throw(e);
    });
  }

  CreateCampaign(data):Observable < any >
  {
    const url: string = this.BASE_URL + 'create-campaign';
    return this.http.post(url,data, { headers: this._headers }).map(res=>res).catch((e:any)=>{
      return Observable.throw(e);
    }); 
  }

  DeleteCampaign(data)
  {
    const url: string = this.BASE_URL + 'delete-campaign';
    return this.http.post(url,data, { headers: this._headers }).map(res=>res).catch((e:any)=>{
      return Observable.throw(e);
    }); 
  }
  UpdateCampaign(data)
  {
    const url: string = this.BASE_URL + 'edit-campaign';
    return this.http.post(url,data, { headers: this._headers }).map(res=>res).catch((e:any)=>{
      return Observable.throw(e);
    }); 
  }

  GetCampaignById(id)
  {
    let data={"user_id":localStorage.getItem('user_id'),"campaign_id":id};
    const url: string = this.BASE_URL + 'view-campaign';
    return this.http.post(url,data, { headers: this._headers }).map(res=>res).catch((e:any)=>{
      return Observable.throw(e);
    }); 
  }
  GetReports()
  {
    
    const url: string = this.BASE_URL + 'campaign-report';
    return this.http.post(url,{"user_id":localStorage.getItem('user_id')},{ headers: this._headers }).map(res=>res).catch((e:any)=>{
      return Observable.throw(e);
    }); 
  }

  GetGalleryImages()
  {
     const url: string = this.BASE_URL + 'get-all-image';
     return this.http.post(url,{"image_type":"gallery"},{ headers: this._headers }).map(res=>res).catch((e:any)=>{
      return Observable.throw(e);
    }); 
  }

  ViewCampaign(data):Observable<any>
  {
    const url: string = this.BASE_URL + 'view-campaign';
     return this.http.post(url,data,{ headers: this._headers }).map(res=>res).catch((e:any)=>{
      return Observable.throw(e);
    }); 
  }
  //  UpdateCampaign(data):Observable<any>
  // {
  //   const url: string = this.BASE_URL + 'view-campaign';
  //    return this.http.post(url,data,{ headers: this._headers }).map(res=>res).catch((e:any)=>{
  //     return Observable.throw(e);
  //   }); 
  // }

  SendEmail(data)
  {
    const url: string = this.BASE_URL + 'send-campaign';
     return this.http.post(url,data,{ headers: this._headers }).map(res=>res).catch((e:any)=>{
      return Observable.throw(e);
    }); 
  }


}
