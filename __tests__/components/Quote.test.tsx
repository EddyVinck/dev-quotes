import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { getQuote } from "../../components/Quote/getQuote";
import { Quote } from "../../components/Quote/Quote";

jest.mock("../../components/Quote/getQuote", () => {
  const mockGetQuote = jest.fn().mockResolvedValue({
    id: 0,
    quote: "test quote",
    author: "Eddy Vinck",
    error: "",
  });

  return {
    getQuote: mockGetQuote,
  };
});

describe("Quote", () => {
  beforeEach(() => {
    (getQuote as jest.Mock).mockClear();
  });

  test("renders the loader when there is no initial data", async () => {
    const queryClient = new QueryClient();
    const MockQueryProvider: React.FC = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    render(
      <MockQueryProvider>
        <Quote />
      </MockQueryProvider>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders with mocked data", async () => {
    const queryClient = new QueryClient();
    const MockQueryProvider: React.FC = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    render(
      <MockQueryProvider>
        <Quote />
      </MockQueryProvider>
    );
    await waitFor(() => expect(getQuote).toHaveBeenCalledTimes(1));
    const blockquote = screen.getByRole("figure");
    expect(blockquote).toBeInTheDocument();
    expect(blockquote).toHaveTextContent(/test quote/i);
    expect(blockquote.querySelector("figcaption")).toHaveTextContent(
      /eddy vinck/i
    );
  });
  test.todo('fetches a new quote when "new quote" is clicked');
  describe("looping quotes", () => {
    test.todo('continuously fetches a new quote when "loop quotes" is clicked');
    test.todo('"new quote" is disabled when "loop quotes" is enabled');
  });
});
