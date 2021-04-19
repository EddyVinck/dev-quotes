import { percentage } from "../../utils/percentage";

describe("percentage helper function", () => {
  test("percentage calculates percentages correctly", () => {
    const result = percentage(50, 100);
    expect(result).toBe(50);
  });
  test("percentage returns 100 if the value is equal to the maximum value", () => {
    const result = percentage(8000, 8000);
    expect(result).toBe(100);
  });
});
