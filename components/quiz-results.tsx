"use client";

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

    return { correctCount, incorrectCount, unansweredCount };
  };

  const { correctCount, incorrectCount, unansweredCount } = calculateResults();

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
      </div>
      <p>¡Gracias por completar el cuestionario!</p>
    </div>
  );
};

export default QuizResults;
