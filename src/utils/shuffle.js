// Fisher-Yates shuffle, no mutation of the input array.
export function shuffleArray(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Shuffles question order without touching option order.
export function shuffleQuestions(questions) {
  return shuffleArray(questions);
}

// Shuffles a single question's options and remaps `correct` indices to match
// the new order, so the set of correct option texts stays the same.
export function shuffleQuestionOptions(question) {
  const indices = question.opts.map((_, i) => i);
  const shuffledIndices = shuffleArray(indices);

  const opts = shuffledIndices.map((i) => question.opts[i]);
  const correctSet = new Set(question.correct);
  const correct = shuffledIndices.reduce((acc, originalIndex, newIndex) => {
    if (correctSet.has(originalIndex)) acc.push(newIndex);
    return acc;
  }, []);

  return { ...question, opts, correct };
}

// Prepares a full quiz run: shuffles question order, then shuffles each
// question's options independently.
export function prepareQuizQuestions(questions) {
  return shuffleQuestions(questions).map(shuffleQuestionOptions);
}
