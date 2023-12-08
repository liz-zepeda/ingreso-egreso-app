import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoModel } from 'src/app/modelos/ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresosEgresosSubs: Subscription;

  ingresosEgresosItems: IngresoEgresoModel[];

  ingresos : number = 0;
  egresos  : number = 0;

  ingresosTotal: number = 0;
  egresosTotal : number = 0;

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.ingresosEgresosSubs = this.store.select('ingresosEgresos')
      .subscribe(({items}) => {
        // console.log('estadistica', items);
        this.generarEstadistica(items);
       
        })
  }

  generarEstadistica(items: IngresoEgresoModel[]) {

    // this.ingresosEgresosItems = items;

    items.filter(item => item.tipo === 'ingreso')
      .map(({ monto }) => {
         this.ingresosTotal += monto;
         this.ingresos ++;
        });

    items.filter(item => item.tipo === 'egreso')
      .map(({ monto }) => {
          this.egresosTotal += monto;
          this.egresos ++;
        });
  }

}
