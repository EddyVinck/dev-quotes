import { useEffect, useState } from "react";

export function useTimer(
  intervalRef: React.MutableRefObject<number>,
  timerCallback: () => void,
  intervalTime = 5000
): {
  isTimerRunning: boolean;
  setIsTimerRunning: (newState: boolean) => void;
  toggleLoop: () => void;
} {
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    // Clear the interval when the component will unmount
    return () => clearInterval(intervalRef.current);
  }, [intervalRef]);

  function stopLoopingQuotes(): void {
    setIsTimerRunning(false);
    clearInterval(intervalRef.current);
    intervalRef.current = -1;
  }

  function toggleLoop(): void {
    if (intervalRef.current && intervalRef.current !== -1) {
      stopLoopingQuotes();
      return;
    }

    // Don't make the user wait for the first iteration
    if (isTimerRunning === false) {
      timerCallback();
    }

    setIsTimerRunning(true);
    const interval = window.setInterval(() => {
      timerCallback();
    }, intervalTime);
    intervalRef.current = interval;
  }

  return { isTimerRunning, setIsTimerRunning, toggleLoop };
}
