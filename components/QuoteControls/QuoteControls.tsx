import React, { useRef } from "react";
import { useTimer } from "../../hooks/useTimer";
import styles from "./QuoteControls.module.css";
import { QuoteProgress } from "../QuoteProgress/QuoteProgress";

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
    <div>
      <QuoteProgress value={60} max={100} />
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
