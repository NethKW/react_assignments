import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Assignment_20.css";
import quizIcon from "../assets/quiz.png";
import questionIcon from "../assets/question.png";
import FinalIcon from "../assets/finish.png";


// eslint-disable-next-line react-refresh/only-export-components
function StartScreen({ onStart }) {
  return (
    <div className="asg-20 quiz-start">
      <div>
        <img src={quizIcon} alt="quiz" className="quizIcon" />
      </div>
      <div className="intro">
        <h1>Welcome to the React Quiz...</h1>
        <h3>
          The quiz has a total of 10 questions, and you can click on the answers
          to move to the next question.
        </h3>
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
  const [userAnswers, setUserAnswers] = useState([]);
  const currentQuestion = questions[currentIndex];

  const handleAnswer = (selectedIndex) => {
    const isCorrect = selectedIndex === currentQuestion.correct;
    if (isCorrect) setScore((prev) => prev + 1);

    setUserAnswers((prev) => [...prev, selectedIndex]);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onFinish(score + (isCorrect ? 1 : 0), [...userAnswers, selectedIndex]);
    }
  };

  return (
    <div className="asg-20 quiz">
      <img src={questionIcon} alt="questionIcon" className="questionIcon" />
      <h2>Question {currentIndex + 1}</h2>
      <div className="question">
        <h3>{currentQuestion.question}</h3>
        <div className="color-select">
          {currentQuestion.answers.map((ans, i) => (
            <button
              key={i}
              className="quiz-btn"
              onClick={() => handleAnswer(i)}
            >
              {ans}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
function ReviewScreen({ questions, userAnswers, onFinishReview }) {
  const [index, setIndex] = useState(0);
  const q = questions[index];

  const handleNextClick = () => {
    if (index + 1 < questions.length) setIndex(index + 1);
  };

  const handlePrevClick = () => {
    if (index - 1 >= 0) setIndex(index - 1);
  };

  return (
    <div className="asg-20 quiz">
      <h2>
        Review {index + 1} / {questions.length}
      </h2>
      <div className="question-review">
        <h3>{q.question}</h3>
        <div className="quiz-review">
          {q.answers.map((ans, i) => {
            const correct = q.correct;
            const userAnswer = userAnswers[index];

            let color = "black";
            if (i === correct) color = "green";
            if (i === userAnswer && i !== correct) color = "red";

            return (
              <p key={i} style={{ color }}>
                {ans}
              </p>
            );
          })}
        </div>
        <div className="quiz-button-section">
          <button
            className="quiz-btn"
            onClick={handlePrevClick}
            disabled={index === 0}
          >
            Previous
          </button>
          <button
            className="quiz-btn"
            onClick={handleNextClick}
            disabled={index === questions.length - 1}
          >
            Next
          </button>
          <button className="quiz-btn" onClick={onFinishReview}>
            Finish Review
          </button>
        </div>

      </div>
    </div>
  );
}

function Assignment_20() {
  const [quizData, setQuizData] = useState([]);
  const [start, setStart] = useState(false);
  const [finalScore, setFinalScore] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [reviewMode, setReviewMode] = useState(false);

  useEffect(() => {
    axios
      .get("https://apis.dnjs.lk/objects/quiz.php")
      .then((res) => setQuizData(res.data))
      .catch((err) => console.error("Error loading quiz:", err));
  }, []);

  const handleFinish = (score, answers) => {
    setFinalScore(score);
    setUserAnswers(answers);
    setStart(false);
  };

  if (reviewMode) {
    return (
      <div className="main asg-20">
        <ReviewScreen
          questions={quizData}
          userAnswers={userAnswers}
          onFinishReview={() => setReviewMode(false)}
        />
      </div>
    );
  }

  if (finalScore !== null && !start) {
    return (
      <div className="main asg-20">
        <div className="question">
          <img src={FinalIcon} alt="FinalIcon" className="quizIcon" />
          <h1>Quiz Finished!</h1>
          <h2>
            Your Score: {finalScore} / {quizData.length}
          </h2>
          <button className="quiz-btn" onClick={() => setReviewMode(true)}>
            Review Answers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main asg-20">
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

export default Assignment_20;
