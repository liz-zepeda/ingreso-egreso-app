import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription, filter } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as IngresoEgresoAccion from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  ingresoEgresoSubs: Subscription;
  userSubs: Subscription;

  constructor(private store: Store<AppState>, private ingresosEgresosService: IngresoEgresoService) { }

  ngOnInit() {
    this.userSubs = this.store.select('auth')
      .pipe(
        filter(( {user} ) => user != null)
      )
      .subscribe(( {user} ) => {
        // console.log('user: ',user);

        this.ingresoEgresoSubs = this.ingresosEgresosService.initIngresosEgresosListener$(user.uid)
          .subscribe((ingresosEgresosFB: any[]) => {
            // console.log('dashboard:',ingresosEgresosFB);
            this.store.dispatch(IngresoEgresoAccion.setItem({items: ingresosEgresosFB}))
          })
      });

      

  }

  ngOnDestroy(): void {
      this.ingresoEgresoSubs.unsubscribe();
      this.userSubs.unsubscribe();
  }

}
