"use client";
import { SetStateAction, Dispatch } from "react";

import { getBGColor } from "./helpers";

type Props = {
  currentQuestionIndex: number;
  question: string;
  answers: Array<string>;
  userAnswer: string | undefined;
  correctAnswer: string;
  onClick: (answer: string, currentQuestionIndex: number) => void;
  setAllQuestions: Dispatch<SetStateAction<number>>;
};

const QuestionCard = ({
  currentQuestionIndex,
  question,
  answers,
  userAnswer,
  correctAnswer,
  onClick,
  setAllQuestions,
}: Props) => {
  return (
    <div className="mb-10 mt-2">
      <p
        className="max=w=[400px] md:text-xl text-sm"
        dangerouslySetInnerHTML={{ __html: question }}
      />
      <div className="flex flex-col pt-8 gap-3">
        {answers?.map((answer) => (
          <div
            key={answer}
            onClick={() => {
              onClick(answer, currentQuestionIndex);
              setAllQuestions((prev: number) => prev + 1);
            }}
            className={`${getBGColor(
              userAnswer,
              correctAnswer,
              answer
            )} cursor-pointer flex flex-wrap items-center justify-center select-none font-bold md:text-xl text-sm px-3 py-1.5 rounded-md`}
          >
            <span
              className="text-center"
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
