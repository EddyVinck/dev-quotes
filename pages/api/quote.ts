import type { NextApiRequest, NextApiResponse } from "next";

export interface QuoteData {
  author: string;
  id: number;
  quote: string;
}

export interface QuoteError extends Pick<QuoteData, "author" | "quote" | "id"> {
  error: string;
}

const quoteBaseUrl = "http://quotes.stormconsultancy.co.uk";
const quoteEndpoint = `${quoteBaseUrl}/random.json`;

const ErrorQuote: QuoteError = {
  author: "Eddy Vinck",
  quote: "This error could have been a quote, but an error occurred!",
  error: "Something went wrong!",
  id: -1,
};

export type QuoteResponse = QuoteData & QuoteError;

export default async (
  req: NextApiRequest,
  res: NextApiResponse<QuoteResponse>
): Promise<void> => {
  try {
    const quoteRequest = await fetch(quoteEndpoint, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const quoteData = await quoteRequest.json();
    return res.status(200).json(quoteData);
  } catch (error) {
    return res.status(500).json({ ...ErrorQuote, error: error.message });
  }
};
