import { useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useConfig } from "../../context/configHooks";
import { isInternalRoute } from "../../utils/links";
import { Icon, type IconKey } from "../Icon/icons";
import type { ShortActionItem } from "../../types/config";

function ShortActionCard({
  item,
  titleStyle,
  subtitleStyle,
  bgColor,
  bgColorHover,
}: {
  item: ShortActionItem;
  titleStyle: CSSProperties;
  subtitleStyle: CSSProperties;
  bgColor?: string;
  bgColorHover?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const style: CSSProperties = { backgroundColor: hovered ? bgColorHover : bgColor };

  const content = (
    <>
      {item.iconUrl ? (
        <img src={item.iconUrl} alt="" className="mx-auto mb-2.5 h-11 w-11 object-contain" />
      ) : (
        <Icon icon={(item.icon as IconKey) ?? "mass"} className="mx-auto mb-2.5 h-11 w-11 text-secondary" />
      )}
      <div className="mb-1.5 font-heading font-bold" style={titleStyle}>
        {item.title}
      </div>
      <div className="mb-2 leading-tight" style={subtitleStyle}>
        {item.description}
      </div>
      <div className="font-body text-base text-secondary">→</div>
    </>
  );

  const className =
    "border-b border-r border-border px-4 pb-5 pt-6 text-center transition-colors";

  return isInternalRoute(item.href) ? (
    <Link
      to={item.href}
      className={className}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {content}
    </Link>
  ) : (
    <a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noreferrer" : undefined}
      className={className}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {content}
    </a>
  );
}

export function ShortAction() {
  const { shortActions } = useConfig();
  const { config, items } = shortActions;

  const titleStyle: CSSProperties = {
    fontFamily: config.titleFont ?? undefined,
    fontSize: config.titleSize ?? undefined,
    color: config.titleColor ?? undefined,
  };
  const subtitleStyle: CSSProperties = {
    fontFamily: config.subtitleFont ?? undefined,
    fontSize: config.subtitleSize ?? undefined,
    color: config.subtitleColor ?? undefined,
  };

  return (
    <div id="quicklinks" className="relative z-10 bg-white shadow-[0_4px_18px_rgba(13,30,53,.07)]">
      <div className="grid grid-cols-2 border-l border-t border-border sm:grid-cols-3 lg:grid-cols-6">
        {items.map((item) => (
          <ShortActionCard
            key={`short-action-${item.id}`}
            item={item}
            titleStyle={titleStyle}
            subtitleStyle={subtitleStyle}
            bgColor={config.bgColor ?? undefined}
            bgColorHover={config.bgColorHover ?? undefined}
          />
        ))}
      </div>
    </div>
  );
}
