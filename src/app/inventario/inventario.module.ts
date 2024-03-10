import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { InventarioComponent } from './inventario.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrdenInventarioPipe } from '../pipes/orden-inventario.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { inventarioReducer } from './inventario.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    InventarioComponent,
    DetalleComponent,
    OrdenInventarioPipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('inventario', inventarioReducer),
    RouterModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    SharedModule,
  ],
  providers: [provideCharts(withDefaultRegisterables())],
})
export class InventarioModule { }
