import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inventario } from '../models/inventario.model';
import { InventarioService } from '../services/inventario.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ui from '../shared/ui.actions';
import { AppStateWhithInventary } from './inventario.reducer';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styles: ``,
})
export class InventarioComponent implements OnInit, OnDestroy {
  inventarioForm!: FormGroup;
  tipo: 'ingreso' | 'egreso' = 'ingreso';
  cargando: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private inventarioService: InventarioService,
    private store: Store<AppStateWhithInventary>
  ) {}

  ngOnInit(): void {
    this.inventarioForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      this.cargando = ui.isLoading;
    })
  }

  async guardar() {
    try {
      if (this.inventarioForm.invalid) return;
      this.store.dispatch(ui.isLoading())
      const { descripcion, monto } = this.inventarioForm.value;
      const inventario = new Inventario(descripcion, monto, this.tipo, '');
      await this.inventarioService.crearInventario(inventario);
      this.inventarioForm.reset();
      this.store.dispatch(ui.stopLoading());
      Swal.fire('Registro creado!', descripcion, 'success');
    } catch (error) {
      this.store.dispatch(ui.stopLoading());
      Swal.fire('Ups!', 'A ocurrido un error al realizar el registro', 'error');
    }
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
}
