import { useState } from 'react';

const useQuestionIndex = (totalQuestions = 10) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const lastQuestion = currentQuestionIndex === totalQuestions - 1;
  const handleChangeQuestion = (step: number) => {
    const newQuestionIndex = currentQuestionIndex + step;
    if (newQuestionIndex < 0 || newQuestionIndex >= totalQuestions) return;
    setCurrentQuestionIndex(newQuestionIndex);
  };

  return {
    currentQuestionIndex,
    handleChangeQuestion,
    lastQuestion,
    setCurrentQuestionIndex,
  };
};

export default useQuestionIndex;
