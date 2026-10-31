export type PageSlot = number | "gap";

/** First, last, current and its neighbours; the rest collapses into "…". */
export function pageSlots(current: number, last: number): PageSlot[] {
  const pages = [...new Set([1, current - 1, current, current + 1, last])]
    .filter((page) => page >= 1 && page <= last)
    .sort((a, b) => a - b);

  const slots: PageSlot[] = [];
  pages.forEach((page, index) => {
    const previous = pages[index - 1];
    if (previous !== undefined && page - previous === 2) {
      slots.push(previous + 1);
    } else if (previous !== undefined && page - previous > 2) {
      slots.push("gap");
    }
    slots.push(page);
  });
  return slots;
}
