import React from "react";
import { useProgress } from "../../hooks/useProgress";
import styles from "./QuoteControls.module.css";
import { QuoteProgress } from "../QuoteProgress/QuoteProgress";

interface Props {
  fetchNewQuote: () => void;
}

export const QuoteControls: React.FC<Props> = ({ fetchNewQuote }) => {
  const loopTime = 5000;
  const { isEnabled, timeLeft, toggleIsEnabled: toggleQuoteLoop } = useProgress(
    fetchNewQuote,
    loopTime
  );

  const progressValue = isEnabled === false ? loopTime : loopTime - timeLeft;

  return (
    <div>
      <QuoteProgress value={progressValue} max={loopTime} />
      <div className={styles.quoteControls}>
        <button onClick={fetchNewQuote}>New quote</button>
        <button
          onClick={toggleQuoteLoop}
          aria-checked={isEnabled}
          role="switch"
        >
          Loop quotes ({isEnabled ? "on" : "off"})
        </button>
      </div>
    </div>
  );
};
