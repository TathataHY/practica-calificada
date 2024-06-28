"use client";

import { useEffect, useState } from "react";

const Timer = () => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState("30:00");

  useEffect(() => {
    const start = new Date();
    setStartTime(start);

    const end = new Date(start.getTime() + 30 * 60000); // 30 minutes later
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
        setTimeRemaining("00:00"); // Show 00:00 when time is up
        // Here you could trigger a callback or event when time is up
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  return (
    <div className="text-left">
      <div>
        <strong>Hora de inicio:</strong> {startTime.toLocaleTimeString()}
      </div>
      <div>
        <strong>Hora de finalización:</strong> {endTime.toLocaleTimeString()}
      </div>
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
