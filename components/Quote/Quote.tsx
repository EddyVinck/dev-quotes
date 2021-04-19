import React, { useCallback } from "react";
import { useQuery } from "react-query";
import { QuoteData, QuoteResponse } from "../../pages/api/quote";
import { QuoteControls } from "../QuoteControls/QuoteControls";
import { QuoteSocialSharing } from "../QuoteSocialSharing/QuoteSocialSharing";
import { QuoteText } from "./QuoteText";

async function getQuote(): Promise<QuoteResponse> {
  return fetch("/api/quote").then((res) => res.json());
}

function getSharingText(quote: string, author: string): string {
  const newLine = "%0D";
  const hashtag = "%23";
  const sharingText = `"${quote}" ${newLine.repeat(
    2
  )}- ${author} ${hashtag}devquotes`;
  return sharingText;
}

export const Quote: React.FC = () => {
  const { data, isLoading, isError, refetch } = useQuery("quote", getQuote);
  const fetchNewQuote = useCallback(() => refetch(), [refetch]);

  if (isLoading) return <p>Loading...</p>;
  if (isError || (data && data.error)) return <p>Error!</p>;
  if (!data) return <p>No data</p>;

  const { quote, author } = data as QuoteData;
  const sharingText = getSharingText(quote, author);

  return (
    <div>
      <QuoteText quote={quote} author={author} />
      <QuoteControls fetchNewQuote={fetchNewQuote} />
      <h2>Share on social media</h2>
      <QuoteSocialSharing text={sharingText} />
    </div>
  );
};
