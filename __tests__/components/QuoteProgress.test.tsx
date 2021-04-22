import { render, screen } from "@testing-library/react";
import { QuoteProgress } from "../../components/QuoteProgress/QuoteProgress";

describe("QuoteProgress", () => {
  test('should display an element with the "progressbar" role with the right values', async () => {
    render(<QuoteProgress id="test" value={10} max={100} />);
    expect(await screen.findByRole("progressbar")).toBeInTheDocument();
    expect(await screen.findByRole("progressbar")).toHaveProperty("value", 10);
    expect(await screen.findByRole("progressbar")).toHaveProperty("max", 100);
    expect(await screen.findByRole("progressbar")).toHaveProperty("id", "test");
  });
  test("renders a label not visible to users without screenreaders", async () => {
    render(<QuoteProgress id="test" value={10} max={100} />);
    const label = await screen.findByText(/time/i);
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass("visually-hidden");
  });
});
