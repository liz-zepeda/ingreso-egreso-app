import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private _angularFireAuth: AngularFireAuth) { }

  crearUsuario(nombre:string, email:string, password:string)  {
    return this._angularFireAuth.createUserWithEmailAndPassword(email, password);
    // console.log({nombre, email, password})
  }

  loginUsuario(email:string, password:string) {
    return this._angularFireAuth.signInWithEmailAndPassword(email, password);

  }

  logout() {
    return this._angularFireAuth.signOut();
  }
}
