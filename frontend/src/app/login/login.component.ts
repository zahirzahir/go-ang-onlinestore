import { Component, Injectable, OnInit, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable({providedIn: 'root'})
export class LoginComponent {
  email:any;
  password:any;

  constructor( private authService: AuthService, private router: Router,
     private form:FormBuilder) {}
   loginform=this.form.group({
    email:['',Validators.email],
    password:['',Validators.required]
   })
   //cook= inject(CookieService)
  login() {
    this.email=this.loginform.controls["email"].value;
    this.password=this.loginform.controls["password"].value;

    this.authService.login(this.email,this.password)
      .subscribe(res => {

         //this.cook.set("access_token",res.token)
         localStorage.setItem("access_token",res.token)
         // if(this.cookieservice.get("access_token") !=null){
          console.log(res.token)
          this.router.navigate(['/dashboard']);
          //}
      } );

  }


  get f() { return this.loginform.controls; }

}
