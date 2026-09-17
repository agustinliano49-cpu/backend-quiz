const KEYS = {
  LAST_RESULT: "bq_last_result",
  FAILED_IDS: "bq_failed_ids",
  HISTORY: "bq_history",
  PREFERENCES: "bq_preferences",
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable (private mode, quota, etc). Fail silently.
  }
}

export function getLastResult() {
  return read(KEYS.LAST_RESULT, null);
}

export function saveLastResult(report) {
  write(KEYS.LAST_RESULT, report);
}

export function getFailedIds() {
  return read(KEYS.FAILED_IDS, []);
}

// Adds ids of questions answered incorrectly and removes ids of questions
// answered correctly, so the failed-question pool reflects current mastery.
export function updateFailedIds(report) {
  const current = new Set(getFailedIds());
  for (const entry of report.review) {
    if (entry.correct) current.delete(entry.questionId);
    else current.add(entry.questionId);
  }
  const updated = [...current];
  write(KEYS.FAILED_IDS, updated);
  return updated;
}

export function getHistory() {
  return read(KEYS.HISTORY, []);
}

export function appendHistory(report, mode) {
  const history = getHistory();
  const entry = {
    date: report.finishedAt,
    mode,
    total: report.total,
    correctCount: report.correctCount,
    percentage: report.percentage,
  };
  const updated = [entry, ...history].slice(0, 50);
  write(KEYS.HISTORY, updated);
  return updated;
}

export function getPreferences() {
  return read(KEYS.PREFERENCES, { topic: "all", difficulty: "all" });
}

export function savePreferences(prefs) {
  write(KEYS.PREFERENCES, prefs);
}
