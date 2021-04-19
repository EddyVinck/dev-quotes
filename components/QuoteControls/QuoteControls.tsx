import React from "react";
import { useTimer } from "../../hooks/useTimer";
import styles from "./QuoteControls.module.css";
import { QuoteProgress } from "../QuoteProgress/QuoteProgress";

interface Props {
  fetchNewQuote: () => void;
}

export const QuoteControls: React.FC<Props> = ({ fetchNewQuote }) => {
  const loopTime = 5000;
  const { isTimerRunning, timeLeft, toggleLoop: toggleQuoteLoop } = useTimer(
    fetchNewQuote,
    loopTime,
    true
  );

  const progressValue =
    isTimerRunning === false ? loopTime : loopTime - timeLeft;

  return (
    <div>
      <QuoteProgress value={progressValue} max={loopTime} />
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
    </div>
  );
};
