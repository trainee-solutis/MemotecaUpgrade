import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Injectable } from '@angular/core';
import { AuthenticatorService } from "./authenticator.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class GuardRoutes implements CanActivate{

  private whitelist = ['home'];

  constructor(
    private authenticator: AuthenticatorService,
    private router:Router
  ){}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    const url = route.url[0].path
    const validate = await this.authenticator.validateSession();

    if (this.whitelist.includes(url)) return true;

    if (validate) {
      if (url === 'login') {
        this.router.navigate(['/listarPensamento']);
        return false;
      }
      return true;
    } else {
      if (url !== 'login') {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
  }
}
