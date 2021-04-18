import React from "react";
import { useQuery } from "react-query";
import { QuoteResponse } from "../../pages/api/quote";
import { QuoteText } from "./QuoteText";

function getQuote(): Promise<QuoteResponse> {
  return fetch("/api/quote").then((res) => res.json());
}

export const Quote: React.FC = () => {
  const { data, isLoading, isError } = useQuery("quote", getQuote);

  if (isError) return <p>Error!</p>;

  return (
    <QuoteText
      quote={data?.quote}
      author={data?.author}
      isLoading={isLoading}
    />
  );
};
