import { describe, expect, it } from "vitest";
import { isInternalRoute } from "./links";

describe("isInternalRoute", () => {
  it("returns true for a path starting with a single slash", () => {
    expect(isInternalRoute("/o-nas")).toBe(true);
  });

  it("returns false for a protocol-relative URL", () => {
    expect(isInternalRoute("//example.com")).toBe(false);
  });

  it("returns false for an absolute external URL", () => {
    expect(isInternalRoute("https://example.com")).toBe(false);
  });

  it("returns false for a relative path without a leading slash", () => {
    expect(isInternalRoute("o-nas")).toBe(false);
  });
});
