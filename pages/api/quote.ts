import type { NextApiRequest, NextApiResponse } from "next";

export interface QuoteData {
  author: string;
  id: number;
  quote: string;
  permalink: string;
}

export interface QuoteError extends Partial<QuoteData> {
  error: string;
}

const quoteBaseUrl = "http://quotes.stormconsultancy.co.uk";
const quoteEndpoint = `${quoteBaseUrl}/random.json`;

const ErrorQuote: QuoteError = {
  author: "Eddy Vinck",
  quote: "This error could have been a quote",
  error: "Something went wrong!",
};

export type QuoteResponse = QuoteData | QuoteError;

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
