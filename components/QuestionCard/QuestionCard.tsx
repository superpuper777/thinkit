"use client";

import { getBGColor } from "./helpers";

type Props = {
  currentQuestionIndex: number;
  question: string;
  answers: Array<string>;
  userAnswer: string | undefined;
  correctAnswer: string;
  onClick: (answer: string, currentQuestionIndex: number) => void;
};

const QuestionCard = ({
  currentQuestionIndex,
  question,
  answers,
  userAnswer,
  correctAnswer,
  onClick,
}: Props) => {
  return (
    <div className="mb-10 mt-2">
      <p
        className="text-[20px] max=w=[400px]"
        dangerouslySetInnerHTML={{ __html: question }}
      />
      <div className="flex flex-col pt-8 gap-3">
        {answers.map((answer) => (
          <div
            key={answer}
            onClick={() => onClick(answer, currentQuestionIndex)}
            className={`${getBGColor(
              userAnswer,
              correctAnswer,
              answer
            )} cursor-pointer flex items-center justify-center select-none font-bold text-xl px-3 py-1.5 rounded-md`}
          >
            <span
              className="truncate"
              dangerouslySetInnerHTML={{ __html: answer }}
            ></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
