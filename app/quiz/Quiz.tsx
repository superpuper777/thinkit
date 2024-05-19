'use client';
import React, { useState } from 'react';
import QuestionCard from '@/components/QuestionCard/QuestionCard';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import FinishButton from '@/components/FinishButton/FinishButton';
import { responseObj } from './../../utils/responseCodes';
import { difficultyStore } from '@/store/difficulty';
import { categoryStore } from '@/store/category';
import { tokenStore } from '@/store/token';
import useQuizQuestions from './useQuizQuestions';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [usersAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showModal, setShowModal] = useState(false);

  const [allQuestions, setAllQuestions] = useState(0);

  const difficulty = difficultyStore.getState().difficulty.value;
  const category = categoryStore.getState().category.value;
  const token = tokenStore.getState().token;

  console.log(difficulty, category);
  const totalQuestions = 10;
  const isQuestionAnswered = usersAnswers[currentQuestionIndex] ? true : false;
  const lastQuestion = currentQuestionIndex === totalQuestions - 1;

  const { questions, responseCode, setQuestions } = useQuizQuestions(
    totalQuestions,
    difficulty,
    category,
    token
  );

  const handleAnswer = (answer: string, currentQuestionIndex: number) => {
    if (isQuestionAnswered) return;
    const isCorrect = questions[currentQuestionIndex].correct_answer === answer;
    if (isCorrect) setScore((prev) => prev + 1);
    setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  const handleOnAnswerClick = (
    answer: string,
    currentQuestionIndex: number
  ) => {
    handleAnswer(answer, currentQuestionIndex);
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
      <div className="flex items-start justify-between">
        <div>
          <p className="font-bold text-[20px]">
            Score:
            <span className="text-[#46b5d4] ml-2">{score}</span>
            <span className="text-[#9694aa]">/{allQuestions}</span>
          </p>
          <p className="pb-2 font-bold text-base text-[##243c5a]">
            Question {currentQuestionIndex + 1} out of {totalQuestions}
          </p>
        </div>
        <FinishButton token={token} />
      </div>
      {responseCode === 0 ? (
        <QuestionCard
          currentQuestionIndex={currentQuestionIndex}
          question={questions[currentQuestionIndex]?.question}
          answers={questions[currentQuestionIndex]?.answers}
          userAnswer={usersAnswers[currentQuestionIndex]}
          correctAnswer={questions[currentQuestionIndex]?.correct_answer}
          onClick={handleOnAnswerClick}
          setAllQuestions={setAllQuestions}
          category={questions[currentQuestionIndex]?.category}
          difficulty={questions[currentQuestionIndex]?.difficulty}
        />
      ) : (
        <div className="pb-2 font-bold text-xl text-[#9694aa] my-4">
          <p>{responseObj[responseCode]}</p>
        </div>
      )}

      <div className="w-max-[600px] flex justify-between items-center">
        <Button
          size="sm:text-lg md:text-xl"
          text="Prev"
          onClick={() => handleChangeQuestion(-1)}
          disabled={currentQuestionIndex === 0}
        />
        <Button
          size="sm:text-lg md:text-xl"
          text={lastQuestion ? 'End' : 'Next'}
          onClick={
            lastQuestion
              ? () => handleShowModal()
              : () => handleChangeQuestion(1)
          }
        />
      </div>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        currentToken={token}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        setQuestions={setQuestions}
        setUserAnswers={setUserAnswers}
      />
    </div>
  );
};

export default Quiz;
