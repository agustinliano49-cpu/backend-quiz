// A question is correct when the selected-option set exactly equals the
// correct-option set (order independent).
export function isAnswerCorrect(question, selectedIndices) {
  const correct = question.correct;
  if (selectedIndices.length !== correct.length) return false;
  const correctSet = new Set(correct);
  return selectedIndices.every((i) => correctSet.has(i));
}

// Builds the final report from a list of { question, selected } answers.
export function buildReport(answers) {
  const total = answers.length;
  let correctCount = 0;

  const byTopic = {};
  const byDifficulty = {};

  const review = answers.map(({ question, selected }) => {
    const correct = isAnswerCorrect(question, selected);
    if (correct) correctCount++;

    const topicStats = (byTopic[question.topic] ??= { correct: 0, total: 0 });
    topicStats.total++;
    if (correct) topicStats.correct++;

    const diffStats = (byDifficulty[question.difficulty] ??= {
      correct: 0,
      total: 0,
    });
    diffStats.total++;
    if (correct) diffStats.correct++;

    return {
      questionId: question.id,
      question,
      selected,
      correct,
    };
  });

  const incorrectCount = total - correctCount;
  const percentage = total === 0 ? 0 : Math.round((correctCount / total) * 100);

  return {
    total,
    correctCount,
    incorrectCount,
    percentage,
    byTopic,
    byDifficulty,
    review,
    finishedAt: new Date().toISOString(),
  };
}
