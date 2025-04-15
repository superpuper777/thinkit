import { Difficulty, FormattedOption } from '@/types/quiz';
import { SelectValue } from 'react-tailwindcss-select/dist/components/type';
import { create } from 'zustand';

interface DifficultyState {
  difficulty:   {value: Difficulty | string; 
  label: string;
};
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
