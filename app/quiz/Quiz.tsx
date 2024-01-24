"use client";

import React from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button/Button";

import { QuestionsState } from "@/types/quiz";

type Props = {
  questions: QuestionsState;
  totalQuestions: number;
};

const Quiz = ({ questions, totalQuestions }: Props) => {
  return <div>Quiz Component</div>;
};

export default Quiz;
