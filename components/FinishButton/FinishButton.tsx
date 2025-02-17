import { useRouter } from 'next/navigation';

import Button from '../Button/Button';
import useFinishGame from '@/app/hooks/useFinishGame';

type Props = {
  onCloseModal?: () => void;
  score: number;
  allQuestions: number;
};

const FinishButton = ({ onCloseModal, score, allQuestions }: Props) => {
  const router = useRouter();
  const finishGame = useFinishGame();

  const handleFinishGame = async () => {
    if (onCloseModal) {
      onCloseModal();
    }
    await finishGame(score, allQuestions, () => router.push('/'));
  };

  return <Button text="Finish" onClick={handleFinishGame} size="sm:text-lg" />;
};

export default FinishButton;
