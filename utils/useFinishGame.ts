import { resetToken } from '@/app/actions';
import useStore from '@/store/useStore';

const useFinishGame = () => {
  const { resetCategory, resetDifficulty } = useStore();

  const finishGame = async (token: string, onReset: () => void) => {
    try {
      await resetToken(token);
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
