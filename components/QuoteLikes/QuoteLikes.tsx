import React, { useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import styles from "./QuoteLikes.module.css";

interface Props {
  quoteId: number;
}

export const QuoteLikes: React.FC<Props> = ({ quoteId }) => {
  const [likeCount, setLikeCount] = useLocalStorage(`like-${quoteId}`, 0);

  useEffect(() => {
    console.log(quoteId, "rerender QuoteLikes");
  }, [quoteId]);

  function handleLikeClick(): void {
    setLikeCount((prevCount: number) => prevCount + 1);
  }

  return (
    <div className={styles.likesContainer}>
      <button onClick={handleLikeClick}>Likes: {likeCount}</button>
    </div>
  );
};
