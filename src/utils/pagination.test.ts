import { describe, expect, it } from "vitest";
import { pageSlots } from "./pagination";

describe("pageSlots", () => {
  it("lists every page when there are few", () => {
    expect(pageSlots(1, 4)).toEqual([1, 2, 3, 4]);
  });

  it("collapses distant pages into gaps", () => {
    expect(pageSlots(5, 10)).toEqual([1, "gap", 4, 5, 6, "gap", 10]);
  });

  it("fills a single missing page instead of showing a gap", () => {
    expect(pageSlots(4, 10)).toEqual([1, 2, 3, 4, 5, "gap", 10]);
  });
});
