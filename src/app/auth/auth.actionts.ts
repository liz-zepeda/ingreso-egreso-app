import { createAction, props } from '@ngrx/store';
import { UsuarioModel } from '../modelos/usuario.model';

export const setUser = createAction(
    '[Auth] setUser',
    props<{ user: UsuarioModel }>()
);

export const unsetUser = createAction('[Auth] unsetUser');