import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor (private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  async loginUsuario() {
    try {
      if (this.loginForm.invalid) return;
      Swal.fire({
        title: 'Iniciando sesión...',
        didOpen: () => {
          Swal.showLoading()
        }
      })
      const { correo, password } = this.loginForm.value;
      const credentials = await this.authService.loginUser(correo, password);
      console.log('USUARIO LOGUEADO CORRECTAMENTE', credentials)
      Swal.close();
      this.router.navigate(['/']);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario y/o Contraseña inválidos",
        footer: '<a href="#">Olvidaste tu contraseña?</a>'
      });
    }
  }
}
