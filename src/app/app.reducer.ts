import { ActionReducerMap } from "@ngrx/store";
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as inventario from './inventario/inventario.reducer';

export interface AppState {
    ui: ui.State,
    auth: auth.State,
    inventario: inventario.State,
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: ui.uiReducer,
    auth: auth.authReducer,
    inventario: inventario.inventarioReducer,
}