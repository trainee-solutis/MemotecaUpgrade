import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import * as jose from 'jose';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatorService {
  private secret = new TextEncoder().encode(
    'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2'
  );

  private loggedUser: boolean  = true;

  private currentUser: User | null = null;

  showButton = new EventEmitter<boolean>();

  constructor(private userService: UserService) {}

  async login(email: string, password: string): Promise<boolean> {
    try {
      const users = await this.userService
        .buscarLogin(email, password)
        .toPromise();
      if (users && users.length > 0) {
        const user = users.find(
          (user) => user.email === email && user.password === password
        );
        if (user) {
          this.loggedUser = true;
          this.showButton.emit(false);

          if (user.id) {
            const token = await new jose.SignJWT({
              'memoteca:mural:read': true,
            })
              .setProtectedHeader({ alg: 'HS256' })
              .setSubject(user.id.toString())
              .setIssuedAt()
              .setExpirationTime('1h')
              .sign(this.secret);

            localStorage.setItem('token', token);
          }
          return true;
        } else {
          this.loggedUser = false;
          this.showButton.emit(true);
          return false;
        }
      } else {
        this.loggedUser = false;
        this.showButton.emit(true);
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  isLogged(): boolean {
    return !!this.loggedUser;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  async validateSession(): Promise<boolean> {
    const token = localStorage.getItem('token');

    if (!token) {
      this.logOut();
      return false;
    }

    try {
      const {payload} = await jose.jwtVerify(token, this.secret);

      if (!payload || !payload.sub) {
        this.logOut();
        return false;
      }

      const user = await this.userService.buscarPorId(parseInt(payload.sub)).toPromise()

      if (!user) {
        this.logOut();
        return false;
      }

      this.currentUser = user;

      this.loggedUser = true;
      this.showButton.emit(true);
      return true;
    } catch (error) {
      this.logOut();
      return false;
    }
  }

  logOut() {
    localStorage.removeItem('token');
    this.loggedUser = false
    this.showButton.emit(false);
  }
}
