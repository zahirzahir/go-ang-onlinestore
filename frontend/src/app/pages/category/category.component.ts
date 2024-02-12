import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private form: FormBuilder){}

  catform =this.form.group({
    catname:['',Validators.required]
  })
  dtOptions: any = {};
  dtTrigger: Subject<any>=new Subject<any>()

  ngOnInit(): void {

  }
  get f() { return this.catform.controls; }
}
