"use client";

import { useState } from "react";
import { questions } from "../data/questions";
import Footer from "./footer";
import QuestionsQuiz from "./questions-quiz";
import QuizResults from "./quiz-results"; // Importamos el componente de resultados
import Timer from "./timer";

const QuizClient = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showAnswer, setShowAnswer] = useState(false); // Estado para mostrar la respuesta correcta
  const [skippedQuestions, setSkippedQuestions] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false); // Estado para controlar si el cuestionario ha sido completado

  const handleNextQuestion = () => {
    let nextIndex = currentQuestionIndex + 1;

    // Avanzar al siguiente índice de pregunta, revisando las preguntas saltadas
    while (
      nextIndex < questions.length &&
      (answers[nextIndex] !== undefined || skippedQuestions.includes(nextIndex))
    ) {
      nextIndex++;
    }

    setCurrentQuestionIndex(nextIndex);
    setShowAnswer(false); // Reiniciar el estado de mostrar respuesta al avanzar a la siguiente pregunta

    if (nextIndex >= questions.length) {
      setQuizCompleted(true); // Marcar el cuestionario como completado
    }
  };

  const handleCheckAnswer = () => {
    // Lógica para comprobar la respuesta
    const correctAnswer = questions[currentQuestionIndex].answer;
    const selectedAnswer = answers[questions[currentQuestionIndex]?.id];
    const isCorrect = selectedAnswer === correctAnswer;
    setShowAnswer(true); // Mostrar la respuesta correcta
  };

  const handleSelectAnswer = (questionId: number, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSkipQuestion = () => {
    // Agregar la pregunta actual al conjunto de preguntas saltadas
    setSkippedQuestions([...skippedQuestions, currentQuestionIndex]);
    handleNextQuestion(); // Avanzar a la siguiente pregunta
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex md:flex-row text-left">
        <div className="w-full md:w-1/5 pr-4">
          <Timer />
        </div>
        <div className="w-full md:w-4/5 pl-4">
          {/* Verificar si todavía hay preguntas disponibles para mostrar */}
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
        currentQuestionIndex={currentQuestionIndex}
        onCheckAnswer={handleCheckAnswer}
        onSkipQuestion={handleSkipQuestion}
        quizCompleted={quizCompleted} // Pasar el estado de cuestionario completado
      />
    </div>
  );
};

export default QuizClient;
