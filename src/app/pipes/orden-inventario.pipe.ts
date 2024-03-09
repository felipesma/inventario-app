import { Pipe, PipeTransform } from '@angular/core';
import { Inventario } from '../models/inventario.model';

@Pipe({
  name: 'ordenInventario'
})
export class OrdenInventarioPipe implements PipeTransform {

  transform(items: Inventario[]): Inventario[] {
    return items.slice().sort((a,b) => {
      if (a.tipo === 'ingreso') return -1;
      return 1;
    });
  }

}
