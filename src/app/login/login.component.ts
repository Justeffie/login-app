import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators, ɵNgNoValidate} from "@angular/forms";
import {UsuarioService} from "../usuario.service";
import {Usuario} from "../shared/usuario.model";
import {Subject} from "rxjs/index";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;


  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.usuarioService.getUsers();
  }

  private initForm() {
    this.formulario = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'pass': new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  checkInputs(inputName: string, event) {
    if (this.formulario.get(inputName).value != event.target.value) {
      this.formulario.get('pass').setErrors( {'passwordNotEqual': true});
    } else {
      this.formulario.get('pass').setErrors(null);
    }
  }

  onSubmit(formulario: NgForm) {
    let username: string = formulario.value.username;
    let password: string = formulario.value.password;
    let pass: string = formulario.value.pass;
    this.usuarioService.createUser(new Usuario(username, password, pass));
    this.router.navigate([username]);
  }
}
