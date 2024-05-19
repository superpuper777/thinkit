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
    await resetToken(token);
    resetCategory();
    resetDifficulty();
    router.push('/');
    router.refresh();

    if (onCloseModal) {
      onCloseModal();
    }
  };

  return <Button text="Finish" onClick={handleFinishGame} size="sm:text-lg" />;
};

export default FinishButton;
