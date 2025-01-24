import { useState, useRef, useCallback, useEffect } from "react";

function useCountDown(secs: number) {
  const [timeLeft, setTimeLeft] = useState(secs);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start countdown
  const startCountdown = useCallback(() => {
    if (!isActive && !isFinished) {
      setIsActive(true);
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            setIsActive(false);
            setIsFinished(true);
            clearInterval(intervalRef.current as NodeJS.Timeout);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [isActive, isFinished]);

  // Pause countdown
  const pauseCountdown = useCallback(() => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  // Reset countdown to initial state
  const resetCountdown = useCallback(() => {
    setIsActive(false);
    setIsFinished(false);
    setTimeLeft(secs);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [secs]);

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Calculate minutes and seconds in MM:SS format
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return {
    minutes,
    seconds,
    isActive,
    isFinished,
    startCountdown,
    pauseCountdown,
    resetCountdown,
  };
}

export { useCountDown };
