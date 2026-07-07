import { describe, expect, it } from "vitest";
import {
  formatEventDay,
  formatEventTime,
  formatIntentionDay,
  formatNewsDate,
} from "./dates";

describe("formatEventDay", () => {
  it("returns day number and short month in Polish", () => {
    expect(formatEventDay("2026-03-15")).toEqual({ day: 15, month: "MAR" });
  });

  it("handles the last day of December", () => {
    expect(formatEventDay("2026-12-31")).toEqual({ day: 31, month: "GRU" });
  });
});

describe("formatEventTime", () => {
  it("prefixes the time with the Polish weekday name", () => {
    expect(formatEventTime("2026-07-05", "10:00")).toBe("niedziela, 10:00");
  });

  it("strips a leading label before the first comma", () => {
    expect(formatEventTime("2026-07-05", "Msza św., 10:00")).toBe(
      "niedziela, 10:00",
    );
  });
});

describe("formatNewsDate", () => {
  it("formats the date with full Polish month name", () => {
    expect(formatNewsDate("2026-01-02")).toBe("2 stycznia 2026");
  });
});

describe("formatIntentionDay", () => {
  it("formats as short weekday and zero-padded day.month", () => {
    expect(formatIntentionDay("2026-07-05")).toBe("Nd 05.07");
  });

  it("zero-pads single digit day and month", () => {
    expect(formatIntentionDay("2026-01-01")).toBe("Cz 01.01");
  });
});
