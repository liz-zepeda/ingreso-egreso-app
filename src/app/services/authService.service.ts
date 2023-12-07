import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription, map } from 'rxjs';

import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as authAction from '../auth/auth.actionts';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Usuario } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription$: Subscription;
  private _usuario: Usuario;

  get usuario () {
    return { ...this._usuario };
  }

constructor(
        private _angularFireAuth: AngularFireAuth, 
        private _firestore: AngularFirestore,
        private store: Store<AppState>) { }

  initAuthUser() {
    this._angularFireAuth.authState.subscribe(fbUser => {
      // console.log(fbUser);

      if (fbUser) {
        this.userSubscription$ = this._firestore.doc(`${fbUser.uid}/usuario`).valueChanges()
          .subscribe(firestoreUser => {
            // console.log(firestoreUser);
            // const tempUser = new Usuario( 'aldf', 'sldf', 'sdf@fsfd.com');

            const user = Usuario.fromFirebase( firestoreUser );

            this._usuario = user;
            this.store.dispatch(authAction.setUser({ user }))
          })

      } else {
        this._usuario = null;
        this.userSubscription$.unsubscribe();
        this.store.dispatch(authAction.unsetUser());
      }

    });


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
