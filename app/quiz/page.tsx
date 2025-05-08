import dynamic from "next/dynamic";
import strapi from "../lib/strapi";
interface Question {
  id: number;
  attributes: {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    difficulty: 'easy' | 'medium' | 'hard';
  };
}

const Quiz = dynamic(() => import("@/app/quiz/Quiz"), {
  ssr: false,
});

const QuizPage = async () => {
  const questions = await strapi.get<Question[]>('/api/questions');

  return <Quiz strapiQuestions={questions} />
};

export default QuizPage;
