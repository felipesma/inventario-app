import { Component } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Inventario } from '../../models/inventario.model';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  standalone: true,
  styles: ``,
  imports: [BaseChartDirective, CommonModule],
})
export class EstadisticaComponent{

  ingresos: number = 0;
  egresos: number = 0;

  totalIngresos: number = 0;
  totalEgresos: number = 0;  
  doughnutChartLabels: string[] = [
    'Ingresos',
    'Egresos',
  ];
  doughnutChartData!: ChartData<'doughnut'>;
  doughnutChartType: ChartType = 'doughnut';

  store$!: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store$ = this.store.select('inventario').subscribe(({items}) => this.generarEstadistica(items));
  }

  ngOnDestroy(): void {
    this.store$.unsubscribe();
  }

  generarEstadistica(items: Inventario[]) {
    this.ingresos = 0;
    this.egresos = 0;
    this.totalEgresos = 0;
    this.totalIngresos = 0;
    items.map((item) => {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos++;
      }
      if (item.tipo === 'egreso') {
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    })
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: [this.totalIngresos, this.totalEgresos] }
      ],
    }
  }

  // Doughnut
  // events

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }
  
}
