import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EncryptionService } from '../../services/encryption.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [EncryptionService]

})
export class LoginComponent implements OnInit, AfterViewInit {
  LoginForm: FormGroup;
  constructor(public router: Router,
    private AuthService: AuthService,
    private EncryptionService: EncryptionService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {

    this.LoginFormInit();
    
    var status = this.EncryptionService.DecryptText(localStorage.getItem('loginStatus'));



    if (status == "LoggedIn1") {
      this.router.navigate(['/campaign']);
      return false;
    }

    return true;
  
}

ngAfterViewInit() {
  $(function() {
    $(".preloader").fadeOut();
  });
  $(function() {
    ( < any > $('[data-toggle="tooltip"]')).tooltip()
  });
  $('#to-recover').on("click", function() {
    $("#loginform").slideUp();
    $("#recoverform").fadeIn();
  });
}



UserData: any = [];
ErrorMsg: boolean = false;

// Login authentication
LoginAuth(formData) {
  
  let data = {
    'user_email': formData.value.user_email,
    'password': formData.value.password,
    'role_id': 1
  };

  this.LoginFormInit();
  this.AuthService.LoginAuth(data).subscribe(res => {
    if (res.status == 200) {


      localStorage.setItem('loginStatus', this.EncryptionService.EncryptText('LoggedIn1'));
      localStorage.setItem('user_id', res.data.user_id);
      // localStorage.setItem('user_name', this.EncryptionService.EncryptText(res.employeeData.user_name));
      this.router.navigate(['/campaign']);


    } else {
      this.ErrorMsg = true;
      setTimeout(() => { this.ErrorMsg = false; }, 3000);


    }
  }, err => {
    this.ErrorMsg = true;
    setTimeout(() => { this.ErrorMsg = false; }, 3000);


  });
}




// Set Login From

LoginFormInit() {
  this.LoginForm = this.fb.group({
    user_email: ['', Validators.compose([Validators.required])],
    password: ['', Validators.compose([Validators.required])],
  });
}

}
