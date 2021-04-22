import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuoteControls } from "../../components/QuoteControls/QuoteControls";

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.useRealTimers();
});
describe("QuoteControls", () => {
  test('runs the passed function when "new quote" is clicked', () => {
    const fetchNewQuote = jest.fn();
    render(<QuoteControls fetchNewQuote={fetchNewQuote} />);

    userEvent.click(screen.getByText(/new quote/i));
    expect(fetchNewQuote).toHaveBeenCalled();
  });
  test('disables the "new quote" button when "loop quotes" is enabled and enables it when the looping is turned off', () => {
    const fetchNewQuote = jest.fn();
    render(<QuoteControls fetchNewQuote={fetchNewQuote} />);

    userEvent.click(screen.getByText(/loop quotes/i));
    const button = screen.getByText(/new quote/i);
    expect(button).toBeDisabled();
    userEvent.click(screen.getByText(/loop quotes/i));
    expect(button).toBeEnabled();
  });
  test("passes the right progressValue to the progress bar", async () => {
    const fetchNewQuote = jest.fn();
    render(<QuoteControls fetchNewQuote={fetchNewQuote} loopTime={1000} />);

    act(() => {
      userEvent.click(screen.getByText(/loop quotes/i));
      jest.advanceTimersByTime(500);
    });
    expect(screen.queryByRole("progressbar")).toHaveValue(500);
    expect(screen.queryByRole("progressbar")).toHaveTextContent("50%");
    jest.clearAllTimers();
  });
});
