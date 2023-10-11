import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {
  private loggedUser: boolean | null = null;

  showButton = new EventEmitter<boolean>();
  constructor(private service: UserService) { }

  login(email: String, password: String): boolean{
    return false;
  }

  isLogged(): boolean{
    return !!this.loggedUser;
  }

  logOut(){
    this.loggedUser = null
  }

}
