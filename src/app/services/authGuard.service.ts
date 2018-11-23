import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {EncryptionService} from './encryption.service';
@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(public router: Router,
  	private EncryptionService:EncryptionService
  	) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {

  		
    let status = this.EncryptionService.DecryptText(localStorage.getItem('loginStatus'));

    if (status != "LoggedIn1") {

      this.router.navigate(['/authentication/login']);
      return false;
    } 
    return true;
    // return true;
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {

  	
  	
    let status = this.EncryptionService.DecryptText(localStorage.getItem('loginStatus'));

    if (status != "LoggedIn1") {

      this.router.navigate(['/authentication/login']);
      return false;
    } 
    return true;
    
  }


}
