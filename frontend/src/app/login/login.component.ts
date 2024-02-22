import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:any;
  password:any;

  constructor(private authService: AuthService, private router: Router,
     private form:FormBuilder) {}
   loginform=this.form.group({
    email:['',Validators.email],
    password:['',Validators.required]
   })
  login() {
    this.email=this.loginform.controls["email"].value;
    this.password=this.loginform.controls["password"].value;

    this.authService.login(this.email,this.password)
      .subscribe(res => {
          localStorage.setItem("access_token",res.token)
          if(localStorage.getItem("access_token") !=null){
          console.log(res.token)
          this.router.navigate(['/dashboard']);
          }
      } );

  }
  get f() { return this.loginform.controls; }

}
