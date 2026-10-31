import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders nothing for a single page", () => {
    const { container } = render(<Pagination currentPage={1} lastPage={1} onChange={() => {}} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("disables previous on the first page and moves forward", () => {
    const onChange = vi.fn();
    render(<Pagination currentPage={1} lastPage={3} onChange={onChange} />);

    expect(screen.getByRole("button", { name: "Poprzednia" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "1" })).toHaveAttribute("aria-current", "page");

    fireEvent.click(screen.getByRole("button", { name: "Następna" }));
    fireEvent.click(screen.getByRole("button", { name: "3" }));

    expect(onChange).toHaveBeenNthCalledWith(1, 2);
    expect(onChange).toHaveBeenNthCalledWith(2, 3);
  });
});
