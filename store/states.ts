import { categoryStore } from "./category";
import { difficultyStore } from "./difficulty";
import { tokenStore } from "./token";

export const category = categoryStore.getState().category.value;
export const difficulty = difficultyStore.getState().difficulty.value;
export const token = tokenStore.getState().token;
