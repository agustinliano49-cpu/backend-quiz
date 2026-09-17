import OptionCard from "./OptionCard";
import { isAnswerCorrect } from "../utils/scoring";

function QuestionCard({ question, index, total, selected, answered, onToggle }) {
  const correctSet = new Set(question.correct);
  const isMulti = question.type === "multiple";
  const overallCorrect = answered ? isAnswerCorrect(question, selected) : null;

  return (
    <div className="glass-card question-card anim-fade-in" key={question.id}>
      <div className="question-meta-row">
        <span className="question-number">
          Pregunta {index + 1} de {total}
        </span>
        <div className="chip-row">
          <span className="chip chip--topic">{question.topic}</span>
          <span className={`chip chip--${question.difficulty === "básica" ? "basica" : question.difficulty}`}>
            {question.difficulty}
          </span>
          <span className="chip chip--type">{isMulti ? "Respuesta múltiple" : "Respuesta única"}</span>
        </div>
      </div>

      <p className="question-text">{question.text}</p>

      {isMulti && !answered && (
        <div className="multi-hint">
          <span className="multi-hint-text">Podés marcar más de una opción.</span>
        </div>
      )}

      <div className="option-list">
        {question.opts.map((opt, i) => {
          let state = "normal";
          if (!answered) {
            state = selected.includes(i) ? "selected" : "normal";
          } else if (correctSet.has(i)) {
            state = "correct";
          } else if (selected.includes(i)) {
            state = "incorrect";
          } else {
            state = "normal";
          }
          return (
            <OptionCard
              key={i}
              index={i}
              label={opt}
              state={state}
              multi={isMulti}
              locked={answered}
              onClick={() => onToggle(i)}
            />
          );
        })}
      </div>

      {answered && (
        <div
          className={`feedback-banner anim-fade-in ${
            overallCorrect ? "feedback-banner--correct" : "feedback-banner--incorrect"
          }`}
        >
          <span className="feedback-icon">{overallCorrect ? "🎉" : "📌"}</span>
          <div>
            <p className="feedback-title">
              {overallCorrect ? "¡Correcto!" : "No era esa la respuesta correcta"}
            </p>
            <p>{question.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
