import { useConfig } from "../../context/configHooks";
import type { InfoItem } from "../../types/config";

function InfoItemBlock({ item }: { item: InfoItem }) {
  const hasImage = Boolean(item.image);
  const hasProgress = item.progressValue !== null && Boolean(item.progressDescription);
  const hasInformation = Boolean(item.information?.trim());
  const hasRight = hasProgress || hasInformation;
  const progressPercent = hasProgress
    ? Math.min(100, Math.max(0, item.progressValue ?? 0))
    : 0;

  const gridColsClass =
    hasImage && hasRight
      ? "lg:grid-cols-[1fr_1.3fr_1fr]"
      : hasImage
        ? "lg:grid-cols-[1fr_1.3fr]"
        : hasRight
          ? "lg:grid-cols-[1fr_1fr]"
          : "lg:grid-cols-1";

  return (
    <div className={`grid items-center gap-11 ${gridColsClass}`}>
      <div>
        <h2 className="mb-3.5 font-heading text-2xl font-black leading-snug text-primary">{item.title}</h2>
        <p className="mb-3.5 font-body text-[0.86rem] font-semibold leading-relaxed text-ink">{item.shortInfo}</p>
        <div
          className="rich-content font-body text-[0.86rem] leading-relaxed text-ink-soft"
          dangerouslySetInnerHTML={{ __html: item.description }}
        />
      </div>

      {hasImage && (
        <div className="overflow-hidden rounded-lg shadow-[0_8px_32px_rgba(13,30,53,.14)]">
          <img src={item.image ?? ""} alt={item.title} className="h-[210px] w-full object-cover" />
        </div>
      )}

      {hasRight && (
        <div className="text-center">
          {hasProgress && (
            <>
              <div className="font-heading text-[3.4rem] font-black leading-none text-primary">
                {progressPercent}%
              </div>
              <div className="mb-3.5 font-body text-[0.78rem] text-ink-soft">
                {item.progressDescription}
              </div>
              <div className="mb-4 h-2.5 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-secondary to-secondary-light"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </>
          )}
          {hasInformation && (
            <div
              className="rich-content font-body text-[0.78rem] leading-relaxed text-ink-soft"
              dangerouslySetInnerHTML={{ __html: item.information ?? "" }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export function InfoExtra() {
  const { infoItems } = useConfig();

  if (infoItems.length === 0) {
    return null;
  }

  return (
    <section id="infoextra" className="border-t border-border bg-surface-muted py-16">
      <div className="mx-auto grid max-w-[1180px] gap-16 px-6">
        {infoItems.map((item) => (
          <InfoItemBlock key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
