export const getBGColor = (
  userAnswer: string | undefined,
  correctAnswer: string,
  answer: string
): string => {
  const isAnswerCorrect = userAnswer ? userAnswer === correctAnswer : undefined;

  if (
    (isAnswerCorrect === true && answer === userAnswer) ||
    (isAnswerCorrect === false && answer === correctAnswer)
  )
    return 'bg-[#55AC78] text-white';

  if (isAnswerCorrect === false && answer === userAnswer)
    return 'bg-[#AC5050] text-white';

  return 'bg-white text-[#9694aa] dark:dark:bg-gray-700 dark:text-gray-200';
};

export const getDifficultyColor = (difficulty: string) => {
  return difficulty == 'easy'
    ? 'text-lime-600'
    : difficulty == 'medium'
    ? 'text-amber-600'
    : 'text-rose-600';
};
