import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoModel } from 'src/app/modelos/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresoEgreso: IngresoEgresoModel[];
  ingresoEgresoSubs: Subscription;

  constructor(  private store: Store<AppState>,
                private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.ingresoEgresoSubs = this.store.select('ingresosEgresos')
      .subscribe(({items}) => this.ingresoEgreso = items);
  }

  ngOnDestroy() {
    this.ingresoEgresoSubs.unsubscribe();
  }

  borrar(uidItem:string) {
    // console.log('borrar',uidItem);
    this.ingresoEgresoService.borrarIngresoEgreso(uidItem)
      .then(()   => Swal.fire('Borrado!', 'Item borrado!', 'success' ) )
      .catch(err => Swal.fire('Borrado!', err.message , 'error'))

  }

}
