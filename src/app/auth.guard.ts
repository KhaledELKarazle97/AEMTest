import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private r:Router){
  }
  fetchedToken:any;
  checkToken(token){
    this.fetchedToken = token;
    sessionStorage.setItem('token',this.fetchedToken);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.fetchedToken){
        return true;
      }else{
        this.r.navigateByUrl('/login');
      }
  }

  
}
