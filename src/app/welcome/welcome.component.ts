import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../usuario.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  id: number;
  usuario: string;

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute) { }

  ngOnInit() {
    let user;
    this.route.params.subscribe(
      (params: Params) => {
        this.usuario = params['username'];
      }
    );

    console.log(this.usuario);
  }

}
