import React from "react";
import { ProgressBar, ProgressBarProps } from "../ProgressBar/ProgressBar";
import styles from "./QuoteProgress.module.css";

type Props = Pick<ProgressBarProps, "value" | "max">;

export const QuoteProgress: React.FC<Props> = ({ value, max, ...props }) => {
  const id = "quote-timer-progress";
  return (
    <div className={styles.progressBar} {...props}>
      <label htmlFor={id} className="visually-hidden">
        Quote timer progress
      </label>
      <ProgressBar value={value} max={max} id={id} />
    </div>
  );
};
