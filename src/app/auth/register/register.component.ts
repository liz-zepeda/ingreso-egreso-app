import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor(  private fb: FormBuilder, 
                private authService: AuthService,
                private router: Router ) { }


  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
    })
  }

  crearUsuario() {

    if ( !this.registroForm.valid ) return;

    const { nombre, correo, contrasena } = this.registroForm.value;

    this.authService.crearUsuario(nombre, correo, contrasena)
      .then(credenciales => {
        console.log(credenciales);
        this.router.navigate(['/']);
        })
      .catch(error => console.error(error))
      


  }
}
