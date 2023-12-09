import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { OrdenIngresosPipe } from '../pipes/orden-ingresos.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DashboardComponent,
    OrdenIngresosPipe,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    DashboardComponent,
    OrdenIngresosPipe,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent
  ]
})
export class IngresoEgresoModule { }
