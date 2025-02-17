import { resetToken } from '@/app/actions';
import useStore from '@/store/useStore';
import useQuizResults from './useQuizResults';

const useFinishGame = () => {
  const { category, token, resetCategory, resetDifficulty } = useStore();

  const { saveResultsToLocalStorage } = useQuizResults();

  const finishGame = async (
    score: number,
    allQuestions: number,
    onReset: () => void
  ) => {
    try {
      await resetToken(token);
      const isNewRecord = saveResultsToLocalStorage(
        score,
        allQuestions,
        category.value
      );
      resetCategory();
      resetDifficulty();
      onReset();
      if (isNewRecord) {
        alert(
          `Congratulations! New record: ${score} correct answers from ${allQuestions} questions.`
        );
      }
    } catch (error) {
      console.error('Error occurred while resetting the token:', error);
    }
  };

  return finishGame;
};

export default useFinishGame;
