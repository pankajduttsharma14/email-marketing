import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { APIEndpoint } from '../appsettings/BaseUrl';

@Injectable()
export class UploadService {

   private BASE_URL: string;
  _headers: any;
  constructor(private http: HttpClient) {
    this.BASE_URL = APIEndpoint.BaseUrl;
   	this._headers= new HttpHeaders({
    'auth-key': 'SQE-EM@2018',
    'end-client': 'SQE-EM',
    'enctype': 'multipart/form-data'
  })
  }


   UploadImage(file):Observable < any >
  {
  	const url: string = this.BASE_URL + 'upload-gallery-image';
    return this.http.post(url,file, { headers: this._headers }).map(res=>res).catch((e:any)=>{
      return Observable.throw(e);
    });
  }

}
