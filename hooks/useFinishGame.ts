import { resetToken } from '@/app/actions';
import useStore from '@/store/useStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useQuizResults from './useQuizResults';

const useFinishGame = () => {
  const { category, token, difficulty, resetCategory, resetDifficulty } =
    useStore();

  const { saveResultsToLocalStorage } = useQuizResults();

  const finishGame = async (score: number, allQuestions: number) => {
    try {
      const isNewRecord = saveResultsToLocalStorage(
        score,
        allQuestions,
        category.value || '',
        difficulty.value || ''
      );

      resetToken(token);
      if (category.value) {
        resetCategory();
      }
      if (difficulty.value) {
        resetDifficulty();
      }

      if (isNewRecord) {
        toast.success(
          `Congratulations! New record: ${score} correct answers from ${allQuestions} questions in ${category.label} category using ${difficulty.label} difficulty.`,
          {
            position: 'top-right',
            autoClose: 6000,
          }
        );
      }
    } catch (error) {
      console.error('Error occurred while resetting the token:', error);
    }
  };

  return finishGame;
};

export default useFinishGame;
