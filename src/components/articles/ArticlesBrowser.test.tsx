import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Paginated } from "../../api/configClient";
import { ArticlesBrowser } from "./ArticlesBrowser";

interface Topic {
  id: number;
  title: string;
  body: string;
}

const PER_PAGE = 6;

const topics: Topic[] = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  title: index === 7 ? "Pielgrzymka" : `Temat ${index + 1}`,
  body: `Treść ${index + 1}`,
}));

function inMemoryArchive(search: string, page: number): Promise<Paginated<Topic>> {
  const matching = topics.filter((topic) => topic.title.toLowerCase().includes(search.toLowerCase()));
  return Promise.resolve({
    data: matching.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    currentPage: page,
    lastPage: Math.max(1, Math.ceil(matching.length / PER_PAGE)),
  });
}

function inMemoryItem(id: number): Promise<Topic> {
  const topic = topics.find((item) => item.id === id);
  return topic ? Promise.resolve(topic) : Promise.reject(new Error("Not found"));
}

function renderBrowser(path: string) {
  const fetchArchive = vi.fn(inMemoryArchive);
  const fetchItem = vi.fn(inMemoryItem);
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route
          path="/aktualnosci/:id?"
          element={
            <ArticlesBrowser
              basePath="/aktualnosci"
              fetchArchive={fetchArchive}
              fetchItem={fetchItem}
              renderListItem={(topic, { to, active, onSelect }) => (
                <a href={to} onClick={onSelect} aria-current={active ? "page" : undefined}>
                  {topic.title}
                </a>
              )}
              renderDetail={(topic) => <h2>{topic.body}</h2>}
            />
          }
        />
      </Routes>
    </MemoryRouter>,
  );
  return { fetchArchive, fetchItem };
}

describe("ArticlesBrowser", () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
    Element.prototype.scrollIntoView = vi.fn();
  });

  it("shows the first six topics and no content when no topic is selected", async () => {
    renderBrowser("/aktualnosci");

    expect(await screen.findByText("Temat 1")).toBeInTheDocument();
    expect(screen.getByText("Temat 6")).toBeInTheDocument();
    expect(screen.queryByText("Temat 7")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("shows the content of the topic from the URL and marks it active", async () => {
    const { fetchItem } = renderBrowser("/aktualnosci/2");

    expect(await screen.findByRole("heading", { name: "Treść 2" })).toBeInTheDocument();
    expect(screen.getByText("Temat 2")).toHaveAttribute("aria-current", "page");
    expect(fetchItem).not.toHaveBeenCalled();
  });

  it("loads a topic that is not on the current page", async () => {
    const { fetchItem } = renderBrowser("/aktualnosci/8");

    expect(await screen.findByRole("heading", { name: "Treść 8" })).toBeInTheDocument();
    expect(fetchItem).toHaveBeenCalledWith(8);
  });

  it("changes pages", async () => {
    const { fetchArchive } = renderBrowser("/aktualnosci");
    await screen.findByText("Temat 1");

    fireEvent.click(screen.getByRole("button", { name: "2" }));

    expect(await screen.findByText("Temat 7")).toBeInTheDocument();
    expect(fetchArchive).toHaveBeenLastCalledWith("", 2);
  });

  it("filters only after a pause in typing and keeps the selected topic when the filter is cleared", async () => {
    const { fetchArchive } = renderBrowser("/aktualnosci/1");
    await screen.findByRole("heading", { name: "Treść 1" });
    const input = screen.getByRole("searchbox", { name: "Szukaj" });

    fireEvent.change(input, { target: { value: "piel" } });
    expect(fetchArchive).not.toHaveBeenCalledWith("piel", 1);

    await waitFor(() => expect(screen.queryByText("Temat 1")).not.toBeInTheDocument(), { timeout: 2000 });
    expect(screen.getByText("Pielgrzymka")).toBeInTheDocument();
    expect(fetchArchive).toHaveBeenLastCalledWith("piel", 1);
    expect(screen.getByRole("heading", { name: "Treść 1" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Wyczyść filtr" }));

    expect(input).toHaveValue("");
    expect(await screen.findByText("Temat 1")).toBeInTheDocument();
    expect(fetchArchive).toHaveBeenLastCalledWith("", 1);
    expect(screen.getByRole("heading", { name: "Treść 1" })).toBeInTheDocument();
  });
});
