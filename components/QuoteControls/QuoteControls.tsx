import React from "react";
import { useProgress } from "../../hooks/useProgress";
import styles from "./QuoteControls.module.css";
import { QuoteProgress } from "../QuoteProgress/QuoteProgress";

interface Props {
  fetchNewQuote: () => void;
  loopTime?: number;
}

export const QuoteControls: React.FC<Props> = ({
  fetchNewQuote,
  loopTime = 8000,
}) => {
  const {
    isEnabled: isLoopingQuotes,
    timeLeft,
    toggleIsEnabled: toggleQuoteLoop,
  } = useProgress(fetchNewQuote, loopTime);

  const progressValue =
    isLoopingQuotes === false ? loopTime : loopTime - timeLeft;

  const handleNewQuoteClick = (): void => {
    if (isLoopingQuotes === false) {
      fetchNewQuote();
    }
  };

  return (
    <div>
      <QuoteProgress value={progressValue} max={loopTime} />
      <div className={styles.quoteControls}>
        <button onClick={handleNewQuoteClick} disabled={isLoopingQuotes}>
          New quote
        </button>
        <button
          onClick={() => toggleQuoteLoop()}
          aria-checked={isLoopingQuotes}
          role="switch"
        >
          Loop quotes ({isLoopingQuotes ? "on" : "off"})
        </button>
      </div>
    </div>
  );
};
