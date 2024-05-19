import { categoryStore } from './category';
import { difficultyStore } from './difficulty';
import { tokenStore } from './token';

export const getCategory = () => categoryStore.getState().category.value;
export const getDifficulty = () => difficultyStore.getState().difficulty.value;
export const getToken = () => tokenStore.getState().token;
