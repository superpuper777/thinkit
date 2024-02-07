import { shuffleArray } from "@/utils/arrayUtils";
import Quiz from "./Quiz";
import { Difficulty, QuestionsState, Question, Token } from "@/types/quiz";

const TOTAL_QUESTIONS = 10;

const getQuestions = async (
  amount: number,
  difficulty: Difficulty,
  token: string
): Promise<QuestionsState> => {
  const getData = async () => {
    console.log("token", token);
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple&token=${token}`;
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

const getToken = async (): Promise<Token> => {
  const endpoint = `https://opentdb.com/api_token.php?command=request`;
  const res = await fetch(endpoint, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const QuizPage = async () => {
  const { token } = await getToken();
  console.log(token);
  const questions = await getQuestions(TOTAL_QUESTIONS, Difficulty.EASY, token);
  console.log(questions);
  return (
    <Quiz
      questions={questions}
      totalQuestions={TOTAL_QUESTIONS}
      currentToken={token}
    />
  );
};

export default QuizPage;
