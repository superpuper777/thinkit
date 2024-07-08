import { resetToken } from '@/app/actions';
import useStore from '@/store/useStore';

const useFinishGame = () => {
  const { resetCategory, resetDifficulty } = useStore();

  const saveResultsToLocalStorage = (score: number, allQuestions: number) => {
    const results = {
      score,
      allQuestions,
      date: new Date().toISOString(),
    };

    const savedResults = localStorage.getItem('quizResults');
    const resultsArray = savedResults ? JSON.parse(savedResults) : [];
    resultsArray.push(results);

    localStorage.setItem('quizResults', JSON.stringify(resultsArray));
  };

  const finishGame = async (
    token: string,
    score: number,
    allQuestions: number,
    onReset: () => void
  ) => {
    try {
      await resetToken(token);
      saveResultsToLocalStorage(score, allQuestions);
      resetCategory();
      resetDifficulty();
      onReset();
    } catch (error) {
      console.error('Error occurred while resetting the token:', error);
    }
  };

  return finishGame;
};

export default useFinishGame;
