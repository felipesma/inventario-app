import { Routes } from "@angular/router";
import { EstadisticaComponent } from "../inventario/estadistica/estadistica.component";
import { InventarioComponent } from "../inventario/inventario.component";
import { DetalleComponent } from "../inventario/detalle/detalle.component";

export const dashboardRoutes: Routes = [
    {path:'', component: EstadisticaComponent},
    {path:'inventario', component: InventarioComponent},
    {path:'detalle', component: DetalleComponent}
];