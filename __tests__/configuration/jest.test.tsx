import { render, screen } from "@testing-library/react";
import { TestComponent } from "../../test-utils/test-component/TestComponent";

describe("Jest is working as intended", () => {
  test("Jest can parse JSX and run assertions", () => {
    render(<div>test content</div>);

    expect(screen.getByText(/test content/i)).toBeInTheDocument();
  });
  test("Jest can handle .tsx file imports", () => {
    render(<TestComponent>test component</TestComponent>);

    expect(screen.getByText(/test component/i)).toBeInTheDocument();
  });
});
