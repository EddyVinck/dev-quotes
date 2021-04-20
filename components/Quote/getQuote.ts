import { QuoteResponse } from "../../pages/api/quote";

export async function getQuote(): Promise<QuoteResponse> {
  return fetch("/api/quote").then((res) => res.json());
}
