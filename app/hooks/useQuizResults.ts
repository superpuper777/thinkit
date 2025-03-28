const useQuizResults = () => {
  const saveResultsToLocalStorage = (
    score: number,
    allQuestions: number,
    category: string = '',
    difficulty: string = ''
  ) => {
    if (
      typeof score !== 'number' ||
      typeof allQuestions !== 'number' ||
      typeof category !== 'string' ||
      typeof difficulty !== 'string'
    ) {
      console.error('Incorrect data for saving results.');
      return false;
    }

    const newResult = {
      score,
      allQuestions,
      category,
      difficulty,
      date: new Date().toISOString(),
    };

    try {
      const savedResults = localStorage.getItem('quizResults');
      console.log('Saved results from localStorage:', savedResults);

      const resultsArray = savedResults ? JSON.parse(savedResults) : [];

      const isNew = isNewRecord(
        score,
        allQuestions,
        category,
        difficulty,
        resultsArray
      );

      if (isNew) {
        resultsArray.push(newResult);
        localStorage.setItem('quizResults', JSON.stringify(resultsArray));
        console.log('New record saved:', newResult);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Ошибка при работе с localStorage:', error);
      return false;
    }
  };

  const isNewRecord = (
    score: number,
    allQuestions: number,
    category: string,
    difficulty: string,
    savedResults: Array<{
      score: number;
      allQuestions: number;
      category: string;
      difficulty: string;
    }>
  ) => {
    const filteredResults = savedResults.filter((el) => {
      return (
        el.allQuestions === allQuestions &&
        (el.category === category || category === '') &&
        (el.difficulty === difficulty || difficulty === '')
      );
    });

    console.log(
      'Filtered results for category and questions:',
      filteredResults
    );

    if (filteredResults.length === 0) {
      return true;
    }

    const currentMaxScore = Math.max(
      ...filteredResults.map((item) => item.score)
    );

    console.log('Current max score:', currentMaxScore);

    return score > currentMaxScore;
  };

  return { saveResultsToLocalStorage };
};

export default useQuizResults;
