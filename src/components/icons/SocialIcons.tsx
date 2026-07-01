import type { ReactElement } from "react";
import type { SocialVisibility } from "../../types/config";

type IconProps = { className?: string };
type SocialNetwork = keyof SocialVisibility;

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" className={className}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

function TiktokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 4c.5 2.2 2 3.6 4 4" />
    </svg>
  );
}

function PinterestIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9 19c1-3 1.8-6.5 2.2-8.4A3 3 0 1 1 14.8 9c0 2-1.3 4.5-3.3 4.5-1 0-1.7-.6-1.9-1.4" />
    </svg>
  );
}

function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="7.5" y1="10.5" x2="7.5" y2="16.5" />
      <circle cx="7.5" cy="7" r=".6" fill="currentColor" stroke="none" />
      <path d="M11.5 16.5v-3.7a2.3 2.3 0 0 1 4.6 0v3.7" />
      <line x1="11.5" y1="10.5" x2="11.5" y2="16.5" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<SocialNetwork, (props: IconProps) => ReactElement> = {
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
  x: XIcon,
  tiktok: TiktokIcon,
  pinterest: PinterestIcon,
  linkedin: LinkedinIcon,
};

export function SocialIconGlyph({ network, className }: { network: SocialNetwork; className?: string }) {
  const Glyph = SOCIAL_ICONS[network];
  return <Glyph className={className} />;
}
