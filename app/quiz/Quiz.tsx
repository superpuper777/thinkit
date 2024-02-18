"use client";

import React, { useState } from "react";
import QuestionCard from "@/components/QuestionCard/QuestionCard";
import Button from "@/components/Button/Button";
import { TERipple } from "tw-elements-react";

import { QuestionsState } from "@/types/quiz";
import Modal from "@/components/Modal/Modal";

type Props = {
  questions: QuestionsState;
  totalQuestions: number;
  currentToken: string;
};

const Quiz = ({ questions, totalQuestions, currentToken }: Props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [usersAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showModal, setShowModal] = useState(false);
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

  const handleShowModal = async () => {
    setShowModal(true);
  };

  return (
    <div className="w-full max-w-lg p-[30px] rounded-3xl bg-slate-200 my-8 mx-auto">
      <p className="font-bold text-[20px]">Score: {score}</p>
      <p className="pb-2 font-bold text-base text-[##243c5a]">
        Question {currentQuestionIndex + 1} out of {totalQuestions}
      </p>
      <QuestionCard
        currentQuestionIndex={currentQuestionIndex}
        question={questions[currentQuestionIndex]?.question}
        answers={questions[currentQuestionIndex]?.answers}
        userAnswer={usersAnswers[currentQuestionIndex]}
        correctAnswer={questions[currentQuestionIndex]?.correct_answer}
        onClick={handleOnAnswerClick}
      />
      <div className="w-max-[600px] flex justify-between items-center">
        <TERipple rippleColor="white">
          <Button
            size="sm:text-lg"
            text="Prev"
            onClick={() => handleChangeQuestion(-1)}
            disabled={currentQuestionIndex === 0}
          />
        </TERipple>
        <TERipple rippleColor="white">
          <Button
            size="sm:text-lg"
            text={lastQuestion ? "End" : "Next"}
            onClick={
              lastQuestion
                ? () => handleShowModal()
                : () => handleChangeQuestion(1)
            }
          />
        </TERipple>
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        currentToken={currentToken}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
      />
    </div>
  );
};

export default Quiz;
