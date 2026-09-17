import { useState } from "react";
import { questions } from "./data/questions";
import { prepareQuizQuestions } from "./utils/shuffle";
import { getFailedIds } from "./utils/storage";
import StartScreen from "./components/StartScreen";
import QuizScreen from "./components/QuizScreen";
import ResultScreen from "./components/ResultScreen";

function App() {
  const [screen, setScreen] = useState("start");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizMode, setQuizMode] = useState("practice");
  const [report, setReport] = useState(null);

  const startQuiz = (pool, mode) => {
    setQuizQuestions(prepareQuizQuestions(pool));
    setQuizMode(mode);
    setScreen("quiz");
  };

  const finishQuiz = (finishedReport) => {
    setReport(finishedReport);
    setScreen("result");
  };

  const restart = () => setScreen("start");

  const practiceFailed = () => {
    const failedIds = new Set(getFailedIds());
    const pool = questions.filter((q) => failedIds.has(q.id));
    startQuiz(pool, "failed");
  };

  return (
    <div className="app-shell">
      <div className="app-container">
        {screen === "start" && (
          <StartScreen
            questions={questions}
            onStart={startQuiz}
            onPracticeFailed={practiceFailed}
          />
        )}
        {screen === "quiz" && (
          <QuizScreen questions={quizQuestions} mode={quizMode} onFinish={finishQuiz} />
        )}
        {screen === "result" && (
          <ResultScreen
            report={report}
            mode={quizMode}
            onRestart={restart}
            onPracticeFailed={practiceFailed}
          />
        )}
      </div>
    </div>
  );
}

export default App;
