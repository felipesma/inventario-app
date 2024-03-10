import { Action, createReducer, on } from "@ngrx/store";
import { Inventario } from "../models/inventario.model";
import { setItems, unsetItems } from "./inventario.actions";
import { AppState } from "../app.reducer";

export interface State {
    items : Inventario[];
}

export interface AppStateWhithInventary extends AppState {
    inventario: State,
}

export const initialState: State = {
    items: [],
};

const _inventarioReducer = createReducer(initialState,
    on(setItems, (state, {items}) => ({... state, items: [...items]})),
    on(unsetItems, (state) => ({... state, items: []})),
 );

export function inventarioReducer(state: State = initialState, action: Action) {
    return _inventarioReducer(state, action);
};