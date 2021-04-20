import { render, screen } from "@testing-library/react";
import { QuoteSocialSharing } from "../../components/QuoteSocialSharing/QuoteSocialSharing";

describe("QuoteSocialSharing", () => {
  test("should render a text in the link href", () => {
    const text = '"this is a fancy quote" - Eddy Vinck';

    render(<QuoteSocialSharing text={text} />);

    const links = screen.getAllByRole("link");

    links.forEach((link) => {
      expect(link).toHaveAttribute("href");
      expect((link.getAttribute("href") as string).includes(text)).toBeTruthy();
    });
  });

  // This is a bit tricky because it would require the global styles to be available in the test
  // Will skip this for now, since this would essentially be testing the CSS which works correctly when viewed in the browser
  // Perhaps this would be a great test to do with and end-to-end tool like Cypress
  test.todo(
    "should render the correct whatsapp link when a device can or cannot hover"
  );
});
