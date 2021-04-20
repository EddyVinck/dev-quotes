import React from "react";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import styles from "./QuoteProgress.module.css";

interface Props {
  value: number;
  max: number;
  id?: string;
}

export const QuoteProgress: React.FC<Props> = ({
  value,
  max,
  id = "quote-timer-progress",
  ...props
}) => {
  return (
    <div className={styles.progressBar} {...props}>
      <label htmlFor={id} className="visually-hidden">
        Time until next quote
      </label>
      <ProgressBar value={value} max={max} id={id} />
    </div>
  );
};
