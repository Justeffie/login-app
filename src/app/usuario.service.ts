import {Usuario} from "./shared/usuario.model";
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Injectable} from "@angular/core";
import {map, tap} from "rxjs/internal/operators";
import {Subject} from "rxjs/index";

@Injectable({providedIn: 'root'})
export class UsuarioService {
  usuarios: Usuario[] = [];
  usuariosChanged = new Subject<Usuario[]>()

  constructor(private http: HttpClient) {}

  createUser(usuario: Usuario) {
    this.http.post(
      'https://login-app-503a6.firebaseio.com/usuarios.json',
    usuario).subscribe( responseData => {
      console.log(responseData);
    }, error => {
      console.log(error.message);
    });
  }

  getUser(id: number) {
    let usuarios = this.getUsers().slice();

    return usuarios[id];
  }

  getUsers() {
    this.fetchUsers().subscribe(users => {
      this.usuarios.push(...users);
    });
    return this.usuarios;

  }

  private fetchUsers() {
    return this.http.get<{[key: string]: {username: string, password: string, pass: string, id?: string}}>('https://login-app-503a6.firebaseio.com/usuarios.json')
      .pipe(map(response => {
        const usersArray: {username: string, password: string, pass: string, id?: string}[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            usersArray.push({...response[key], id: key});
          }
        }
        return usersArray;
      }))
  }
}
