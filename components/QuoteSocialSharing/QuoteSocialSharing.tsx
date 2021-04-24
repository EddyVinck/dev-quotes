import React from "react";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import styles from "./QuoteSocialSharing.module.css";

interface Props {
  text: string;
}

export const QuoteSocialSharing: React.FC<Props> = ({ text }) => {
  return (
    <div className={styles.container}>
      <a
        href={`https://twitter.com/intent/tweet?text=${text}`}
        target="_blank"
        rel="noreffer noopener noreferrer"
      >
        <TwitterIcon size={32} round />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=https://devquotes.vercel.app/&quote=${text}`}
        target="_blank"
        rel="noreffer noopener noreferrer"
      >
        <FacebookIcon size={32} round />
      </a>
      <a
        className="touch-only"
        href={`https://wa.me/?text=${text}`}
        target="_blank"
        rel="noreffer noopener noreferrer"
      >
        <WhatsappIcon size={32} round />
      </a>
      <a
        className="hover-only"
        href={`https://web.whatsapp.com/send?text=${text}`}
        target="_blank"
        rel="noreffer noopener noreferrer"
      >
        <WhatsappIcon size={32} round />
      </a>
    </div>
  );
};
