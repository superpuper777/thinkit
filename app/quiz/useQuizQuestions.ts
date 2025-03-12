import { useEffect, useState } from 'react';
import { getQuestions } from '@/app/actions';
import { QuestionsState } from '@/types/quiz';

interface QuizState {
  questions: QuestionsState;
  responseCode: number;
  setQuestions: React.Dispatch<React.SetStateAction<QuestionsState>>;
}
const useQuizQuestions = (
  totalQuestions: number,
  difficulty: string,
  category: string,
  token: string
): QuizState => {
  const [questions, setQuestions] = useState<QuestionsState>([]);
  const [responseCode, setResponseCode] = useState<number>(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { response_code, results } = await getQuestions(
          totalQuestions,
          difficulty,
          category,
          token
        );
        setResponseCode(response_code);
        setQuestions(results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestions();
  }, [totalQuestions, difficulty, category, token]);

  return { questions, responseCode, setQuestions };
};

export default useQuizQuestions;
