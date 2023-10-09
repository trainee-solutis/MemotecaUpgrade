import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Injectable } from '@angular/core';
import { AuthenticatorService } from "../../services/authenticator.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class GuardRoutes implements CanActivate{
  constructor(
    private authenticator: AuthenticatorService,
    private router:Router
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.authenticator.isLogged()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
