import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { IngresoEgresoModel } from '../modelos/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as uiAction from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {


  ingresoForm   : FormGroup;
  tipo          : string = 'ingreso';
  cargando      : boolean = false;
  loadingSubs   : Subscription;

  constructor(
    private fb:FormBuilder, 
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
    ) { }

  ngOnInit() {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });

    this.loadingSubs = this.store.select('ui').subscribe(( { isLoading } ) => {
      this.cargando = isLoading;
    });
  }

  ngOnDestroy(): void {
      this.loadingSubs.unsubscribe();
  }

  guardar() {
    if(this.ingresoForm.invalid) return;
    
    this.store.dispatch(uiAction.isLoading());

    const { descripcion, monto } = this.ingresoForm.value;
    
    const ingresoEgreso = new IngresoEgresoModel( descripcion, monto, this.tipo );

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.store.dispatch(uiAction.stopLoading());
        Swal.fire('Registro creado', descripcion, 'success')
        this.ingresoForm.reset();
      })
      .catch(err => {
        this.store.dispatch(uiAction.stopLoading());
        Swal.fire('Error :S', err.message , 'error')
      })
  }

}
