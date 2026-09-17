import { useState } from "react";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import { buildReport } from "../utils/scoring";
import { saveLastResult, updateFailedIds, appendHistory } from "../utils/storage";

function QuizScreen({ questions, mode, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState([]);

  const total = questions.length;
  const question = questions[currentIndex];
  const isMulti = question.type === "multiple";
  const isLast = currentIndex === total - 1;

  const recordAnswer = (sel) => {
    setAnswers((prev) => [...prev, { question, selected: sel }]);
  };

  const handleToggle = (i) => {
    if (answered) return;
    if (isMulti) {
      setSelected((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
    } else {
      setSelected([i]);
      setAnswered(true);
      recordAnswer([i]);
    }
  };

  const handleSubmitMultiple = () => {
    if (selected.length === 0 || answered) return;
    setAnswered(true);
    recordAnswer(selected);
  };

  const handleNext = () => {
    if (!isLast) {
      setCurrentIndex((i) => i + 1);
      setSelected([]);
      setAnswered(false);
      return;
    }
    const report = buildReport(answers);
    saveLastResult(report);
    updateFailedIds(report);
    appendHistory(report, mode);
    onFinish(report);
  };

  return (
    <>
      <ProgressBar current={currentIndex} total={total} />

      <QuestionCard
        question={question}
        index={currentIndex}
        total={total}
        selected={selected}
        answered={answered}
        onToggle={handleToggle}
      />

      <div className="btn-row">
        {isMulti && !answered && (
          <button
            type="button"
            className="btn btn--primary btn--block"
            disabled={selected.length === 0}
            onClick={handleSubmitMultiple}
          >
            Enviar respuesta
          </button>
        )}
        {answered && (
          <button type="button" className="btn btn--primary btn--block" onClick={handleNext}>
            {isLast ? "Ver resultados" : "Siguiente"}
          </button>
        )}
      </div>
    </>
  );
}

export default QuizScreen;
