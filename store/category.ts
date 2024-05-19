import { FormattedOption } from '@/types/quiz';
import { SelectValue } from 'react-tailwindcss-select/dist/components/type';
import { create } from 'zustand';

interface CategoryState {
  category: FormattedOption;
  changeCategory: (newCategory: FormattedOption | SelectValue) => void;
  resetCategory: () => void;
}

export const categoryStore = create<CategoryState>((set) => ({
  category: { value: '', label: 'Any Category' },
  changeCategory: (newCategory) =>
    set((state) => ({
      category: { ...state.category, ...newCategory },
    })),
  resetCategory: () =>
    set(() => ({
      category: { value: '', label: 'Any Category' },
    })),
}));
