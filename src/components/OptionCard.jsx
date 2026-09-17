const LETTERS = "ABCDEFGH";

// state: "normal" | "selected" | "correct" | "incorrect" | "locked"
function OptionCard({ label, index, state, multi, locked, onClick }) {
  const classes = ["option-card", multi ? "is-multi" : ""];
  if (state === "selected") classes.push("is-selected");
  if (state === "correct") classes.push("is-correct");
  if (state === "incorrect") classes.push("is-incorrect");
  if (locked) classes.push("is-locked");

  let markerContent = LETTERS[index] ?? index + 1;
  let icon = null;
  if (state === "correct") icon = "✓";
  if (state === "incorrect") icon = "✕";

  return (
    <button
      type="button"
      className={classes.join(" ").trim()}
      onClick={onClick}
      disabled={locked}
      aria-pressed={state === "selected"}
    >
      <span className="option-marker">{markerContent}</span>
      <span className="option-label">{label}</span>
      {icon && <span className="option-icon">{icon}</span>}
    </button>
  );
}

export default OptionCard;
