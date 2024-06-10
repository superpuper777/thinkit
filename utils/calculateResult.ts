export const calculateResult = (totalCorrect: number, allQuestions: number) => {
  const percentage = Math.round((totalCorrect / allQuestions) * 100);
  const score = percentage + totalCorrect;
  return score;
};
