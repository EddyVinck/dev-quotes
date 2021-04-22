import { render, screen } from "@testing-library/react";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";

describe("ProgressBar", () => {
  test('should display an element with the "progressbar" role', async () => {
    render(<ProgressBar id="test" value={10} max={100} />);
    expect(await screen.findByRole("progressbar")).toBeInTheDocument();
  });
  test("renders a label", async () => {
    render(
      <ProgressBar id="test" value={10} max={100}>
        <label htmlFor="test">Download progress:</label>
      </ProgressBar>
    );
    expect(await screen.findByLabelText(/progress/i)).toBeInTheDocument();
  });
  test("the visual <span> representation of the progress bar has the correct width", async () => {
    const { container } = render(
      <ProgressBar id="test" value={10} max={100}>
        <label htmlFor="test">Download progress:</label>
      </ProgressBar>
    );
    const span = container.querySelector("span");
    expect(span).toHaveAttribute("style", "width: 10%;");
  });
});
