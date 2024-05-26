import { createEvent, createStore } from "effector";

export type AuthStateType = "login" | "register" | "none";

export const $authOpened = createStore<AuthStateType>("none");
export const setAuthOpenedEv = createEvent<AuthStateType>();
$authOpened.on(setAuthOpenedEv, (_, payload) => payload);
