import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthserviceService } from './authservice.service';
import { tap } from 'rxjs';
//import { tap } from 'rxjs';


export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {

  const authService = inject(AuthserviceService);
  const router = inject(Router)
  console.log("==> "+authService.isLoggedIn$+" "+authService._isLoggedIn$)
  return authService._isLoggedIn$.pipe(
    tap((isLoggedIn:any)=>{
      if(!isLoggedIn  || authService.token==null)
      {console.log(authService.isValid);router.navigate(['login']);console.log("|| ==> || "+authService.isValid)}
    })
  );
};

function constructor() {
  throw new Error('Function not implemented.');
}
//export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);