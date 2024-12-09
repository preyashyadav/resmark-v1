import React, { useState, useEffect } from "react";
import "./Quiz.css";

const Quiz = () => {
  const classes = ["Test - Atrium 200", "ECS 289", "ECS 265"];
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Added state for error message

  const quizzes = [
    {
      quizId: "Quiz#1",
      classId: "Test - Atrium 200",
      questions: [
        {
          questionText:
            "Unlike Bitcoin, forks are possible in the PBFT protocol.",
          answerOptions: [
            { answerText: "True", isCorrect: false },
            { answerText: "False", isCorrect: true },
          ],
        },
        {
          questionText:
            "What is the minimum number of replicas needed in PBFT to tolerate f faults?",
          answerOptions: [
            { answerText: "f+1", isCorrect: false },
            { answerText: "2f+1", isCorrect: false },
            { answerText: "3f+1", isCorrect: true },
          ],
        },
        {
          questionText:
            "How many phases of quadratic communication (all-to-all) are in the PBFT protocol to commit a transaction?",
          answerOptions: [
            { answerText: "1", isCorrect: false },
            { answerText: "2", isCorrect: true },
            { answerText: "3", isCorrect: false },
          ],
        },
        {
          questionText:
            "What is the purpose of the prepare phase in the PBFT protocol?",
          answerOptions: [
            {
              answerText: "To ensure the client’s request is valid.",
              isCorrect: true,
            },
            {
              answerText:
                "To ensure that the primary proposed the same client’s request to the majority of replicas.",
              isCorrect: false,
            },
            {
              answerText:
                "To ensure that the primary proposed the same client’s request to the majority of non-faulty replicas.",
              isCorrect: false,
            },
            { answerText: "None of the above.", isCorrect: false },
          ],
        },
      ],
    },
    {
      quizId: "Quiz#2",
      classId: "Test - Atrium 200",
      questions: [
        {
          questionText:
            "In PBFT, it is possible to form conflicting prepared quorums in the same round by the same leader?",
          answerOptions: [
            { answerText: "True", isCorrect: false },
            { answerText: "False", isCorrect: true },
          ],
        },
        {
          questionText:
            "In PBFT, how many non-faulty replicas are required to form a quorum?",
          answerOptions: [
            { answerText: "1", isCorrect: false },
            { answerText: "f+1", isCorrect: true },
            { answerText: "f+2", isCorrect: false },
            { answerText: "f+3", isCorrect: false },
          ],
        },
        {
          questionText:
            "In PBFT, how many non-faulty replicas are guaranteed to be found at the intersection of any quorums?",
          answerOptions: [
            { answerText: "1", isCorrect: true },
            { answerText: "f+1", isCorrect: false },
            { answerText: "2f+1", isCorrect: false },
            { answerText: "3f+1", isCorrect: false },
          ],
        },
        {
          questionText:
            "What is the purpose of the commit phase in the PBFT protocol?",
          answerOptions: [
            {
              answerText:
                "To ensure that the primary proposed the same client’s request to the majority of replicas.",
              isCorrect: false,
            },
            {
              answerText:
                "To ensure that the majority of replicas have been prepared.",
              isCorrect: true,
            },
            {
              answerText:
                "To ensure that the primary has proposed a valid client’s request.",
              isCorrect: false,
            },
            { answerText: "None of the above.", isCorrect: false },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    let interval;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const handleClassSelect = (classId) => {
    if (classId !== "Test - Atrium 200") {
      setErrorMessage("Quiz can only be given from the class proximity");
      setSelectedClass(null);
      setSelectedQuiz(null);
    } else {
      setSelectedClass(classId);
      setErrorMessage("");
    }
  };

  const handleQuizSelect = (quizId) => {
    const quiz = quizzes.find(
      (quiz) => quiz.quizId === quizId && quiz.classId === selectedClass
    );
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(60);
    setIsTimerRunning(true);
  };

  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < selectedQuiz.questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(60);
    } else {
      setShowScore(true);
      setIsTimerRunning(false);
    }
  };

  const restartQuiz = () => {
    setSelectedQuiz(null);
    setSelectedClass(null);
    setScore(0);
    setShowScore(false);
    setTimeLeft(60);
    setIsTimerRunning(false);
    setErrorMessage(""); // Clear any error message
  };

  return (
    <div className="quiz-cover">
      <div className="quiz-container">
        {!selectedClass && (
          <div className="class-selection">
            <h2 className="selection-text">Select Class: </h2>
            {classes.map((classItem) => (
              <button
                key={classItem}
                onClick={() => handleClassSelect(classItem)}
                className="class-button"
              >
                {classItem.toUpperCase()}
              </button>
            ))}
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
          </div>
        )}

        {selectedClass && !selectedQuiz && (
          <div className="quiz-selection">
            <h2 className="selection-text">Select Quiz for {selectedClass}</h2>
            {quizzes
              .filter((quiz) => quiz.classId === selectedClass)
              .map((quiz, index) => (
                <button
                  key={index}
                  onClick={() => handleQuizSelect(quiz.quizId)}
                  className="quiz-button"
                >
                  {quiz.quizId}
                </button>
              ))}
          </div>
        )}

        {selectedQuiz && !showScore && (
          <div className="quiz-section">
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${
                    ((currentQuestion + 1) / selectedQuiz.questions.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
            <div className="timer">Time left: {timeLeft} seconds</div>
            <div className="question-section">
              <div className="question-count">
                Question {currentQuestion + 1} / {selectedQuiz.questions.length}
              </div>
              <div className="question-text">
                {selectedQuiz.questions[currentQuestion].questionText}
              </div>
            </div>
            <div className="answer-section">
              {selectedQuiz.questions[currentQuestion].answerOptions.map(
                (answerOption, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleAnswerButtonClick(answerOption.isCorrect)
                    }
                    className="answer-button"
                  >
                    {answerOption.answerText}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {showScore && (
          <div className="score-section">
            You scored {score} out of {selectedQuiz?.questions.length}
            <br />
            <button onClick={restartQuiz} className="restart-button">
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
