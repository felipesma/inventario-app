import { createAction, props } from "@ngrx/store";
import { User } from "../models/users.model";
import { Inventario } from "../models/inventario.model";

export const setItems = createAction('[Inventario] Set Item', props<{items: Inventario[]}>());
export const unsetItems = createAction('[Auth] Unset Items');