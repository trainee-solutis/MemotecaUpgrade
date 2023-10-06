import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatorService } from './authenticator.service';
import { User } from './user';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  formsLogin!: FormGroup;

  user: User ={
    email: '',
    password: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
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

      const user: User = {
        email: email,
        password: password
      };

      if(this.authenticatorService.login(user)){
        console.log(this.formsLogin);
        alert("Login efetuado com sucesso.")
        this.router.navigate(['/listarPensamento'])
      }else{
        alert("Email ou senha incorretos!")
      }
    }
  }



}
