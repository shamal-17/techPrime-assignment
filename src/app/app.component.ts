// import { Component } from '@angular/core';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../app/user.service';
import {Router} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  registerForm: FormGroup;
  submitted = false;
  opened:boolean=true;
  data:[];
  res: ArrayBuffer;


constructor(private formBuilder: FormBuilder, private UserService:UserService, private router:Router){}

// form group for log in
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
    });  
  }

  //  user login

// public login(data):any{
//   console.log("data from user",data);
//   this.UserService.postUser(this.data).subscribe(data => console.log(data), error => console.log(error));
//     this.data = new data();
// }

// get user
// public getUser(data) {
//   this.UserService.getUser(this.data).subscribe((res => {
//     this.res=res;
//     this.data = data;
//   }));
// }

onSubmit(){
  this.opened= !this.opened; 
}
}
