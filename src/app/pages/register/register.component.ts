import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formsRegister!: FormGroup;

  customPasswordErrors = {
    uppercaseRequired: 'A senha deve conter pelo menos uma letra maiúscula.',
    symbolRequired: 'A senha deve conter pelo menos um símbolo.'
  }

  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formsRegister = this.formBuilder.group(
      {
        name: ['', Validators.compose([
          Validators.required
        ])],
        email: ['', Validators.compose([
          Validators.email,
          Validators.required
        ])],
        password: ['', Validators.compose([
          Validators.required,
          this.passwordValidator
        ])],
        confirmPassword: ['', Validators.compose([
          Validators.required
        ])]
      }, {
        validator: this.passwordMatchValidator('password', 'confirmPassword')
      })
  }

  criarUsuario() {
    if (this.formsRegister.valid) {
      const user: User = {
        name: this.formsRegister.value.name,
        email: this.formsRegister.value.email,
        password: this.formsRegister.value.password,
        createdAt: new Date(),
      };
      this.service.criar(user).subscribe(() => {
        this.router.navigate(['/login'])
      })
    }
  }

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;

    // Verifique se a senha contém pelo menos uma letra maiúscula
    if (!/[A-Z]/.test(password)) {
      return { 'uppercaseRequired': true };
    }

    // Verifique se a senha contém pelo menos um símbolo (caractere especial)
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
      return { 'symbolRequired': true };
    }

    // Se a senha passar em ambas as verificações, retorne nulo (válido)
    return null;
  }

  passwordMatchValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {

      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }

    }
  }

  habilitarBotao() {
    if (this.formsRegister.valid) {
      return 'button-register';
    }

    return 'button-register-disabled'
  }

}
