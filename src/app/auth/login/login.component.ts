import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;

  constructor(  private fb:FormBuilder, 
                private authService: AuthService,
                private router: Router ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    })
  }

  login() {
  
    // console.log(this.loginForm.value);

    if ( this.loginForm.invalid ) return;

    Swal.fire({
      title: "Espere por favor",
      didOpen: () => Swal.showLoading()
    });

    const { correo, contrasena } = this.loginForm.value;
    this.authService.loginUsuario(correo, contrasena)
      .then(credenciales => {
        console.log(credenciales);
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch( error => 
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        })
      )
    }
}
