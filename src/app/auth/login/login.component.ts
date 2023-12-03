import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService.service';

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

    const { correo, contrasena } = this.loginForm.value;
    this.authService.loginUsuario(correo, contrasena)
      .then(credenciales => {
        console.log(credenciales);
        this.router.navigate(['/']);
      })
      .catch(error=> console.error(error))
    }
}
