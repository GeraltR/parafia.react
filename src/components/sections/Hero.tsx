import { useConfig } from "../../context/configHooks";
import { resolveBodyFont, resolveHeadingFont } from "../../utils/fonts";
import { HeroButtonIconGlyph } from "../icons/HeroButtonIcons";
import type { VerticalAlign } from "../../types/config";

const V_ALIGN_TO_ITEMS: Record<VerticalAlign, string> = {
  top: "flex-start",
  center: "center",
  bottom: "flex-end",
};

function widthStyle(width: number) {
  return { maxWidth: `${(width / 12) * 100}%` };
}

export function Hero() {
  const { theme, hero } = useConfig();

  const title = hero.title || theme.title;
  const subtitle = hero.subtitle || theme.subtitle;

  return (
    <section
      className="relative flex h-[600px] min-h-[420px] overflow-hidden bg-cover bg-[center_30%] pb-[60px]"
      style={{
        backgroundImage: `url(${hero.backgroundImage})`,
        justifyContent: "center",
        alignItems: V_ALIGN_TO_ITEMS[hero.titleVAlign],
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,14,28,.28)] via-[rgba(5,14,28,.6)] to-[rgba(5,14,28,.82)]" />
      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6">
        <h1
          className="mb-2.5 font-bold text-white [text-shadow:0_2px_14px_rgba(0,0,0,.5)]"
          style={{
            ...widthStyle(hero.titleWidth),
            fontFamily: resolveHeadingFont(hero.titleFont, theme),
            fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className="mb-3 text-white/85"
            style={{
              ...widthStyle(hero.subtitleWidth),
              fontFamily: resolveBodyFont(hero.subtitleFont, theme),
              fontSize: "1.1rem",
            }}
          >
            {subtitle}
          </p>
        )}

        {hero.keynote && (
          <p
            className="mb-7 italic text-white/80"
            style={{
              ...widthStyle(hero.keynoteWidth),
              fontFamily: resolveBodyFont(hero.keynoteFont, theme),
              fontSize: "clamp(.95rem, 2vw, 1.1rem)",
            }}
          >
            „{hero.keynote}”
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          {hero.buttons.map((button) => (
            <a
              key={`hero-button-${button.id}`}
              href={button.href}
              target={button.external ? "_blank" : undefined}
              rel={button.external ? "noreferrer" : undefined}
              className="inline-flex items-center gap-2 rounded border border-secondary/55 bg-[rgba(10,20,40,.7)] px-5 py-3 font-body text-[0.8rem] font-bold uppercase tracking-wider text-white backdrop-blur-md transition-colors hover:border-secondary hover:bg-secondary hover:text-primary"
            >
              <HeroButtonIconGlyph
                icon={button.icon}
                className="h-[17px] w-[17px] flex-shrink-0"
              />
              {button.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
