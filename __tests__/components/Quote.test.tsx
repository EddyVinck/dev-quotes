import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as ReactQuery from "react-query";
import { getQuote } from "../../components/Quote/getQuote";
import { Quote } from "../../components/Quote/Quote";
import { QuoteResponse } from "../../pages/api/quote";
const { QueryClient, QueryClientProvider } = ReactQuery;

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

const mockQuotes: QuoteResponse[] = [
  {
    quote: "I'm going to make him an offer he can't refuse.",
    author: "The Godfather",
    id: 1,
    error: "",
  },
  {
    quote: "My precious.",
    author: "The Lord of the Rings",
    id: 2,
    error: "",
  },
];

describe("Quote", () => {
  beforeEach(() => {
    (getQuote as jest.Mock).mockClear();
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  const queryClient = new QueryClient();
  const MockReactQueryProvider: React.FC = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  test("renders the loader when there is no initial data", async () => {
    render(
      <MockReactQueryProvider>
        <Quote />
      </MockReactQueryProvider>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders with mocked data", async () => {
    render(
      <MockReactQueryProvider>
        <Quote />
      </MockReactQueryProvider>
    );
    await waitFor(() => expect(getQuote).toHaveBeenCalledTimes(1));
    const blockquote = screen.getByRole("figure");
    expect(blockquote).toBeInTheDocument();
    expect(blockquote).toHaveTextContent(/test quote/i);
    expect(blockquote.querySelector("figcaption")).toHaveTextContent(
      /eddy vinck/i
    );
  });
  test('fetches a new quote when "new quote" is clicked', async () => {
    render(
      <MockReactQueryProvider>
        <Quote />
      </MockReactQueryProvider>
    );
    await waitFor(() => expect(getQuote).toHaveBeenCalledTimes(1));

    ((getQuote as unknown) as jest.Mock<QuoteResponse>).mockImplementationOnce(
      () => mockQuotes[0]
    );
    userEvent.click(screen.getByText(/new quote/i));
    await waitFor(() => expect(getQuote).toHaveBeenCalledTimes(2));
    const blockquote = screen.getByRole("figure");
    expect(blockquote).toBeInTheDocument();
    expect(blockquote).toHaveTextContent(/make him an offer/i);
    expect(blockquote.querySelector("figcaption")).toHaveTextContent(
      /the godfather/i
    );
  });

  describe("looping quotes", () => {
    test('continuously fetches a new quote when "loop quotes" is clicked', async () => {
      render(
        <MockReactQueryProvider>
          <Quote />
        </MockReactQueryProvider>
      );

      // First, toggle the looping (1 request)
      userEvent.click(await screen.findByText(/loop quotes/i));
      await waitFor(() => expect(getQuote).toHaveBeenCalledTimes(1));
      ((getQuote as unknown) as jest.Mock<QuoteResponse>).mockImplementationOnce(
        () => mockQuotes[0]
      );

      // wait for getQuote to run (2 requests)
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => expect(getQuote).toHaveBeenCalledTimes(2));

      ((getQuote as unknown) as jest.Mock<QuoteResponse>).mockImplementationOnce(
        () => mockQuotes[1]
      );

      // wait for getQuote to run (3 requests)
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => expect(getQuote).toHaveBeenCalledTimes(3));

      const blockquote = screen.getByRole("figure");
      expect(blockquote).toBeInTheDocument();
      expect(blockquote).toHaveTextContent(/precious/i);
      expect(blockquote.querySelector("figcaption")).toHaveTextContent(
        /lord of the rings/i
      );
    });

    test('"new quote" is disabled when "loop quotes" is enabled', async () => {
      render(
        <MockReactQueryProvider>
          <Quote />
        </MockReactQueryProvider>
      );
      await waitFor(() => expect(getQuote).toHaveBeenCalledTimes(1));
      userEvent.click(screen.getByText(/loop quotes/i));
      expect(screen.getByText(/new quote/i)).toBeDisabled();
    });
  });

  // According to the react-query documentation:
  // status: String
  // Will be:
  // idle if the query is idle. This only happens if a query is initialized with enabled: false and no initial data is available.
  // So this test is just verification that that should never happen
  // See: https://react-query.tanstack.com/reference/useQuery
  test('useQuery should not be passed an `enabled: false` option because that would cause an unhandled status "idle" to become possible', async () => {
    const useQuerySpy = jest.spyOn(ReactQuery, "useQuery");
    render(
      <MockReactQueryProvider>
        <Quote />
      </MockReactQueryProvider>
    );
    await waitFor(() => expect(getQuote).toHaveBeenCalledTimes(1));
    expect(useQuerySpy).toHaveBeenCalledWith("quote", getQuote, {
      refetchOnWindowFocus: false,
    });
  });
});
