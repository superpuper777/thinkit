import { resetToken } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { categoryStore } from '@/store/category';
import { difficultyStore } from '@/store/difficulty';

import Button from '../Button/Button';

type Props = {
  token: string;
};

const FinishButton = ({ token }: Props) => {
  const router = useRouter();
  const { resetCategory } = categoryStore();
  const { resetDifficulty } = difficultyStore();

  const handleFinishGame = async () => {
    await resetToken(token);
    resetCategory();
    resetDifficulty();
    router.push('/', { scroll: false });
    router.refresh();
  };
  return <Button text="Finish" onClick={handleFinishGame} size="sm:text-lg" />;
};

export default FinishButton;
