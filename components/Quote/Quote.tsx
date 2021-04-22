import React, { useCallback } from "react";
import { useQuery } from "react-query";
import { QuoteData } from "../../pages/api/quote";
import { QuoteControls } from "../QuoteControls/QuoteControls";
import { QuoteSocialSharing } from "../QuoteSocialSharing/QuoteSocialSharing";
import { getQuote } from "./getQuote";
import { QuoteError } from "./QuoteError";
import { QuoteLoading } from "./QuoteLoading";
import { QuoteText } from "./QuoteText";

export function getSharingText(quote: string, author: string): string {
  const newLine = "%0D";
  const hashtag = "%23";
  const sharingText = `"${quote}" ${newLine.repeat(
    2
  )}- ${author} ${hashtag}devquotes`;
  return sharingText;
}

export const Quote: React.FC = () => {
  const { data, status, refetch } = useQuery("quote", getQuote, {
    refetchOnWindowFocus: false,
  });
  const fetchNewQuote = useCallback(() => refetch(), [refetch]);

  if (status === "loading") return <QuoteLoading />;
  if (status === "error" || (data && data.error)) return <QuoteError />;
  if (status === "success" && data) {
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
  }

  // This code should never be reachable, since react-query's status will never be "idle" if you do not pass it the `enabled: false` option. There is a test to make sure of this.
  throw new Error("Something went wrong.");
};
