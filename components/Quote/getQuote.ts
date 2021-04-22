import { QuoteResponse } from "../../pages/api/quote";

export function getQuote(): Promise<QuoteResponse> {
  return fetch("/api/quote").then((res) => res.json());
}
