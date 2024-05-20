import { Question } from '@/types/quiz';
import { useState } from 'react';

const useQuizAnswers = (questions: Question[]) => {
  const [usersAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);

  const handleAnswer = (answer: string, questionIndex: number) => {
    if (isQuestionAnswered(questionIndex)) return;
    const isCorrect = questions[questionIndex].correct_answer === answer;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  const isQuestionAnswered = (questionIndex: number) =>
    !!usersAnswers[questionIndex];

  return {
    usersAnswers,
    score,
    handleAnswer,
    isQuestionAnswered,
    setUserAnswers,
  };
};

export default useQuizAnswers;
