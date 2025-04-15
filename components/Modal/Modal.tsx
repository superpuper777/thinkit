import React, { SetStateAction, Dispatch } from 'react';
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from 'tw-elements-react';

import { getQuestions } from '@/app/actions';
import { QuestionsState } from '@/types/quiz';
import { getCategory, getDifficulty, getToken } from '@/store/states';
import FinishButton from '../FinishButton/FinishButton';

type Props = {
  showModal: boolean;
  score: number;
  totalCorrect: number;
  allQuestions: number;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  currentToken: string;
  setCurrentQuestionIndex: Dispatch<SetStateAction<number>>;
  setQuestions: Dispatch<SetStateAction<QuestionsState>>;
  setUserAnswers: Dispatch<SetStateAction<Record<number, string>>>;
};

export default function Modal({
  showModal,
  score,
  totalCorrect,
  allQuestions,
  setShowModal,
  setCurrentQuestionIndex,
  setQuestions,
  setUserAnswers,
}: Props): JSX.Element {
  const totalQuestions = 10;
  const category = getCategory();
  const difficulty = getDifficulty();
  const token = getToken();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCountinueGame = async () => {
    const data = await getQuestions(
      totalQuestions,
      difficulty,
      category,
      token
    );

    setUserAnswers({});
    setQuestions(data.results);
    setCurrentQuestionIndex(0);
    setShowModal(false);
  };

  return (
    <div>
      <TEModal show={showModal} setShow={setShowModal} className="bg-gray-600 bg-opacity-30">
        <TEModalDialog className="top-60">
          <TEModalContent className="dark:bg-gray-800">
            <TEModalHeader>
              <h4 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Questions are over! Should I continue playing?
              </h4>
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={handleCloseModal}
                aria-label="Close">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            <TEModalBody>
              <p className="text-lg">
                You can continue the game and get more questions or finish the
                game right now. Make a choice!
              </p>
              <p>
                You answered correctly to {totalCorrect} questions out of{' '}
                {allQuestions}
              </p>
              <p>Your result: {score}</p>
            </TEModalBody>
            <TEModalFooter className="flex gap-5">
              <TERipple rippleColor="white">
                <button
                  onClick={handleCountinueGame}
                  type="button"
                  className={`text-slate-900 font-medium uppercase select-none bg-[#46b5d4] sm:py-2 sm:px-8 py-2 px-4 rounded-md disabled:opacity-60 disabled:pointer-events-none shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#378ca3] active:bg-[#9694aa]`}>
                  Countinue Game
                </button>
              </TERipple>
              <FinishButton
                onCloseModal={handleCloseModal}
                score={score}
                allQuestions={allQuestions}
              />
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
}
