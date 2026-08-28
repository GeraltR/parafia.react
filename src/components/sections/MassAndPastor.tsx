import type { CSSProperties } from "react";
import { useConfig } from "../../context/configHooks";
import { PriestAvatarIcon } from "../Icon/PriestAvatar";
import type { MassTime, Pastor } from "../../types/config";

function MassTimesList({ massTimes }: { massTimes: MassTime[] }) {
  return (
    <div className="h-full rounded-xl bg-white p-6 shadow-[0_2px_10px_rgba(13,30,53,.06)]">
      <h2 className="mb-5 font-heading text-[1.05rem] font-black tracking-tight text-primary">
        Msze Święte
      </h2>
      <div className="flex flex-col gap-5">
        {massTimes.map((massTime) => (
          <div key={massTime.id}>
            <div className="mb-1.5 font-heading text-sm font-bold text-primary">{massTime.label}</div>
            <div className="flex flex-wrap gap-1.5">
              {massTime.hours.split(",").map((hour) => (
                <span
                  key={hour}
                  className="rounded-md bg-primary px-2.5 py-1 font-body text-sm font-semibold text-white"
                >
                  {hour.trim()}
                </span>
              ))}
            </div>
            {massTime.note && (
              <p className="mt-1.5 font-body text-xs leading-snug text-ink-soft">{massTime.note}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PastorCard({
  pastor,
  positionStyle,
  nameStyle,
  className,
}: {
  pastor: Pastor;
  positionStyle: CSSProperties;
  nameStyle: CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl bg-white p-6 shadow-[0_2px_10px_rgba(13,30,53,.06)] ${className ?? ""}`}
    >
      <div style={positionStyle} className="mb-2 font-semibold tracking-wide text-secondary uppercase">
        {pastor.position}
      </div>
      <div className="mb-3 flex items-center gap-3">
        {pastor.photoUrl ? (
          <img
            src={pastor.photoUrl}
            alt={pastor.fullName}
            className="h-14 w-14 shrink-0 rounded-full object-cover"
          />
        ) : (
          <PriestAvatarIcon className="h-14 w-14 shrink-0 rounded-full bg-surface-muted p-2.5 text-secondary" />
        )}
        <div style={nameStyle} className="font-bold text-primary">
          {pastor.fullName}
        </div>
      </div>
      <div
        className="rich-content font-body text-sm text-ink-soft"
        dangerouslySetInnerHTML={{ __html: pastor.duties }}
      />
    </div>
  );
}

export function MassAndPastor() {
  const { massAndPastor } = useConfig();

  if (!massAndPastor) {
    return null;
  }

  const { config, massTimes, pastors } = massAndPastor;

  const positionStyle: CSSProperties = {
    fontFamily: config.positionFont ?? "var(--font-body)",
    fontSize: config.positionSize ?? "0.72rem",
    color: config.positionColor ?? undefined,
  };
  const nameStyle: CSSProperties = {
    fontFamily: config.nameFont ?? "var(--font-heading)",
    fontSize: config.nameSize ?? "0.95rem",
    color: config.nameColor ?? undefined,
  };

  const topRowPastors = pastors.length > 3 ? pastors.slice(0, 1) : pastors;
  const secondRowPastors = pastors.length > 3 ? pastors.slice(1) : [];

  if (massTimes.length === 0 && pastors.length === 0) {
    return null;
  }

  return (
    <section id="msze" className="bg-surface-muted py-14">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="lg:w-1/3">
            <MassTimesList massTimes={massTimes} />
          </div>
          <div className="flex flex-1 flex-col gap-6 sm:flex-row">
            {topRowPastors.map((pastor) => (
              <PastorCard
                key={pastor.id}
                pastor={pastor}
                positionStyle={positionStyle}
                nameStyle={nameStyle}
                className="flex-1"
              />
            ))}
          </div>
        </div>
        {secondRowPastors.length > 0 && (
          <div className="mt-6 flex flex-col gap-6 sm:flex-row">
            {secondRowPastors.map((pastor) => (
              <PastorCard
                key={pastor.id}
                pastor={pastor}
                positionStyle={positionStyle}
                nameStyle={nameStyle}
                className="flex-1"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
