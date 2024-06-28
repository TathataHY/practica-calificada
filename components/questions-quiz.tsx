"use client";

import React, { useEffect } from "react";
import { Question } from "../types";

interface Props {
  currentQuestion: Question;
  selectedAnswer: string | undefined;
  onSelectAnswer: (answer: string) => void;
  showAnswer: boolean;
  onNextQuestion: () => void;
  isSkipped: boolean;
}

const QuestionsQuiz: React.FC<Props> = ({
  currentQuestion,
  selectedAnswer,
  onSelectAnswer,
  showAnswer,
  onNextQuestion,
  isSkipped,
}) => {
  useEffect(() => {
    if (selectedAnswer !== undefined) {
      onNextQuestion();
    }
  }, [selectedAnswer, onNextQuestion]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quiz sobre Programación Web</h2>
      {isSkipped && (
        <p className="font-semibold">
          Esta pregunta fue saltada. Vuelve a revisarla más tarde.
        </p>
      )}
      {!isSkipped && (
        <div key={currentQuestion.id} className="mb-4">
          <p className="font-semibold">{currentQuestion.question}</p>
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="ml-4 mt-2">
              <input
                type="radio"
                id={`${currentQuestion.id}-${index}`}
                name={`question-${currentQuestion.id}`}
                value={option}
                checked={selectedAnswer === option}
                onChange={() => onSelectAnswer(option)}
              />
              <label
                htmlFor={`${currentQuestion.id}-${index}`}
                className="ml-2"
              >
                {option}
              </label>
            </div>
          ))}
          {showAnswer && (
            <p className="mt-2">Respuesta correcta: {currentQuestion.answer}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionsQuiz;
