import { Question } from '@/types/quiz';
import { useState } from 'react';

const useQuizAnswers = (questions: Question[]) => {
  const [usersAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [totalCorrect, setTotalCorrect] = useState(0);

  const handleAnswer = (answer: string, questionIndex: number) => {
    if (isQuestionAnswered(questionIndex)) return;
    const isCorrect = questions[questionIndex].correct_answer === answer;
    const newScore = isCorrect ? totalCorrect + 1 : totalCorrect;
    setTotalCorrect(newScore);
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  const isQuestionAnswered = (questionIndex: number) =>
    !!usersAnswers[questionIndex];

  return {
    usersAnswers,
    totalCorrect,
    handleAnswer,
    isQuestionAnswered,
    setUserAnswers,
  };
};

export default useQuizAnswers;
