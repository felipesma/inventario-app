import { Action, createReducer, on } from "@ngrx/store";
import { Inventario } from "../models/inventario.model";
import { setItems, unsetItems } from "./inventario.actions";

export interface State {
    items : Inventario[];
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