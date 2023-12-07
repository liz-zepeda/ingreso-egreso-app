import { createReducer, on } from '@ngrx/store';
import * as ingresoEgresoAction from './ingreso-egreso.actions';
import { IngresoEgresoModel } from '../modelos/ingreso-egreso.model';

export interface State {
    items: IngresoEgresoModel[]; 
}

export const initialState: State = {
   items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(ingresoEgresoAction.setItem, (state, { items }) => ({ ...state, items: [...items] })),
    on(ingresoEgresoAction.unsetItem, state => ({ ...state, items: [] })),

);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}