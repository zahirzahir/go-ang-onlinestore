import { Component, Inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  form=Inject(FormBuilder)

    catform =this.form.group({
    catname:['',Validators.required]
  })

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

  }
  get f() { return this.catform.controls; }
}
