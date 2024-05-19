import { FormattedOption } from '@/types/quiz';
import { SelectValue } from 'react-tailwindcss-select/dist/components/type';
import { create } from 'zustand';

interface DifficultyState {
  difficulty: FormattedOption;
  changeDifficulty: (newDifficult: FormattedOption | SelectValue) => void;
  resetDifficulty: () => void;
}

export const difficultyStore = create<DifficultyState>((set) => ({
  difficulty: { value: '', label: 'Any Difficulty' },
  changeDifficulty: (newDifficulty) =>
    set((state) => ({
      difficulty: { ...state.difficulty, ...newDifficulty },
    })),
  resetDifficulty: () =>
    set(() => ({
      difficulty: { value: '', label: 'Any Difficulty' },
    })),
}));
