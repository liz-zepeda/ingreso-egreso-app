import { UsuarioModel } from '../modelos/usuario.model';
import * as actions from './auth.actionts';
import { createReducer, on } from '@ngrx/store';

export interface State {
    user: UsuarioModel; 
}

export const initialState: State = {
   user: null,
}

const _authReducer = createReducer(initialState,

    on(actions.setUser, (state, { user }) => ({ ...state, user })),
    on(actions.unsetUser, state  => ({ ...state, user: null })),

);

export function authReducer(state, action) {
    return _authReducer(state, action);
}