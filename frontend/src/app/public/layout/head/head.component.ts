import { Component, inject } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent {
  catservice=inject(CategoryService)
  category:Category[]=[];
ngOnInit(){
  this.getCategory()
}
// Get Category Funtion
getCategory(){
    this.catservice.getCategory().subscribe(
      (res:Category[])=>{
        this.category=res;
      }
    )
  }

}
