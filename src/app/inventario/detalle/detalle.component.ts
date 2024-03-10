import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Inventario } from '../../models/inventario.model';
import { Subscription } from 'rxjs';
import { InventarioService } from '../../services/inventario.service';
import Swal from 'sweetalert2';
import { AppStateWhithInventary } from '../inventario.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: ``,
})
export class DetalleComponent implements OnInit, OnDestroy {
  inventario: Inventario[] = [];
  inventario$!: Subscription;

  constructor(private store: Store<AppStateWhithInventary>, private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.inventario$ = this.store.select('inventario').subscribe(({ items }) => this.inventario = items);
  }

  async borrar(uid: string) {
    await this.inventarioService.borrarItemInventario(uid);
    Swal.fire('Borrado', 'Item borrado', 'success')
  }

  ngOnDestroy(): void {
    this.inventario$.unsubscribe();
  }
}
