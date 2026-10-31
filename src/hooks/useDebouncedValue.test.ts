import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDebouncedValue } from "./useDebouncedValue";

describe("useDebouncedValue", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("applies the value only after it stops changing for the delay", () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 1000), {
      initialProps: { value: "" },
    });

    rerender({ value: "r" });
    act(() => vi.advanceTimersByTime(600));
    rerender({ value: "re" });
    act(() => vi.advanceTimersByTime(600));
    rerender({ value: "rek" });
    act(() => vi.advanceTimersByTime(999));

    expect(result.current[0]).toBe("");

    act(() => vi.advanceTimersByTime(1));

    expect(result.current[0]).toBe("rek");
  });

  it("applies a value immediately through the setter", () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 1000), {
      initialProps: { value: "rek" },
    });

    rerender({ value: "" });
    act(() => result.current[1](""));

    expect(result.current[0]).toBe("");
  });
});
