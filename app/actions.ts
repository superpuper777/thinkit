"use server";

import { Token } from "@/types/quiz";

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
  const res = await fetch(endpoint, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
