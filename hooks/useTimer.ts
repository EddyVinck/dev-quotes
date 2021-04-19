import { useEffect, useRef, useState } from "react";

/**
 * Misschien dit allemaal weer verwijderen en het wat minder herbruikbaar maken
 * Hierdoor kan ik het versimpelen en weer uit elkaar trekken
 *
 * Meer doelgerichte hook:
 * 1) fetch quote en start timer(s)
 * 2) alles updaten
 * 3) timers stoppen
 * 4) timers starten
 */

// ! improvement: use Date.now() here instead for accurate time left
export function useTimer(
  timerCallback: () => void,
  intervalTime = 5000,
  shouldCalculateTimeLeft = false // false by default for performance
): {
  isTimerRunning: boolean;
  setIsTimerRunning: (newState: boolean) => void;
  toggleLoop: (() => void) | (() => Promise<unknown>);
  timeLeft: number;
} {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(intervalTime);
  const callbackIntervalRef = useRef<number>(-1);
  const timeLeftIntervalRef = useRef<number>(-1);
  const [isCallbackRunning, setIsCallbackRunning] = useState(false);

  const calculateTimeInterval = 50;
  useEffect(() => {
    const shouldResetTimeLeft =
      (shouldCalculateTimeLeft &&
        isTimerRunning === false &&
        timeLeft !== intervalTime) ||
      isCallbackRunning;

    const shouldStartTrackingTimeLeft =
      shouldCalculateTimeLeft &&
      isTimerRunning &&
      timeLeftIntervalRef.current === -1 &&
      isCallbackRunning === false;

    // console.log(timeLeftIntervalRef);

    if (shouldStartTrackingTimeLeft) {
      const interval = window.setInterval(() => {
        setTimeLeft((time) => {
          const newTimeLeft = time - calculateTimeInterval;
          console.log({ newTimeLeft });
          if (newTimeLeft < calculateTimeInterval - 1) return intervalTime;
          return newTimeLeft;
        });
      }, calculateTimeInterval);
      timeLeftIntervalRef.current = interval;
    } else if (shouldResetTimeLeft) {
      setTimeLeft(intervalTime);
      console.log("clearing time remaining interval");
      clearInterval(timeLeftIntervalRef.current);
    }
  }, [
    shouldCalculateTimeLeft,
    intervalTime,
    isCallbackRunning,
    isTimerRunning,
    timeLeft,
  ]);

  function clearAllIntervals(): void {
    clearInterval(callbackIntervalRef.current);
    callbackIntervalRef.current = -1;
    clearInterval(timeLeftIntervalRef.current);
    timeLeftIntervalRef.current = -1;
  }

  useEffect(() => {
    // Clear the interval when the component will unmount
    return clearAllIntervals;
  }, []);

  function stopLooping(): void {
    setIsTimerRunning(false);
    clearAllIntervals();
  }

  function toggleLoop(): void {
    if (callbackIntervalRef.current && callbackIntervalRef.current !== -1) {
      stopLooping();
      return;
    }

    // Don't make the user wait for the first iteration
    if (isTimerRunning === false) {
      timerCallback();
    }

    setIsTimerRunning(true);
    const interval = window.setInterval(() => {
      // Check when the callback is done so a new loop isn't started until it is done
      setIsTimerRunning(false);
      clearInterval(callbackIntervalRef.current);
      callbackIntervalRef.current = -1;
      setIsCallbackRunning(true);
      Promise.resolve(timerCallback())
        .then(() => {
          // Callback success
        })
        .catch(() => {
          // callback failed
        })
        .finally(() => {
          // callback is done, resume everything
          setIsCallbackRunning(false);
          setIsTimerRunning(true);
        });
    }, intervalTime);

    callbackIntervalRef.current = interval;
  }

  return { isTimerRunning, setIsTimerRunning, toggleLoop, timeLeft };
}
