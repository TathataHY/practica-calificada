// quiz-results.tsx

import React from "react";
import { questions } from "../data/questions";

interface Props {
  answers: { [key: number]: string };
  skippedQuestions: number[];
}

const QuizResults: React.FC<Props> = ({ answers, skippedQuestions }) => {
  const calculateResults = () => {
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    questions.forEach((question) => {
      const questionId = question.id;
      const correctAnswer = question.answer;
      const userAnswer = answers[questionId];

      if (skippedQuestions.includes(questionId)) {
        unansweredCount++;
      } else if (userAnswer === correctAnswer) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const totalQuestions = questions.length;
    const answeredQuestions = totalQuestions - skippedQuestions.length;
    const percentage = (correctCount / answeredQuestions) * 100;

    // Calculamos el porcentaje en base a 20 preguntas respondidas
    const percentageOutOf20 = (percentage / 100) * 20;

    return { correctCount, incorrectCount, unansweredCount, percentageOutOf20 };
  };

  const { correctCount, incorrectCount, unansweredCount, percentageOutOf20 } =
    calculateResults();

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Resultados del Quiz</h2>
      <div className="mb-4">
        <p className="font-semibold">Respuestas Correctas: {correctCount}</p>
        <p className="font-semibold">
          Respuestas Incorrectas: {incorrectCount}
        </p>
        <p className="font-semibold">
          Preguntas sin responder: {unansweredCount}
        </p>
        <p className="font-semibold">
          Nota en porcentaje (1 al 20): {percentageOutOf20.toFixed(2)}
        </p>
      </div>
      <p>¡Gracias por completar el cuestionario!</p>
    </div>
  );
};

export default QuizResults;
