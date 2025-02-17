export const calculateResult = (totalCorrect: number, allQuestions: number) => {
  if (allQuestions === 0) return 0;

  const basePoints = totalCorrect * 10;
  const difficultyMultiplier = 1 + allQuestions / 100;

  return Math.round(basePoints * difficultyMultiplier);
};
