import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './authService.service';
import { IngresoEgreso } from '../modelos/ingreso-egreso.model';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

constructor( private firestore: AngularFirestore, private authService: AuthService) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.usuario.uid;

    return this.firestore.doc(`${ uid }/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso })
      // .then((resp) => console.log('exito', resp))
      // .catch(err => console.warn(err))

    }
  
}
