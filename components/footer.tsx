"use client";

import { questions } from "../data/questions";

interface Props {
  currentQuestionIndex: number;
  onCheckAnswer: () => void;
  onSkipQuestion: () => void;
  quizCompleted: boolean; // Nuevo prop para indicar si el cuestionario está completado
}

const Footer: React.FC<Props> = ({
  currentQuestionIndex,
  onCheckAnswer,
  onSkipQuestion,
  quizCompleted,
}) => {
  const handleCheckAnswer = () => {
    onCheckAnswer();
  };

  const handleSkipQuestion = () => {
    onSkipQuestion();
  };

  return (
    <footer className="mt-auto flex justify-between p-4 bg-gray-200">
      <div>{`Pregunta ${currentQuestionIndex + 1} de ${questions.length}`}</div>
      <div>
        <button
          onClick={handleSkipQuestion}
          className="px-4 py-2 rounded-md mr-4 bg-gray-300 hover:bg-gray-400"
          disabled={quizCompleted} // Deshabilitar si el cuestionario está completado
        >
          Saltar pregunta
        </button>
        <button
          onClick={handleCheckAnswer}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          disabled={quizCompleted} // Deshabilitar si el cuestionario está completado
        >
          Comprobar respuesta
        </button>
      </div>
    </footer>
  );
};

export default Footer;
