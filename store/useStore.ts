import { categoryStore } from './category';
import { difficultyStore } from './difficulty';
import { tokenStore } from './token';

const useStore = () => {
  const { category, resetCategory } = categoryStore();
  const { difficulty, resetDifficulty } = difficultyStore();
  const { token, saveToken, deleteToken } = tokenStore();

  return {
    category,
    difficulty,
    token,
    resetCategory,
    resetDifficulty,
    saveToken,
    deleteToken,
  };
};

export default useStore;
