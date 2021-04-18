import React, { useEffect, useRef, useState } from "react";
import styles from "./Quote.module.css";
interface Props {
  fetchNewQuote: () => void;
}

export const QuoteControls: React.FC<Props> = ({ fetchNewQuote }) => {
  const intervalRef = useRef<number>(null) as React.MutableRefObject<number>;
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    // Clear the interval when the component will unmount
    return () => clearInterval(intervalRef.current);
  }, []);

  function stopLoopingQuotes(): void {
    setIsTimerRunning(false);
    clearInterval(intervalRef.current);
    intervalRef.current = -1;
  }

  function toggleQuoteLoop(): void {
    if (intervalRef.current && intervalRef.current !== -1) {
      stopLoopingQuotes();
      return;
    }

    // Don't make the user wait for the first iteration
    if (isTimerRunning === false) {
      fetchNewQuote();
    }

    setIsTimerRunning(true);
    const interval = window.setInterval(() => {
      fetchNewQuote();
    }, 5000);
    intervalRef.current = interval;
  }

  return (
    <div className={styles.quoteControls}>
      <button onClick={fetchNewQuote}>New quote</button>
      <button
        onClick={toggleQuoteLoop}
        aria-checked={isTimerRunning}
        role="switch"
      >
        Loop quotes ({isTimerRunning ? "on" : "off"})
      </button>
    </div>
  );
};
