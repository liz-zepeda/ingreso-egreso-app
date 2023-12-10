import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgChartsModule } from 'ng2-charts';

import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { OrdenIngresosPipe } from '../pipes/orden-ingresos.pipe';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';



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
    RouterModule,
    DashboardRoutesModule
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
