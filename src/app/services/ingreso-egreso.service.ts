import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { IngresoEgresoModel } from '../modelos/ingreso-egreso.model';
import { AuthService } from './authService.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

constructor( private firestore: AngularFirestore, private authService: AuthService) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgresoModel) {
    const uid = this.authService.usuario.uid;

    return this.firestore.doc(`${ uid }/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso })
      // .then((resp) => console.log('exito', resp))
      // .catch(err => console.warn(err))

  }

  initIngresosEgresosListener$( uid: string) {
    this.firestore.collection(`${ uid }/ingresos-egresos/items/`)
      .snapshotChanges()
      .pipe(
        map(snapshots => snapshots.map(snapshot => ({ 
              uid: snapshot.payload.doc.id,
              ...snapshot.payload.doc.data() as {}
            })
          )
        )
      )
      .subscribe( algo => console.log('initIngresosEgresosListener: ',algo) )
  }
  
}
