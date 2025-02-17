const useQuizResults = () => {
  const saveResultsToLocalStorage = (
    score: number,
    allQuestions: number,
    category: string
  ) => {
    const results = {
      score,
      allQuestions,
      category,
      date: new Date().toISOString(),
    };

    const savedResults = localStorage.getItem('quizResults');

    console.log('Saved results from localStorage:', savedResults);

    const resultsArray = savedResults ? JSON.parse(savedResults) : [];
    resultsArray.push(results);

    localStorage.setItem('quizResults', JSON.stringify(resultsArray));

    return isNewRecord(score, allQuestions, category, resultsArray);
  };

  const isNewRecord = (
    score: number,
    allQuestions: number,
    category: string,
    savedResults: Array<{
      score: number;
      allQuestions: number;
      category: string;
    }>
  ) => {
    const resultsForCategoryAndQuestions = savedResults.filter(
      (el) => el.category === category && el.allQuestions === allQuestions
    );
    console.log(
      'Filtered results for category and questions:',
      resultsForCategoryAndQuestions
    );
    const currentMaxScore =
      resultsForCategoryAndQuestions.length > 0
        ? Math.max(...resultsForCategoryAndQuestions.map((item) => item.score))
        : 0;

    console.log('Current max score:', currentMaxScore);

    return score > currentMaxScore;
  };

  return { saveResultsToLocalStorage };
};

export default useQuizResults;
