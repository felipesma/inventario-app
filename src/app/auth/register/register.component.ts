import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ui from '../../shared/ui.actions';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: ``,
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  cargando: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      this.cargando = ui.isLoading;
      console.log('CARGANDO SUBS');
    })
  }

  async crearUsuario() {
    try {
      if (this.registerForm.invalid) return;
      this.store.dispatch(ui.isLoading())

      // Swal.fire({
      //   title: 'Registrando...',
      //   didOpen: () => {
      //     Swal.showLoading();
      //   },
      // });
      const { nombre, correo, password } = this.registerForm.value;
      const credentials = await this.authService.createUser(
        nombre,
        correo,
        password
      );
      // Swal.close();
      this.store.dispatch(ui.stopLoading());
      this.router.navigate(['/']);
      console.log(credentials);
    } catch (error) {
      this.store.dispatch(ui.stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario ya existe!',
        footer: '<a href="#">Olvidaste tu contraseña?</a>',
      });
    }
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
}
