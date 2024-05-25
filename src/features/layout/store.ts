import { createEvent, createStore } from "effector";
import { PaletteMode } from "@mui/material";

export const $colorMode = createStore<PaletteMode>("dark");
export const toggleColorModeEv = createEvent();
$colorMode.on(toggleColorModeEv, (state) =>
  state === "light" ? "dark" : "light",
);
