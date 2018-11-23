import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import {EncryptionService} from './encryption.service';


@Injectable()
export class  AnonymousGuardService implements CanActivate{

  constructor(public router: Router, private EncryptionService:EncryptionService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  	console.log("called");
    var status = this.EncryptionService.DecryptText(localStorage.getItem('loginStatus'));
    


  if(status=="LoggedIn1")
  {
    this.router.navigate(['/campaign']);
    return false;
  }
  
    return true;
  }

 
}
