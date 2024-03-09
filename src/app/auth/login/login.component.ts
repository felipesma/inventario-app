import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  cargando: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      this.cargando = ui.isLoading;
      console.log('CARGANDO SUBS');
    })
  }

  async loginUsuario() {
    try {
      if (this.loginForm.invalid) return;

      this.store.dispatch(ui.isLoading())

      // Swal.fire({
      //   title: 'Iniciando sesión...',
      //   didOpen: () => {
      //     Swal.showLoading();
      //   },
      // });
      const { correo, password } = this.loginForm.value;
      const credentials = await this.authService.loginUser(correo, password);
      console.log('USUARIO LOGUEADO CORRECTAMENTE', credentials);
      // Swal.close();
      this.store.dispatch(ui.stopLoading());
      this.router.navigate(['/']);
    } catch (error: any) {
      this.store.dispatch(ui.stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario y/o Contraseña inválidos',
        footer: '<a href="#">Olvidaste tu contraseña?</a>',
      });
    }
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
}
