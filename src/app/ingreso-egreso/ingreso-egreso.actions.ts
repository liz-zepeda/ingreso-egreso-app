import { createAction, props } from '@ngrx/store';
import { IngresoEgresoModel } from '../modelos/ingreso-egreso.model';

export const unsetItem = createAction('[IngresoEgreso] Unset Item');
export const setItem = createAction('[IngresoEgreso] Set Item',
        props<{items: IngresoEgresoModel[]}>());