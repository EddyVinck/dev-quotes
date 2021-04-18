import React from "react";
import styles from "./Quote.module.css";

interface Props {
  quote?: string;
  author?: string;
  isLoading: boolean;
}

export const QuoteText: React.FC<Props> = ({ quote, author, isLoading }) => {
  if (isLoading) return <p>Loading...</p>;
  return (
    <figure className={styles.quoteBlock}>
      <blockquote className={styles.quoteText}>{quote}</blockquote>
      <figcaption>{author}</figcaption>
    </figure>
  );
};
