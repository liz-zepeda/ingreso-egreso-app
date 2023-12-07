import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../modelos/ingreso-egreso.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {


  ingresoForm: FormGroup;
  tipo: string = 'ingreso';

  constructor(private fb:FormBuilder, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    })
  }

  guardar() {

    if(this.ingresoForm.invalid) return;

    // console.log(this.ingresoForm.value);
    // console.log(this.tipo);

    const { descripcion, monto } = this.ingresoForm.value;
    
    const ingresoEgreso = new IngresoEgreso( descripcion, monto, this.tipo );
    // console.log(ingresoEgreso)
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        Swal.fire('Registro creado', descripcion, 'success')
        this.ingresoForm.reset();
      })
      .catch(err => {
        Swal.fire('Error :S', err.message , 'error')
      })
  }

}
