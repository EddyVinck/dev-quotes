import React from "react";
import { percentage } from "../../utils/percentage";

export interface ProgressBarProps {
  value: number;
  max: number;
  id: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  id,
  children,
  ...props
}) => {
  const progress = percentage(value, max);
  return (
    <div {...props}>
      {children}
      <progress id={id} value={value} max={max}>
        {progress}%
        <div className="progress-bar">
          <span style={{ width: `${progress}%` }}>{progress}%</span>
        </div>
      </progress>
    </div>
  );
};
