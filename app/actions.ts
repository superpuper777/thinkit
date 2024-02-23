"use server";

import {
  Difficulty,
  QuestionsState,
  Question,
  Token,
  Category,
} from "@/types/quiz";
import { shuffleArray } from "@/utils/arrayUtils";

export const getQuestions = async (
  amount: number | string,
  difficulty: Difficulty | string,
  category: Category | string,
  token: string
): Promise<QuestionsState> => {
  const getData = async () => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=${category}&type=multiple&token=${token}`;
    const res = await fetch(endpoint, { cache: "no-store" });
    console.log(res);
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

export const resetToken = async (token: string): Promise<Token> => {
  const endpoint = `https://opentdb.com/api_token.php?command=reset&token=${token}`;
  const res = await fetch(endpoint, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getToken = async (): Promise<Token> => {
  const endpoint = `https://opentdb.com/api_token.php?command=request`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
