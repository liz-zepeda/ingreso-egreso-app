import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoModel } from 'src/app/modelos/ingreso-egreso.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresoEgreso: IngresoEgresoModel[];
  ingresoEgresoSubs: Subscription;

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.ingresoEgresoSubs = this.store.select('ingresosEgresos')
      .subscribe(({items}) => this.ingresoEgreso = items);
  }

  ngOnDestroy() {
    this.ingresoEgresoSubs.unsubscribe();
  }

  borrar(uid:string) {
    console.log('borrar',uid);
  }

}
