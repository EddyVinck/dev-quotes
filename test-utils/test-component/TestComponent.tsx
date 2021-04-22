import React from "react";
import styles from "./test-component.module.css";

export const TestComponent: React.FC = ({ children }) => {
  return <div className={styles["test-component"]}>{children}</div>;
};
