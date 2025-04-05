"use server";

import {
  Difficulty,
  QuestionsState,
  Token,
  Category,
  QuestionsResponse,
} from "@/types/quiz";
import { shuffleArray } from "@/utils/arrayUtils";

const apiUrl = process.env.API_URL;

export const getQuestions = async (
  amount: number | string,
  difficulty: Difficulty | string,
  category: Category | string,
  token: string
): Promise<QuestionsResponse> => {
  const getData = async () => {
    const endpoint = `${apiUrl}api.php?amount=${amount}&difficulty=${difficulty}&category=${category}&type=multiple&token=${token}`;
    const res = await fetch(endpoint, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  };

  const data: { response_code: number; results: QuestionsState } =
    await getData();
  return {
    response_code: data.response_code,
    results: data.results.map((question) => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    })),
  };
};

export const resetToken = async (token: string): Promise<Token> => {
  const endpoint = `${apiUrl}api_token.php?command=reset&token=${token}`;
  const res = await fetch(endpoint, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getToken = async (): Promise<Token> => {
  const endpoint = `${apiUrl}api_token.php?command=request`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
