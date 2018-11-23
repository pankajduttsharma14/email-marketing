import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { APIEndpoint } from '../appsettings/BaseUrl';


@Injectable()
export class AuthService {
  
  private BASE_URL: string;
  _headers:any;
  constructor(private http:HttpClient, private _router:Router) {
    this.BASE_URL = APIEndpoint.BaseUrl;
    this._headers= new HttpHeaders({
    'auth-key': 'SQE-EM@2018',
    'end-client': 'SQE-EM',
    'Content-Type': 'application/json'
  })



  }

  LoginAuth(data):Observable<any>{
    
    const url = this.BASE_URL + 'login';
    return this.http.post(url,data,{headers:this._headers}).map(res=>res);
  }

  LogOut()
  {
  	localStorage.clear();
    this._router.navigate(['authentication/login']);
  }

}
