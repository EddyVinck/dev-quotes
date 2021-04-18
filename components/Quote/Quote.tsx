import React, { useCallback } from "react";
import { useQuery } from "react-query";
import { QuoteResponse } from "../../pages/api/quote";
import { QuoteControls } from "../QuoteControls/QuoteControls";
import { QuoteText } from "./QuoteText";

async function getQuote(): Promise<QuoteResponse> {
  return fetch("/api/quote").then((res) => res.json());
}

export const Quote: React.FC = () => {
  const { data, isLoading, isError, refetch } = useQuery("quote", getQuote);

  const fetchNewQuote = useCallback(() => refetch(), [refetch]);

  if (isError) return <p>Error!</p>;

  return (
    <div>
      <QuoteText
        quote={data?.quote}
        author={data?.author}
        isLoading={isLoading}
      />
      <QuoteControls fetchNewQuote={fetchNewQuote} />
    </div>
  );
};
