import { useEffect, useState } from "react";

interface Props {
  timerStarted: boolean;
  quizCompleted: boolean;
  onTimerComplete: () => void; // Callback para indicar que el temporizador ha completado
}

const Timer: React.FC<Props> = ({
  timerStarted,
  quizCompleted,
  onTimerComplete,
}) => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState("30:00");

  useEffect(() => {
    if (timerStarted) {
      const start = new Date();
      setStartTime(start);

      const end = new Date(start.getTime() + 30 * 60000); // 30 minutos después
      setEndTime(end);

      const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = end.getTime() - now;

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeRemaining(
          `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`
        );

        if (distance < 0) {
          clearInterval(timerInterval);
          setTimeRemaining("00:00");
          if (!quizCompleted) {
            onTimerComplete(); // Llamar a la función para indicar que el temporizador ha completado
          }
        }
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [timerStarted, quizCompleted, onTimerComplete]);

  return (
    <div className="text-left">
      {startTime && (
        <div>
          <strong>Hora de inicio:</strong> {startTime.toLocaleTimeString()}
        </div>
      )}
      {endTime && (
        <div>
          <strong>Hora de finalización:</strong> {endTime.toLocaleTimeString()}
        </div>
      )}
      <div>
        <strong>Tiempo restante:</strong>
      </div>
      <div className="mb-4">
        <span className="text-blue-500 text-3xl">{timeRemaining}</span>
      </div>
    </div>
  );
};

export default Timer;
