import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription, filter, tap } from 'rxjs';
import { InventarioService } from '../services/inventario.service';
import * as inventarioActions from '../inventario/inventario.actions';
import { Inventario } from '../models/inventario.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: ``,
})
export class DashboardComponent implements OnInit, OnDestroy {
  user$!: Subscription;
  items$!: Subscription;

  constructor(
    private store: Store<AppState>,
    private inventarioService: InventarioService
  ) {}

  ngOnInit(): void {
    this.user$ = this.store
      .select('auth')
      .pipe(filter((auth) => auth.user !== null))
      .subscribe(({user}) => {
        this.items$ = this.inventarioService.initIngresosEgresosListener(user?.userId).subscribe(
          (inventarioFb) => {
            this.store.dispatch(inventarioActions.setItems({items: inventarioFb}))
          }
        )
      });
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
    this.items$.unsubscribe();
  }
}
