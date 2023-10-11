import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from 'src/app/services/authenticator.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  authLoggedUser: boolean = false;

  constructor(private authenticator: AuthenticatorService, private routes: Router) {}

  ngOnInit(): void {
    this.authenticator.showButton.subscribe(
      authLogged => this.authLoggedUser = authLogged
    )
    }

  logout(){
    this.authenticator.logOut();
    console.log(this.authenticator.logOut())
    this.routes.navigate(['/home']);
  }
}

