import { useRouter } from 'next/navigation';

import Button from '../Button/Button';
import useFinishGame from '@/utils/useFinishGame';

type Props = {
  onCloseModal?: () => void;
  token: string;
  score: number;
  allQuestions: number;
};

const FinishButton = ({ onCloseModal, token, score, allQuestions }: Props) => {
  const router = useRouter();
  const finishGame = useFinishGame();

  const handleFinishGame = async () => {
    if (onCloseModal) {
      onCloseModal();
    }
    await finishGame(token, score, allQuestions, () => router.push('/'));
  };

  return <Button text="Finish" onClick={handleFinishGame} size="sm:text-lg" />;
};

export default FinishButton;
