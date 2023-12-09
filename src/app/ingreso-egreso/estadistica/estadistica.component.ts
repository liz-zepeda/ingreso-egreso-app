import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoModel } from 'src/app/modelos/ingreso-egreso.model';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresosEgresosSubs: Subscription;

  ingresos : number = 0;
  egresos  : number = 0;

  ingresosTotal: number = 0;
  egresosTotal : number = 0;

  // Grafica de dona
  public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos' ];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data:[] }],
  };

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.ingresosEgresosSubs = this.store.select('ingresosEgresos')
      .subscribe(({items}) => {
        // console.log('estadistica', items);
        this.generarEstadistica(items);
       
        })
  }

  generarEstadistica(items: IngresoEgresoModel[]) {

    this.ingresosTotal = 0;
    this.ingresos = 0;
    this.egresos = 0;
    this.egresosTotal = 0;

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

    this.doughnutChartData.datasets = [{ data:[ this.ingresosTotal, this.egresosTotal] }];
  }

}
