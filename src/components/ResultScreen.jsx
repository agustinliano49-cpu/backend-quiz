import ReviewCard from "./ReviewCard";
import { getFailedIds } from "../utils/storage";

const MODE_LABEL = {
  practice: "Cuestionario",
  full: "Simulacro completo",
  failed: "Práctica de falladas",
};

function BreakdownSection({ title, stats }) {
  const rows = Object.entries(stats).map(([label, s]) => ({
    label,
    percentage: s.total === 0 ? 0 : Math.round((s.correct / s.total) * 100),
    correct: s.correct,
    total: s.total,
  }));

  return (
    <div className="breakdown-section">
      <p className="breakdown-title">{title}</p>
      {rows.map((row) => (
        <div className="breakdown-row" key={row.label}>
          <span className="breakdown-label">{row.label}</span>
          <div className="breakdown-bar-track">
            <div className="breakdown-bar-fill" style={{ width: `${row.percentage}%` }} />
          </div>
          <span className="breakdown-value">
            {row.correct}/{row.total}
          </span>
        </div>
      ))}
    </div>
  );
}

function ResultScreen({ report, mode, onRestart, onPracticeFailed }) {
  if (!report) return null;

  const failedCount = getFailedIds().length;

  return (
    <>
      <div className="glass-card anim-fade-in">
        <div className="result-hero">
          <span className="badge">{MODE_LABEL[mode] ?? "Cuestionario"}</span>
          <span className="result-score">{report.percentage}%</span>
          <p className="app-subtitle">
            {report.correctCount} de {report.total} respuestas correctas
          </p>
        </div>

        <div className="stat-grid">
          <div className="stat-card">
            <span className="stat-card-value is-correct">{report.correctCount}</span>
            <span className="stat-card-label">Correctas</span>
          </div>
          <div className="stat-card">
            <span className="stat-card-value is-incorrect">{report.incorrectCount}</span>
            <span className="stat-card-label">Incorrectas</span>
          </div>
          <div className="stat-card">
            <span className="stat-card-value">{report.percentage}%</span>
            <span className="stat-card-label">Puntaje</span>
          </div>
        </div>

        <hr className="divider" />

        <BreakdownSection title="Resultado por tema" stats={report.byTopic} />
        <BreakdownSection title="Resultado por dificultad" stats={report.byDifficulty} />

        <hr className="divider" />

        <div className="btn-row btn-row--stack">
          <button type="button" className="btn btn--primary btn--block" onClick={onRestart}>
            Volver al inicio
          </button>
          {failedCount > 0 && (
            <button type="button" className="btn btn--secondary btn--block" onClick={onPracticeFailed}>
              Practicar preguntas falladas ({failedCount})
            </button>
          )}
        </div>
      </div>

      <div className="glass-card anim-fade-in">
        <p className="breakdown-title">Revisión pregunta por pregunta</p>
        <div className="option-list">
          {report.review.map((entry) => (
            <ReviewCard key={entry.questionId} entry={entry} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ResultScreen;
