import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService.service';
import Swal from 'sweetalert2';

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

    Swal.fire({
      title: "Espere por favor",
      didOpen: () => Swal.showLoading()
    });

    const { nombre, correo, contrasena } = this.registroForm.value;

    this.authService.crearUsuario(nombre, correo, contrasena)
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
