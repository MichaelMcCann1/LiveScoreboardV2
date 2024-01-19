import { render, screen } from "@testing-library/react";
import WeekButtons from "../components/weekButtons";

const mockWeeksList = [
  { week: 1, text: "Week 1" },
  { week: 2, text: "Week 2" },
  { week: 3, text: "Week 3" },
  { week: 4, text: "Week 4" },
  { week: 5, text: "Week 5" },
  { week: 6, text: "Week 6" },
  { week: 7, text: "Week 7" },
];

const mockSportRoute = "abc";

describe("weekButtons", () => {
  it("displays the correct weeks on the buttons", () => {
    render(
      <WeekButtons
        currentWeek="4"
        weeksList={mockWeeksList}
        sportRoute={mockSportRoute}
      />
    );

    const links = screen.getAllByRole("link");

    expect(links.length).toBe(3);
    expect(links.map((link) => link.textContent)).toEqual([
      "Week 3",
      "Week 4",
      "Week 5",
    ]);
  });

  it("handles the boundary condition", () => {
    render(
      <WeekButtons
        currentWeek="1"
        weeksList={mockWeeksList}
        sportRoute={mockSportRoute}
      />
    );

    const links = screen.getAllByRole("link");

    expect(links.map((link) => link.textContent)).toEqual([
      "Week 1",
      "Week 2",
      "Week 3",
    ]);
  });

  it("links to the correct location", async () => {
    render(
      <WeekButtons
        currentWeek="1"
        weeksList={mockWeeksList}
        sportRoute={mockSportRoute}
      />
    );

    const week2Link = screen.getByRole("link", { name: "Week 2" });

    expect(week2Link.getAttribute("href")).toBe(`/${mockSportRoute}/week/2`);
  });
});
