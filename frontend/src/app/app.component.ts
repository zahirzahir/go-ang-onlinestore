import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
//   route=inject(Router)
//   loginmode:boolean= false;

//  logmode(){
//     if(this.route.isActive("[/user]",true)){
//      this.loginmode=true;
//     }
//   }

  ngOnInit(): void {
  }
}
