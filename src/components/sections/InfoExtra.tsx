import { useConfig } from "../../context/configHooks";

export function InfoExtra() {
  const { infoExtra } = useConfig();
  const [beforeImage, afterImage] = infoExtra.images;
  const progressPercent = Math.min(100, Math.max(0, infoExtra.progressPercent));

  return (
    <section id="infoextra" className="border-t border-border bg-surface-muted py-16">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid items-center gap-11 lg:grid-cols-[1fr_1.3fr_1fr]">
          <div>
            <h2 className="mb-3.5 font-heading text-2xl font-black leading-snug text-primary">{infoExtra.title}</h2>
            <p className="mb-5 font-body text-[0.86rem] leading-relaxed text-ink-soft">{infoExtra.description}</p>
            <a
              href={infoExtra.donationUrl}
              className="inline-block rounded bg-primary px-5 py-3 font-body text-[0.82rem] font-bold uppercase tracking-wider text-white transition-colors hover:bg-primary-dark"
            >
              Dowiedz się więcej
            </a>
          </div>

          {(beforeImage || afterImage) && (
            <div className={`grid gap-1 overflow-hidden rounded-lg shadow-[0_8px_32px_rgba(13,30,53,.14)] ${afterImage ? "grid-cols-2" : "grid-cols-1"}`}>
              {beforeImage && (
                <div className="relative h-[210px] overflow-hidden">
                  <img src={beforeImage} alt="Przed renowacją" className="h-full w-full object-cover" />
                  <span className="absolute left-2.5 top-2.5 rounded bg-primary/80 px-2.5 py-1 font-body text-[0.7rem] font-bold uppercase tracking-wider text-white">
                    PRZED
                  </span>
                </div>
              )}
              {afterImage && (
                <div className="relative h-[210px] overflow-hidden">
                  <img src={afterImage} alt="Po renowacji" className="h-full w-full object-cover" />
                  <span className="absolute left-2.5 top-2.5 rounded bg-primary/80 px-2.5 py-1 font-body text-[0.7rem] font-bold uppercase tracking-wider text-white">
                    PO
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="text-center">
            <div className="font-heading text-[3.4rem] font-black leading-none text-primary">{progressPercent}%</div>
            <div className="mb-3.5 font-body text-[0.78rem] text-ink-soft">Postęp prac renowacyjnych</div>
            <div className="mb-4 h-2.5 overflow-hidden rounded-full bg-border">
              <div className="h-full rounded-full bg-gradient-to-r from-secondary to-secondary-light" style={{ width: `${progressPercent}%` }} />
            </div>
            <p className="mb-1 font-body text-[0.78rem] text-ink-soft">Dziękujemy za każdą pomoc!</p>
            {infoExtra.bankAccount && (
              <p className="mb-4 font-body text-[0.72rem] font-semibold leading-relaxed text-ink">
                Nr konta parafialnego:
                <br />
                {infoExtra.bankAccount}
              </p>
            )}
            <a
              href={infoExtra.donationUrl}
              className="inline-flex items-center gap-1.5 rounded border-2 border-primary px-4 py-2.5 font-body text-[0.78rem] font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-white"
            >
              ♥ Wspieraj renowację
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
