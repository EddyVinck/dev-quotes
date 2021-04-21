import React from "react";
import { QuoteText } from "./QuoteText";

export const QuoteError: React.FC = () => {
  return (
    <QuoteText
      quote="Error! Please check your connection or refresh the page!"
      author="Dev Quotes"
    />
  );
};
