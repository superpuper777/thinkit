export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: Difficulty;
  incorrect_answers: Array<string>;
  question: string;
  type: string;
};

export type QuestionsResponse = {
  results: Array<Question>;
  response_code: number;
};

export type QuestionsState = Array<Question & { answers: Array<string> }>;

export type Token = {
  response_code: number;
  response_message: string;
  token: string;
};

export type Category = {
  id: number;
  name: string;
};

export type Categories = {
  trivia_categories: Array<Category>;
};
