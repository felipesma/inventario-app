import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  };

  async crearUsuario() {
    try {
      if (this.registerForm.invalid) return;
      Swal.fire({
        title: 'Registrando...',
        didOpen: () => {
          Swal.showLoading()
        }
      })
      const { nombre, correo, password } = this.registerForm.value;
      const credentials = await this.authService.createUser(nombre, correo, password);
      Swal.close();
      this.router.navigate(['/']);
    console.log(credentials)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario ya existe!",
        footer: '<a href="#">Olvidaste tu contraseña?</a>'
      });
    }
  }

}
