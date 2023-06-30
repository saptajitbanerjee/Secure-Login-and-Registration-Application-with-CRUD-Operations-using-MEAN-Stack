import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { NgForm} from '@angular/forms';
//import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component {
  form={username:"",password:"",mobile_no:"",email_addr:"",repeat_password:""}
  /*constructor(private router:Router){}
  register()
  {
    this.router.navigate(['/login']);
  }*/
  constructor(private http:HttpClient,private router:Router){}
  onSubmit()
  {
    const headers = new HttpHeaders({'Content-type': 'application/json'});

    //const reqObject = {
    //  username: this.form.username,
    //  password: this.form.password
    //};

    let bodyData = {
      "username" : this.form.username,
      "mobile_no":this.form.mobile_no,
      "email_addr":this.form.email_addr,
      "password" : this.form.password,
    };
    this.http.post("http://localhost:8086/user/create",bodyData,{headers:headers,responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        //this.authSevice.setLocalStorage(resultData)
        alert("Registered Successfully");
        this.router.navigate(['/login']);
        //this.form.username = '';
        //this.form.password = '';
    });
  }
  onReset(form:NgForm):void{
    form.reset()
  }
}
