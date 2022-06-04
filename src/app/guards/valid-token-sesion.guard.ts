import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidTokenSesionGuard implements CanActivate {
  canActivate(): boolean {
      let token = localStorage.getItem('token');
      if(token) {
        return true;
      }else{
        return false;
      }
  }
  
}
