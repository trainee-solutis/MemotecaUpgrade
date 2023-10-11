import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatorService } from '../../services/authenticator.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  formsLogin!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authenticatorService: AuthenticatorService
  ) { }

  ngOnInit(): void {
    this.formsLogin = this.formBuilder.group(
      {
        email:['', Validators.compose([
          Validators.email,
          Validators.required
        ])],
        password:['', Validators.required]
      })
  }

  validator(): boolean{
    if(this.formsLogin.valid){
      return true;
    }else{
      alert("Preenchar todos os campos corretamente!")
      return false;
    }
  }

  autenticator(){
    if(this.validator()){
      const email = this.formsLogin.get('email')?.value;
      const password = this.formsLogin.get('password')?.value;

      this.userService.buscarPorEmail(email).subscribe(
        (users) => {
          if (users.length > 0) {
            const user = users.find((user) => user.email === email);
            if (user) {

          } else {
            console.log("Usuário não encontrado");
          }
          }
        }
      )
    }
  }



}
