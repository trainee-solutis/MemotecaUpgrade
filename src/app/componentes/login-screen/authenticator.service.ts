import { EventEmitter, Injectable } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {
  private loggedUser: User | null = null;

  showButton = new EventEmitter<boolean>();
  constructor() { }

  login(user: User): boolean{
    if(user.email === 'admin@email.com' && user.password === 'admin'){
      this.loggedUser = {
        email:user.email,
        password:user.password
      }
      this.showButton.emit(false);
      return true;
    }
    this.showButton.emit(true);
    return false;
  }

  isLogged(): boolean{
    return !!this.loggedUser;
  }

  logOut(){
    this.loggedUser = null
  }

}
