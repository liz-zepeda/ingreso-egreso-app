import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';
import { Usuario } from '../modelos/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(
        private _angularFireAuth: AngularFireAuth, 
        private _firestore: AngularFirestore) { }

  initAuthUser() {
    this._angularFireAuth.authState.subscribe(fbUser => {
      console.log(fbUser);
      console.log(fbUser?.email);
      console.log(fbUser?.uid);
    })
  }

  crearUsuario(nombre:string, email:string, password:string)  {
   
    return this._angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then( ({ user }) => {
        const newUser = new Usuario( user.uid, nombre, email );

        return this._firestore.doc(`${ user.uid }/usuario`).set({ ...newUser });
         
      });
  }

  loginUsuario(email:string, password:string) {
    return this._angularFireAuth.signInWithEmailAndPassword(email, password);

  }

  logout() {
    return this._angularFireAuth.signOut();
  }

  isAuth() {
    return this._angularFireAuth.authState.pipe(
      map(fbUser => fbUser != null)
    )
  }
}
