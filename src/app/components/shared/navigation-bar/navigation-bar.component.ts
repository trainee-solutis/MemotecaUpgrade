import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from 'src/app/services/authenticator.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  authLoggedUser: boolean = false;

  constructor(private authenticator: AuthenticatorService) {this.authLoggedUser = this.authenticator.isLogged(); }

  ngOnInit(): void {
  }

  logout(){
    this.authenticator.logOut();
  }

}
