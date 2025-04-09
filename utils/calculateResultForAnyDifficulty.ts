import { QuestionsState, Difficulty } from "@/types/quiz";

export const calculateResultForAnyDifficulty = (
  totalCorrect: number,
  allQuestions: number,
  questions: QuestionsState,  
  userAnswers: Record<number, string>
) => {
  if (allQuestions === 0) return 0;

  const basePoints = totalCorrect * 10;
  let difficultyMultiplier = 1;

  questions.forEach((question, index) => {
    if (userAnswers[index] === question.correct_answer) {
      const questionDifficulty = question.difficulty;
      if (questionDifficulty === Difficulty.EASY) {
        console.log('easy')
        difficultyMultiplier *= 0.8;
      } else if (questionDifficulty === Difficulty.MEDIUM) {
        console.log('MEDIUM')
        difficultyMultiplier *= 1;
      } else if (questionDifficulty === Difficulty.HARD) {
        console.log('HARD')
        difficultyMultiplier *= 1.2;
      }
    }
  });

  return Math.round(basePoints * difficultyMultiplier);
};

