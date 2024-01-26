"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import QuestionCard from "@/components/QuestionCard/QuestionCard";
import Button from "@/components/Button/Button";

import { QuestionsState } from "@/types/quiz";

type Props = {
  questions: QuestionsState;
  totalQuestions: number;
};

const Quiz = ({ questions, totalQuestions }: Props) => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [usersAnswers, setUserAnswers] = useState<Record<number, string>>({});
  // or const [state, dispatch] = useReducer(reducer, {});

  const isQuestionAnswered = usersAnswers[currentQuestionIndex] ? true : false;

  const lastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleOnAnswerClick = (
    answer: string,
    currentQuestionIndex: number
  ) => {
    if (isQuestionAnswered) return;
    const isCorrect = questions[currentQuestionIndex].correct_answer === answer;
    if (isCorrect) setScore((prev) => prev + 1);
    setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  const handleChangeQuestion = (step: number) => {
    const newQuestionIndex = currentQuestionIndex + step;
    if (newQuestionIndex < 0 || newQuestionIndex >= totalQuestions) return;
    setCurrentQuestionIndex(newQuestionIndex);
  };

  const handleFinishGame = () => {
    router.push("/");
  };

  console.log(questions);
  return (
    <div className="w-[600px] p-[30px] rounded-3xl bg-slate-200 my-8 mx-auto">
      <p className="p-8 font-bold text-[20px]">Score: {score}</p>
      <p className="pb-2 font-bold text-base text-[##243c5a]">
        Question {currentQuestionIndex} out of {totalQuestions}
      </p>
      <QuestionCard
        currentQuestionIndex={currentQuestionIndex}
        question={questions[currentQuestionIndex].question}
        answers={questions[currentQuestionIndex].answers}
        userAnswer={usersAnswers[currentQuestionIndex]}
        correctAnswer={questions[currentQuestionIndex].correct_answer}
        onClick={handleOnAnswerClick}
      />
      <div className="w-max-[600px]">
        <Button text="Prev" onClick={() => handleChangeQuestion(-1)} />
        <Button
          text={lastQuestion ? "End" : "Next"}
          onClick={
            lastQuestion
              ? () => handleFinishGame()
              : () => handleChangeQuestion(1)
          }
        />
      </div>
    </div>
  );
};

export default Quiz;
