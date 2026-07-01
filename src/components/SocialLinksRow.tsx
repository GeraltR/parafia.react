import type { SocialLinks, SocialVisibility } from "../types/config";
import { SocialIconGlyph } from "./icons/SocialIcons";

type SocialNetwork = keyof SocialVisibility;

const NETWORK_LABELS: Record<SocialNetwork, string> = {
  facebook: "Facebook",
  youtube: "YouTube",
  x: "X",
  instagram: "Instagram",
  tiktok: "TikTok",
  pinterest: "Pinterest",
  linkedin: "LinkedIn",
};

export function SocialLinksRow({
  visibility,
  links,
  className,
  iconClassName,
}: {
  visibility: SocialVisibility;
  links: SocialLinks;
  className?: string;
  iconClassName?: string;
}) {
  const networks = (Object.keys(visibility) as SocialNetwork[]).filter(
    (network) => visibility[network] && links[network],
  );

  if (networks.length === 0) return null;

  return (
    <div className={className}>
      {networks.map((network) => (
        <a
          key={network}
          href={links[network]}
          title={NETWORK_LABELS[network]}
          target="_blank"
          rel="noreferrer"
          className={iconClassName}
        >
          <SocialIconGlyph network={network} />
        </a>
      ))}
    </div>
  );
}
