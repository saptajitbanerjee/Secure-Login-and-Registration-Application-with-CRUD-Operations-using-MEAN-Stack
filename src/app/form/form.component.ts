import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm} from '@angular/forms';
//import { AuthService } from '../services/auth.service';
//import { Observable } from 'rxjs'
import { AuthserviceService } from '../authservice.service';
//import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})

export class FormComponent {
  httpOptions:any = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

username:string="";
password:string="";
form={username:"",password:"",captcha:""}
access:boolean=true

//regex:string = "/^[A-Za-z]\\w{4,14}$/"
constructor(private router:Router,private http:HttpClient,private authService:AuthserviceService){}
//userForm = new FormGroup({})
onSubmit():void{
  if(this.access){
  let bodyData = {
    username: this.form.username,
    password: this.form.password,
  };
  //console.log("Username",this.username)
      this.http.post("http://localhost:8086/user/login", bodyData,this.httpOptions).subscribe(  (resultData: any) => {
      //console.log(resultData);
      if (resultData.status)
      {
        console.log("Login",resultData)
        this.authService._isLoggedIn$.next(true)
        localStorage.setItem("token",resultData.token)
        //console.log(resultData.token)
        //this.authService.setLocalStorage(resultData)
        alert("Login Successful")
        window.localStorage.setItem('login-event', "logged in")
        this.router.navigate(['/content']);
           //this.router.navigate(['/content']);
           //window.open("https://angular.io/","_self")
           //console.log("Test",resultData)
          //  this.form.username=""rs
          //  this.form.password=""

      }
      else
       {
        alert("Incorrect Username or Password");
        console.log("Error login");
      }
    });
  }
}

onReset(form:NgForm):void{
  form.reset()
}
}
