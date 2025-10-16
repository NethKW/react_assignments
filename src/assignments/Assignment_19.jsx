import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Assignment_19.css";
import quizIcon from "../assets/quiz.png";
import questionIcon from "../assets/question.png";
import FinalIcon from "../assets/finish.png";

// eslint-disable-next-line react-refresh/only-export-components
function StartScreen({ onStart }) {
  return (
    <div className="asg-19 quiz-start">
      <div>
        <img src={quizIcon} alt="quiz" className="quizIcon" />
      </div>
      <div className="intro">
        <h1>Welcome to the React Quiz...</h1>
        <h3>The quiz has a total of 10 questions, and you can click on the answers to move to the next question.</h3>
        <button className="quiz-btn" onClick={onStart}>
          Start Quiz
        </button>
      </div>

    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
function QuizStart({ questions, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const currentQuestion = questions[currentIndex];

  const handleAnswer = (selectedIndex) => {

    if (selectedIndex === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onFinish(score + (selectedIndex === currentQuestion.correct ? 1 : 0));
    }
  };

  return (
    <div className="asg-19 quiz">
      <img src={questionIcon} alt="questionIcon" className="questionIcon" />
      <h2>
        Question {currentIndex + 1}
      </h2>
      <div className="question">
        <h3>{currentQuestion.question}</h3>
        <div className="color-select">
          {currentQuestion.answers.map((answers, i) => (
            <button key={i} className="quiz-btn" onClick={() => handleAnswer(i)} >
              {answers}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}


function Assignment_19() {
  const [quizData, setQuizData] = useState([]);
  const [start, setStart] = useState(false);
  const [finalScore, setFinalScore] = useState(null);

  useEffect(() => {
    axios
      .get("https://apis.dnjs.lk/objects/quiz.php")
      .then((res) => setQuizData(res.data))
      .catch((err) => console.error("Error loading quiz:", err));
  }, []);

  const handleFinish = (score) => {
    setFinalScore(score);
    setStart(false);
  };

  if (finalScore !== null) {
    return (
      <div className="main asg-19">
        <div className="question">
          <img src={FinalIcon} alt="FinalIcon" className="quizIcon" />
          <h1>Quiz Finished!</h1>
          <h2>Your Score: {finalScore} / {quizData.length}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="main asg-19">
      {!start ? (
        <StartScreen onStart={() => setStart(true)} />
      ) : quizData.length > 0 ? (
        <QuizStart questions={quizData} onFinish={handleFinish} />
      ) : (
        <h2>Loading questions...</h2>
      )}
    </div>
  );
}

export default Assignment_19;
