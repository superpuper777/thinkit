'use client';
import React, { useState } from 'react';
import QuestionCard from '@/components/QuestionCard/QuestionCard';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import FinishButton from '@/components/FinishButton/FinishButton';
import useStore from '@/store/useStore';
import useQuizQuestions from '../../hooks/useQuizQuestions';
import useQuizAnswers from '../../hooks/useQuizAnswers';
import useQuestionIndex from '../../hooks/useQuestionIndex';
import useModal from '../../hooks/useModal';
import { responseObj, calculateResultForSingleDifficulty, calculateResultForAnyDifficulty } from '@/utils';

const Quiz = () => {
  const [allQuestions, setAllQuestions] = useState(0);
  const { category, difficulty, token } = useStore();
  const totalQuestions = 10;

  const { questions, responseCode, setQuestions } = useQuizQuestions(
    totalQuestions,
    difficulty.value,
    category.value,
    token
  );

  const { usersAnswers, handleAnswer, setUserAnswers, totalCorrect } =
    useQuizAnswers(questions);
  const {
    currentQuestionIndex,
    handleChangeQuestion,
    setCurrentQuestionIndex,
    lastQuestion,
  } = useQuestionIndex(10);
  const { showModal, handleShowModal, setShowModal } = useModal();

  const handleOnAnswerClick = (
    answer: string,
    currentQuestionIndex: number
  ) => {
    handleAnswer(answer, currentQuestionIndex);
  };
  const score = difficulty.value === ''
    ? calculateResultForAnyDifficulty(totalCorrect, allQuestions, questions, usersAnswers)
    : calculateResultForSingleDifficulty(totalCorrect, allQuestions, difficulty.value);

  console.log(difficulty.label)
  return (
    <div className="w-full max-w-lg p-[30px] rounded-3xl bg-slate-200 my-8 mx-auto">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-bold text-[20px]">
            Score:
            <span className="text-[#46b5d4] ml-2">{totalCorrect}</span>
            <span className="text-[#9694aa]">/{allQuestions}</span>
          </p>
          <p>Your result: {score ? score : 0}</p>
          <p className="pb-2 font-bold text-base text-[##243c5a]">
            Question {currentQuestionIndex + 1} out of {totalQuestions}
          </p>
        </div>
        <FinishButton score={score} allQuestions={allQuestions} />
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
        score={score}
        totalCorrect={totalCorrect}
        allQuestions={allQuestions}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        setQuestions={setQuestions}
        setUserAnswers={setUserAnswers}
      />
    </div>
  );
};

export default Quiz;
