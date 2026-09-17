// Generic pill-chip filter group, reused for topic and difficulty selection.
function TopicFilter({ label, options, value, onChange }) {
  return (
    <div className="filter-group">
      <span className="filter-label">{label}</span>
      <div className="filter-options">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`filter-chip${value === opt.value ? " is-active" : ""}`}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TopicFilter;
