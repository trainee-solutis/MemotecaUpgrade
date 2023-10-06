import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '../login-screen/authenticator.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  showButton: boolean = true;
  constructor(private authenticator: AuthenticatorService) { }

  ngOnInit(): void {
    this.authenticator.showButton.subscribe(
      showBt => this.showButton = showBt
    )
  }

}
