import { Difficulty } from "@/types/quiz";

export const calculateResultForSingleDifficulty = (totalCorrect: number, allQuestions: number, difficulty: Difficulty | string ) => {
  if (allQuestions === 0) return 0;

  const basePoints = totalCorrect * 10;
  let difficultyMultiplier = 1 + allQuestions / 100;

  if (difficulty === Difficulty.EASY) {
    difficultyMultiplier *= 0.8;
  } else if (difficulty === Difficulty.MEDIUM) {
    difficultyMultiplier *= 1;
  } else if (difficulty === Difficulty.HARD) {
    difficultyMultiplier *= 1.2; 
  }

  return Math.round(basePoints * difficultyMultiplier);
};
