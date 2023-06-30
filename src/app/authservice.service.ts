import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import decode from 'jwt-decode';
import { Router } from '@angular/router';
//import * as jwt from 'jsonwebtoken';
//import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  username:string="";
  _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  get token(){return localStorage.getItem('token')};
  isValid:boolean=true;
  constructor(private route:Router) { 
    //const token = localStorage.getItem('token');
    try{
    const decodeToken:any = decode(this.token||"");
    const expirationDate = new Date(decodeToken.exp * 1000);
    this.username=decodeToken.username;
    const currentDate = new Date();
    if (currentDate > expirationDate)
      this.isValid = false;
    else
      this.isValid = true;
    }
    catch(err){this.isValid=false}
    //this.isValid=this.jwtHelper.isTokenExpired(this.token)
    if(!(this.token===null||this.token==="undefined"||this.token=="") && this.isValid)
    this._isLoggedIn$.next(true);
    else
    this._isLoggedIn$.next(false);
    this.start();
  }
  

  start(): void {
    window.addEventListener("storage", this.storageEventListener.bind(this));
  }

  storageEventListener(event: StorageEvent) {
    if (event.storageArea == localStorage) {
      if (event?.key && event.key == 'logout-event') {
        //this._isLoggedIn$.next(false);
        this.isValid=false
        this.route.navigate(['login']);
        //console.log("🔥 ~ storageEventListener ~ event", event.newValue)
        //this.logOut() 
      }
      if (event?.key && event.key == 'login-event')
      {
        this._isLoggedIn$.next(true);
        //this.isValid=true
        this.route.navigate(['content']);
      }
    }
  }
  private stop(): void {
    window.removeEventListener("storage", this.storageEventListener.bind(this));
  }

  ngOnDestroy() {
    this.stop()
  } 
}