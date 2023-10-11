import { AuthenticatorService } from './../../../services/authenticator.service';
import { Component, OnInit } from '@angular/core';

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
