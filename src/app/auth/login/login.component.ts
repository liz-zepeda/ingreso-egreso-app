import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService.service';
import Swal from 'sweetalert2';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {


  loginForm: FormGroup;
  cargando: boolean =  false;
  uiSubscription$: Subscription;

  constructor(  private fb:FormBuilder, 
                private authService: AuthService,
                private router: Router,
                private store: Store<AppState> ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });

    this.uiSubscription$ = this.store.select('ui').subscribe((ui) => {
      this.cargando = ui.isLoading;
      console.log("cargando subs");
      
    })
  }

  ngOnDestroy(): void {
      this.uiSubscription$.unsubscribe();
  }

  login() {
  
    // console.log(this.loginForm.value);

    if ( this.loginForm.invalid ) return;

    this.store.dispatch(ui.isLoading());

    // Swal.fire({
    //   title: "Espere por favor",
    //   didOpen: () => Swal.showLoading()
    // });

    const { correo, contrasena } = this.loginForm.value;
    this.authService.loginUsuario(correo, contrasena)
      .then(credenciales => {
        // console.log(credenciales);
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
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
