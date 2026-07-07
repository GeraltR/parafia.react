import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { SocialLinks, SocialVisibility } from "../types/config";
import { SocialLinksRow } from "./SocialLinksRow";

const links: SocialLinks = {
  facebook: "https://facebook.com/parafia",
  youtube: "https://youtube.com/parafia",
  x: "https://x.com/parafia",
  instagram: "https://instagram.com/parafia",
  tiktok: "https://tiktok.com/@parafia",
  pinterest: "https://pinterest.com/parafia",
  linkedin: "https://linkedin.com/company/parafia",
};

const allHidden: SocialVisibility = {
  facebook: false,
  youtube: false,
  x: false,
  instagram: false,
  tiktok: false,
  pinterest: false,
  linkedin: false,
};

describe("SocialLinksRow", () => {
  it("renders a link only for networks that are visible and have a URL", () => {
    render(
      <SocialLinksRow
        visibility={{ ...allHidden, facebook: true, instagram: true }}
        links={links}
      />,
    );

    expect(screen.getByTitle("Facebook")).toHaveAttribute(
      "href",
      links.facebook,
    );
    expect(screen.getByTitle("Instagram")).toHaveAttribute(
      "href",
      links.instagram,
    );
    expect(screen.queryByTitle("YouTube")).not.toBeInTheDocument();
  });

  it("does not render a link for a visible network without a URL", () => {
    render(
      <SocialLinksRow
        visibility={{ ...allHidden, facebook: true }}
        links={{ ...links, facebook: "" }}
      />,
    );

    expect(screen.queryByTitle("Facebook")).not.toBeInTheDocument();
  });

  it("renders nothing when no network is visible", () => {
    const { container } = render(
      <SocialLinksRow visibility={allHidden} links={links} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("opens links in a new tab safely", () => {
    render(
      <SocialLinksRow
        visibility={{ ...allHidden, facebook: true }}
        links={links}
      />,
    );

    const link = screen.getByTitle("Facebook");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });
});
