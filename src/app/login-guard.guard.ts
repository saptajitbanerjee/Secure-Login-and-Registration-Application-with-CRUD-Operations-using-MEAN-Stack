import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthserviceService } from './authservice.service';
import { tap } from 'rxjs';
//import { tap } from 'rxjs';


export const canActivate_login: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {

  const authService = inject(AuthserviceService);
  const router = inject(Router);
  const token = localStorage.getItem('token');
  //console.log("==> "+authService.isLoggedIn$+" "+authService._isLoggedIn$)
  //return authService._isLoggedIn$.pipe(
    //tap((isLoggedIn:any)=>{if(!isLoggedIn){router.navigate(['content'])}})
  //);
  if(token==null)
  return true;
  else if(authService.isValid && authService.isLoggedIn$) 
  {
    //console.log("???"+token);
    router.navigate(['content']);
    return false;
  }
  else
  {
    return false;
  }
  /*return authService._isLoggedIn$.pipe(
    tap((isLoggedIn:any)=>{if(isLoggedIn){router.navigate(['content'])}})
  );*/
  return true;
};