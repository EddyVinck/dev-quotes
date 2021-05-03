import { useCallback, useEffect, useRef, useState } from "react";

export function useProgress(
  callback: () => void | Promise<unknown>,
  loopTime = 5000
): {
  isEnabled: boolean;
  isCallbackRunning: boolean;
  timeLeft: number;
  toggleIsEnabled: (overrideToggleValue?: boolean) => void;
} {
  const promise = useCallback(() => Promise.resolve(callback()), [callback]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(loopTime);
  const timeLeftIntervalRef = useRef<number>(-1);
  const [isCallbackRunning, setIsCallbackRunning] = useState(false);

  function clearTimerInterval(): void {
    clearInterval(timeLeftIntervalRef.current);
    timeLeftIntervalRef.current = -1;
  }

  function toggleIsEnabled(overrideToggleValue?: boolean): void {
    clearTimerInterval();
    setTimeLeft(loopTime);
    const toggleValue =
      typeof overrideToggleValue !== "undefined"
        ? overrideToggleValue
        : !isEnabled;

    setIsEnabled(toggleValue);
    setIsTimerRunning(toggleValue);
  }

  const pauseProgress = useCallback(() => {
    clearTimerInterval();
    setIsTimerRunning(false);
  }, []);

  function continueProgress(): void {
    setIsTimerRunning(true);
  }

  const runProvidedCallback = useCallback(() => {
    pauseProgress();
    setIsCallbackRunning(true);
    promise().finally(() => {
      setIsCallbackRunning(false);
      continueProgress();
    });
  }, [pauseProgress, promise]);

  useEffect(
    function runCallbackOnInterval() {
      const timerInterval = 50;
      const shouldSetNewInterval =
        isEnabled && isTimerRunning && timeLeftIntervalRef.current === -1;

      if (shouldSetNewInterval) {
        timeLeftIntervalRef.current = window.setInterval(() => {
          if (isTimerRunning) {
            setTimeLeft((previousTime) => {
              const newTime = previousTime - timerInterval;
              if (newTime <= 0) {
                runProvidedCallback();
                return loopTime;
              }
              return newTime;
            });
          }
        }, timerInterval);
      }
    },
    [isEnabled, isTimerRunning, loopTime, runProvidedCallback]
  );

  useEffect(() => {
    return function cleanupUseProgress() {
      clearTimerInterval();
    };
  }, []);

  return {
    isEnabled,
    timeLeft,
    toggleIsEnabled,
    isCallbackRunning,
  };
}
