import React, { useRef } from "react";
import { useTimer } from "../../hooks/useTimer";
import styles from "./Quote.module.css";
interface Props {
  fetchNewQuote: () => void;
}

export const QuoteControls: React.FC<Props> = ({ fetchNewQuote }) => {
  const intervalRef = useRef<number>(null) as React.MutableRefObject<number>;
  const { isTimerRunning, toggleLoop: toggleQuoteLoop } = useTimer(
    intervalRef,
    fetchNewQuote
  );

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
