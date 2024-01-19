import { DateTime, Settings } from "luxon";
import { getCurrentNflYear } from "../getCurrentSportYear";

describe("getCurrentNflYear", () => {
  it("returns the previous year when the current date is before August", () => {
    const mockTime = DateTime.local(2024, 3, 1, 0, 0, 0);
    Settings.now = () => mockTime.toMillis();

    expect(getCurrentNflYear()).toBe(2023);
  });

  it("returns the current year when the current date is on or after August", () => {
    const mockTime = DateTime.local(2024, 10, 1, 0, 0, 0);
    Settings.now = () => mockTime.toMillis();

    expect(getCurrentNflYear()).toBe(2024);
  });
});
