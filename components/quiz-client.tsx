"use client";

import { useEffect, useState } from "react";
import { questions } from "../data/questions";
import Footer from "./footer";
import QuestionsQuiz from "./questions-quiz";
import QuizResults from "./quiz-results";
import Timer from "./timer";

const QuizClient = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [skippedQuestions, setSkippedQuestions] = useState<number[]>([]);
  const [skippedAndShownQuestions, setSkippedAndShownQuestions] = useState<
    number[]
  >([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  const handleNextQuestion = () => {
    let nextIndex = currentQuestionIndex + 1;

    while (
      nextIndex < questions.length &&
      (answers[nextIndex] !== undefined ||
        skippedQuestions.includes(nextIndex) ||
        skippedAndShownQuestions.includes(nextIndex))
    ) {
      nextIndex++;
    }

    setCurrentQuestionIndex(nextIndex);
    setShowAnswer(false);

    if (nextIndex >= questions.length) {
      setQuizCompleted(true);
      setTimerStarted(false);

      // Check if there are any skipped questions left to show
      const nextSkippedQuestion = skippedQuestions.find(
        (q) => !skippedAndShownQuestions.includes(q)
      );
      if (nextSkippedQuestion !== undefined) {
        setCurrentQuestionIndex(nextSkippedQuestion);
        setSkippedAndShownQuestions([
          ...skippedAndShownQuestions,
          nextSkippedQuestion,
        ]);
      }
    } else {
      setTimerStarted(true);
    }
  };

  const handleCheckAnswer = () => {
    setShowAnswer(true);
  };

  const handleSelectAnswer = (questionId: number, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });

    if (!timerStarted) {
      setTimerStarted(true);
    }
  };

  const handleSkipQuestion = () => {
    setSkippedQuestions([...skippedQuestions, currentQuestionIndex]);
    handleNextQuestion();
  };

  const handleTimerComplete = () => {
    setQuizCompleted(true);
  };

  useEffect(() => {
    if (skippedQuestions.includes(currentQuestionIndex)) {
      handleNextQuestion();
    }
  }, [currentQuestionIndex, skippedQuestions]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex md:flex-row text-left">
        <div className="w-full md:w-1/5 pr-4">
          <Timer
            timerStarted={timerStarted}
            quizCompleted={quizCompleted}
            onTimerComplete={handleTimerComplete}
          />
        </div>
        <div className="w-full md:w-4/5 pl-4">
          {currentQuestionIndex < questions.length ? (
            <QuestionsQuiz
              key={currentQuestionIndex}
              currentQuestion={questions[currentQuestionIndex]}
              selectedAnswer={answers[questions[currentQuestionIndex]?.id]}
              onSelectAnswer={(answer) =>
                handleSelectAnswer(questions[currentQuestionIndex]?.id, answer)
              }
              showAnswer={showAnswer}
              onNextQuestion={handleNextQuestion}
              isSkipped={skippedQuestions.includes(currentQuestionIndex)}
            />
          ) : (
            <QuizResults
              answers={answers}
              skippedQuestions={skippedQuestions}
            />
          )}
        </div>
      </div>
      <Footer
        quizCompleted={quizCompleted}
        currentQuestionIndex={currentQuestionIndex}
        onCheckAnswer={handleCheckAnswer}
        onSkipQuestion={handleSkipQuestion}
      />
    </div>
  );
};

export default QuizClient;
