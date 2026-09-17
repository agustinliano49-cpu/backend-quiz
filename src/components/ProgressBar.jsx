function ProgressBar({ current, total }) {
  const percentage = total === 0 ? 0 : Math.round(((current + 1) / total) * 100);

  return (
    <div className="progress-block">
      <div className="progress-meta">
        <span>
          Pregunta <strong>{current + 1}</strong> de {total}
        </span>
        <span>{percentage}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
