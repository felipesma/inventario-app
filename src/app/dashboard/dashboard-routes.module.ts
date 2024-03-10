import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';

const childsRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( childsRoutes )
  ],
  exports: [
    RouterModule,
  ]
})
export class DashboardRoutingModule {}
