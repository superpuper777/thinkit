import { shuffleArray } from "@/utils/arrayUtils";
import Quiz from "./Quiz";
import { Difficulty, QuestionsState, Question } from "@/types/quiz";

const TOTAL_QUESTIONS = 10;

const getQuestions = async (amount: number, difficulty:Difficulty): Promise<QuestionsState>
const QuizPage = async () => {
  return <Quiz questions={} totalQuestions={} />;
};
