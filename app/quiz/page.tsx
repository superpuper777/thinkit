import { shuffleArray } from "@/utils/arrayUtils";
import Quiz from "./Quiz";
import { Difficulty, QuestionsState, Question } from "@/types/quiz";

const TOTAL_QUESTIONS = 10;

const getQuestions = async (
  amount: number,
  difficulty: Difficulty
): Promise<QuestionsState> => {
  const getData = async () => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const res = await fetch(endpoint, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  };

  const data: { results: Array<Question> } = await getData();
  return data.results.map((question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};

const QuizPage = async () => {
  const questions = await getQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
  return <Quiz questions={questions} totalQuestions={TOTAL_QUESTIONS} />;
};

export default QuizPage;
