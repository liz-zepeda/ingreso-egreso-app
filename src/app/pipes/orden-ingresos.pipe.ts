import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgresoModel } from '../modelos/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngresosPipe'
})
export class OrdenIngresosPipe implements PipeTransform {

  transform(items: IngresoEgresoModel[]): IngresoEgresoModel[] {
   
    return items.sort(( a,b )  => {
      if ( a.tipo === 'ingreso' ) { return -1 }
      else { return 1 }
    });

  }

}
