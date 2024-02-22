import { Component,  inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as bootstrap from "bootstrap";
//import * as $ from 'jquery';
import { CustomValidators } from './CustomValidators';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
router= inject(Router)  
userservice=inject(UserService)
form= inject(FormBuilder)

userform=this.form.group({
  ID:[''],
  firstName:['',Validators.required],
  lastName:['',Validators.required],
  password:['',Validators.required],
  email:['',Validators.email],
  role:['',Validators.required],
//  confirmPassword: ['',Validators.required],
// },{
//   validator:  CustomValidators.mustMatch('password', 'confirmPassword')
})

submitted = false;
id:any=0;
formMode:boolean=true;
dtOptions:any={}
user:User[]=[];

ngOnInit(): void {
this.dtOptions={
pagingType: 'full_numbers',
pageLength: 10,
}
this.getUser()
}

// get all users
getUser(){
this.userservice.getUser().subscribe(
(respon:User[])=>{
this.user=respon;
}
)
}

editUser(id:Number){
this.formMode=false;
this.userservice.getUserById(id).subscribe(
x=>this.userform.patchValue(x)
)
}
// register user
saveUser(){
  
this.userservice.addUser(this.userform.value).subscribe(

(next:any) => {
Swal.fire('Thank you...', 'User Created succesfully!', 'success')

let currentUrl = this.router.url;
this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
this.router.navigate([currentUrl]);
});
$('#user').modal('hide');
})
}

public deleteUser(id:Number){
Swal.fire({
title: 'Are you sure want to remove?',
text: 'You will not be able to recover this file!',
icon: 'warning',
showCancelButton: true,
confirmButtonText: 'Yes, delete it!',
cancelButtonText: 'No, keep it'
}).then((result) => {
if (result.value) {
//
this.userservice.deleteUser(id).subscribe(
(next:any) => {
let currentUrl = this.router.url;
this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
this.router.navigate([currentUrl]);
});
},
(error: HttpErrorResponse) => {
alert(error.message);
}
);
//
Swal.fire(
'Deleted!',
'Your imaginary file has been deleted.',
'success'
)
} else if (result.dismiss === Swal.DismissReason.cancel) {
Swal.fire(
'Cancelled',
'Your imaginary file is safe :)',
'error'
)
}
})
}

updateUser(){
this.id=this.userform.controls["ID"].value
this.userservice.updateUser(this.id,this.userform.value).subscribe(
(next:any) => {
Swal.fire('Thank you...', 'User Updated succesfully!', 'success')
let currentUrl = this.router.url;
this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
this.router.navigate([currentUrl]);
});
$('#useraddModal').modal('hide');
})
}

// form validation controll
get f() { return this.userform.controls; }

}
