import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-esqueceu-senha',
  templateUrl: './esqueceu-senha.component.html',
  styleUrls: ['./esqueceu-senha.component.css']
})
export class EsqueceuSenhaComponent implements OnInit {

  formsLogin!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.formsLogin = this.formBuilder.group(
      {
        email:['', Validators.compose([
          Validators.email,
          Validators.required
        ])],
      })
  }

}
