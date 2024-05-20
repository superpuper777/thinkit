import { resetToken } from '@/app/actions';
import { useRouter } from 'next/navigation';

import useStore from '@/store/useStore';
import Button from '../Button/Button';

type Props = {
  onCloseModal?: () => void;
};

const FinishButton = ({ onCloseModal }: Props) => {
  const router = useRouter();
  const { token, resetCategory, resetDifficulty } = useStore();

  const handleFinishGame = async () => {
    if (onCloseModal) {
      onCloseModal();
    }
    try {
      await resetToken(token);
      resetCategory();
      resetDifficulty();
    } catch (error) {
      console.error('Error occurred while resetting the token:', error);
    }
    router.push('/');
  };

  return <Button text="Finish" onClick={handleFinishGame} size="sm:text-lg" />;
};

export default FinishButton;
