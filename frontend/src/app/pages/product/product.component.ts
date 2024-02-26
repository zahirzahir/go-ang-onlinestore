import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  // injection
  productService=inject(ProductService)
  categoryService=inject(CategoryService)
  form=inject(FormBuilder)
  router=inject(Router)

  //variables
  products:Product[]=[];
  category:Category[]=[];
  formMode:boolean=true;
  dtOptions:any;
  id:any;

productForm=this.form.group({
  ID:[''],
  productName: ['',Validators.required],
  price:['',Validators.required],
  brand:[''],
  picture:[''],
  description:[''],
  lableNumber:[''],
  categoryId:['',Validators.required],
  quantity:['',Validators.required]
})

ngOnInit():void{
  this.dtOptions = {
    pagingType: 'full_numbers'
  };
  this.getProduct()
  this.getCategory()
}
// get Category
getCategory(){
  this.categoryService.getCategory().subscribe(
   (res)=>{
    this.category=res;
   })
}
//get products function
getProduct(){
  this.productService.getProduct().subscribe(
    (res)=>{
    this.products=res;
    }
  )
}

// Create product function
createProduct(){
  console.log(this.productForm.value)
  this.productService.createProduct(this.productForm.value).subscribe(
    (next:any) => {
      Swal.fire('Thank you...', 'Product Created succesfully!', 'success')

      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
      });
      $('#product').modal('hide');
      })
}
//show edit form
editProduct(id:number){
  this.formMode=false;
  this.productService.getProductByid(id).subscribe(
    x=>{
      this.productForm.patchValue(x)
    })
}

//Update function
updateProduct(){
  console.log(this.productForm.value)
  let id:any= this.productForm.controls["ID"].value;
  this.productService.updateProduct(this.productForm.value,id).subscribe(
    (next:any) => {
      Swal.fire('Thank you...', 'Product Created succesfully!', 'success')

      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
      });
      $('#product').modal('hide');
      })
}

//Delete function
deleteProduct(id:number){
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
    this.productService.deleteProduct(id).subscribe(
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
// validitore function
get f(){
  return this.productForm.controls
}
}
