import { useMemo, useState } from "react";
import TopicFilter from "./TopicFilter";
import { getFailedIds, getLastResult, getPreferences, savePreferences } from "../utils/storage";

function StartScreen({ questions, onStart, onPracticeFailed }) {
  const prefs = useMemo(() => getPreferences(), []);
  const [topic, setTopic] = useState(prefs.topic ?? "all");
  const [difficulty, setDifficulty] = useState(prefs.difficulty ?? "all");

  const topics = useMemo(() => {
    const set = new Set(questions.map((q) => q.topic));
    return [{ value: "all", label: "Todos" }, ...[...set].sort().map((t) => ({ value: t, label: t }))];
  }, [questions]);

  const difficulties = [
    { value: "all", label: "Todas" },
    { value: "básica", label: "Básica" },
    { value: "media", label: "Media" },
    { value: "alta", label: "Alta" },
  ];

  const filtered = useMemo(
    () =>
      questions.filter(
        (q) => (topic === "all" || q.topic === topic) && (difficulty === "all" || q.difficulty === difficulty)
      ),
    [questions, topic, difficulty]
  );

  const failedCount = getFailedIds().length;
  const lastResult = getLastResult();

  const updateTopic = (value) => {
    setTopic(value);
    savePreferences({ topic: value, difficulty });
  };

  const updateDifficulty = (value) => {
    setDifficulty(value);
    savePreferences({ topic, difficulty: value });
  };

  return (
    <div className="glass-card anim-fade-in">
      <div className="app-header">
        <span className="badge">Backend de Aplicaciones</span>
        <h1 className="app-title">Cuestionario de Backend de Aplicaciones</h1>
        <p className="app-subtitle">
          Practicá para el parcial de Java: preguntas de opción única y múltiple, con revisión y
          explicación al instante.
        </p>
      </div>

      <hr className="divider" />

      <div className="info-row">
        <div className="info-stat">
          <span className="info-stat-value">{questions.length}</span>
          <span className="info-stat-label">Preguntas totales</span>
        </div>
        <div className="info-stat">
          <span className="info-stat-value">{filtered.length}</span>
          <span className="info-stat-label">Con estos filtros</span>
        </div>
        {lastResult && (
          <div className="info-stat">
            <span className="info-stat-value">{lastResult.percentage}%</span>
            <span className="info-stat-label">Último resultado</span>
          </div>
        )}
      </div>

      <hr className="divider" />

      <TopicFilter label="Tema" options={topics} value={topic} onChange={updateTopic} />
      <TopicFilter label="Dificultad" options={difficulties} value={difficulty} onChange={updateDifficulty} />

      <hr className="divider" />

      <div className="btn-row btn-row--stack">
        <button
          type="button"
          className="btn btn--primary btn--block"
          disabled={filtered.length === 0}
          onClick={() => onStart(filtered, "practice")}
        >
          Iniciar cuestionario ({filtered.length})
        </button>
        <button
          type="button"
          className="btn btn--secondary btn--block"
          onClick={() => onStart(questions, "full")}
        >
          Iniciar simulacro completo ({questions.length})
        </button>
        {failedCount > 0 && (
          <button type="button" className="btn btn--ghost btn--block" onClick={onPracticeFailed}>
            Practicar preguntas falladas ({failedCount})
          </button>
        )}
      </div>

      <p className="footer-note">El orden de las preguntas y de las opciones cambia en cada intento.</p>
    </div>
  );
}

export default StartScreen;
