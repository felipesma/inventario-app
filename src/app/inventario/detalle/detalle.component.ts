import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Inventario } from '../../models/inventario.model';
import { Subscription } from 'rxjs';
import { InventarioService } from '../../services/inventario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: ``,
})
export class DetalleComponent implements OnInit, OnDestroy {
  inventario: Inventario[] = [];
  inventario$!: Subscription;

  constructor(private store: Store<AppState>, private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.inventario$ = this.store.select('inventario').subscribe(({ items }) => this.inventario = items);
  }

  async borrar(uid: string) {
    console.log(`BORRAR ITEM ${uid}`)
    await this.inventarioService.borrarItemInventario(uid);
    Swal.fire('Borrado', 'Item borrado', 'success')
  }

  ngOnDestroy(): void {
    this.inventario$.unsubscribe();
  }
}
