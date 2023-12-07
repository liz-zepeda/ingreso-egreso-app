import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription, filter } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;

  constructor(private store: Store<AppState>, private ingresosEgresosService: IngresoEgresoService) { }

  ngOnInit() {
    this.userSubs = this.store.select('auth')
      .pipe(
        filter(( {user} ) => user != null)
      )
      .subscribe(( {user} ) => {
        console.log('user: ',user)
        this.ingresosEgresosService.initIngresosEgresosListener$(user.uid);
      });

      

  }

  ngOnDestroy(): void {
      this.userSubs.unsubscribe();
  }

}
