import { useConfig } from "../../context/configHooks";
import { ShortActionIconGlyph } from "../icons/ShortActionIcons";

export function ShortAction() {
  const { shortActions } = useConfig();

  return (
    <div id="quicklinks" className="relative z-10 bg-white shadow-[0_4px_18px_rgba(13,30,53,.07)]">
      <div className="grid grid-cols-2 border-l border-t border-border sm:grid-cols-3 lg:grid-cols-6">
        {shortActions.map((item) => (
          <a
            key={`short-action-${item.id}`}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
            className="border-b border-r border-border px-4 pb-5 pt-6 text-center transition-[background,box-shadow] hover:bg-surface-muted hover:shadow-[inset_0_-3px_0_var(--color-secondary)]"
          >
            <ShortActionIconGlyph icon={item.icon} className="mx-auto mb-2.5 h-11 w-11 text-secondary" />
            <div className="mb-1.5 font-heading text-[0.84rem] font-bold text-primary">{item.title}</div>
            <div className="mb-2 font-body text-[0.72rem] leading-tight text-ink-soft">{item.description}</div>
            <div className="font-body text-base text-secondary">→</div>
          </a>
        ))}
      </div>
    </div>
  );
}
