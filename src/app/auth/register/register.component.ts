import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/authService.service';
import Swal from 'sweetalert2';
import * as ui from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  cargando: boolean;
  uiSubscriptions$: Subscription;

  constructor(  private fb: FormBuilder, 
                private authService: AuthService,
                private router: Router,
                private store: Store<AppState> ) { }


  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
    });

    this.uiSubscriptions$ = this.store.select('ui').subscribe((ui) =>  this.cargando = ui.isLoading );

  }

  ngOnDestroy(): void {
      this.uiSubscriptions$.unsubscribe();
  }

  crearUsuario() {

    if ( !this.registroForm.valid ) return;

    this.store.dispatch(ui.stopLoading());

    // Swal.fire({
    //   title: "Espere por favor",
    //   didOpen: () => Swal.showLoading()
    // });

    const { nombre, correo, contrasena } = this.registroForm.value;

    this.authService.crearUsuario(nombre, correo, contrasena)
      .then(credenciales => {
        // console.log(credenciales);
        this.store.dispatch(ui.isLoading());
        
        // Swal.close();
        this.router.navigate(['/']);
        })
        .catch( error => {
          this.store.dispatch(ui.stopLoading());

          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          })
        })
      


  }
}
