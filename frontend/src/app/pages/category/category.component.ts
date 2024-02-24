import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  dtOptions:any={}
  form= inject(FormBuilder)

    catform = this.form.group({
    catname:['',Validators.required]
  })

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

  }
  get f() { return this.catform.controls; }
}
