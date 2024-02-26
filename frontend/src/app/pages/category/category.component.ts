import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
// Injections
  form= inject(FormBuilder)
  router=inject(Router)
  categoryService=inject(CategoryService)

// Create form
  catform = this.form.group({
    ID:[''],
    categoryName:['',Validators.required]
  })
  // All variables
  dtOptions:any={}
  formMode:boolean=true;
  category: Category[]=[];

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.getCategory()
  }
// Get all Function
getCategory(){
this.categoryService.getCategory().subscribe(
  (res:Category[])=>{
    this.category=res;
  })
}
// Create Function
createCategory(){
  this.categoryService.createCategory(this.catform.value).subscribe(
    (next:any) => {
      Swal.fire('Thank you...', 'Category Created succesfully!', 'success')

      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
      });
      $('#category').modal('hide');
      })
}
// Edit Function
editCategory(id:number){
  this.formMode=false;
  this.categoryService.getCategoryByid(id).subscribe(
    x=>{
      this.catform.patchValue(x)
    })
}
// Update Function
updateCategory(){
  let id:any=this.catform.controls["ID"].value;
  this.categoryService.updateCategory(this.catform.value,id).subscribe(
    (next:any) => {
      Swal.fire('Thank you...', 'Category Updated succesfully!', 'success')
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
      });
      $('#category').modal('hide');
      })
}
//Delete Function
deleteCategory(id:number){
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
    this.categoryService.deleteCategory(id).subscribe(
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
//Validate Function
get f() {
  return this.catform.controls;
}

}
