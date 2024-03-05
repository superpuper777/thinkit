import dynamic from "next/dynamic";

const Quiz = dynamic(() => import("@/app/quiz/Quiz"), { ssr: false });

const QuizPage = async () => {
  return <Quiz />;
};

export default QuizPage;
