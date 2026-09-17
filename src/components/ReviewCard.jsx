import { useState } from "react";

function ReviewCard({ entry }) {
  const [open, setOpen] = useState(false);
  const { question, selected, correct } = entry;

  const selectedText = selected.map((i) => question.opts[i]).join(" · ") || "(sin respuesta)";
  const correctText = question.correct.map((i) => question.opts[i]).join(" · ");

  return (
    <div className="review-card">
      <button type="button" className="review-card-header" onClick={() => setOpen((o) => !o)}>
        <span className={`review-status-dot ${correct ? "is-correct" : "is-incorrect"}`}>
          {correct ? "✓" : "✕"}
        </span>
        <span className="review-header-text">
          <span className="review-header-title">{question.text}</span>
          <span className="review-header-sub">
            {question.topic} · {question.difficulty}
          </span>
        </span>
        <span className={`review-chevron ${open ? "is-open" : ""}`}>⌄</span>
      </button>

      {open && (
        <div className="review-card-body">
          <div className={`review-answer-row ${correct ? "" : "review-answer-row--chosen"}`}>
            <strong>Tu respuesta:</strong> {selectedText}
          </div>
          {!correct && (
            <div className="review-answer-row review-answer-row--correct">
              <strong>Respuesta correcta:</strong> {correctText}
            </div>
          )}
          <div className="review-explanation">{question.explanation}</div>
        </div>
      )}
    </div>
  );
}

export default ReviewCard;
