import { useConfig } from "../../context/configHooks";
import { formatEventDay, formatEventTime, formatIntentionDay, formatNewsDate } from "../../utils/dates";

function ColumnHeader({ title, showMoreLink }: { title: string; showMoreLink?: boolean }) {
  return (
    <div className="mb-5 flex items-baseline justify-between border-b-2 border-primary pb-2.5">
      <h2 className="font-heading text-[1.05rem] font-black tracking-tight text-primary">{title}</h2>
      {showMoreLink && (
        <a href="#" className="whitespace-nowrap font-body text-[0.72rem] font-bold tracking-wider text-secondary">
          ZOBACZ WSZYSTKIE →
        </a>
      )}
    </div>
  );
}

export function Articles() {
  const { events, news, massIntentions } = useConfig();

  return (
    <section id="aktualnosci" className="bg-white py-14">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid gap-9 md:grid-cols-3 md:gap-11">
          <div>
            <ColumnHeader title="Najbliższe wydarzenia" showMoreLink />
            {events.map((event) => {
              const { day, month } = formatEventDay(event.date);
              return (
                <div key={`event-${event.id}`} className="flex gap-3 border-b border-border py-3.5">
                  <div className="w-[50px] flex-shrink-0 rounded bg-primary px-1.5 py-1.5 text-center text-white">
                    <div className="font-heading text-[1.35rem] font-black leading-none">{day}</div>
                    <div className="mt-0.5 font-body text-[0.63rem] font-bold uppercase tracking-wider text-secondary-light">{month}</div>
                  </div>
                  <div>
                    <div className="mb-0.5 font-body text-[0.72rem] font-semibold text-secondary">{formatEventTime(event.date, event.time)}</div>
                    <h4 className="mb-0.5 font-heading text-[0.85rem] font-bold leading-snug text-primary">{event.title}</h4>
                    <p className="font-body text-[0.74rem] leading-snug text-ink-soft">{event.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <ColumnHeader title="Aktualności" showMoreLink />
            {news.map((item) => (
              <div key={`news-${item.id}`} className="flex gap-3 border-b border-border py-3.5">
                <div className="h-[60px] w-[82px] flex-shrink-0 overflow-hidden rounded">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="mb-0.5 font-body text-[0.7rem] font-semibold text-secondary">{formatNewsDate(item.date)}</div>
                  <h4 className="mb-0.5 font-heading text-[0.84rem] font-bold leading-snug text-primary">{item.title}</h4>
                  <p className="font-body text-[0.74rem] leading-snug text-ink-soft">{item.excerpt}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="mb-5 flex items-baseline justify-between border-b-2 border-primary pb-2.5">
              <h2 className="font-heading text-[1.05rem] font-black tracking-tight text-primary">Intencje mszalne</h2>
              <span className="font-body text-[0.72rem] text-ink-soft">Na ten tydzień</span>
            </div>
            <table className="w-full border-collapse font-body text-[0.78rem]">
              <tbody>
                {massIntentions.map((row) => (
                  <tr key={`mass-intention-${row.id}`} className="border-b border-border odd:bg-surface-muted">
                    <td className="whitespace-nowrap px-1 py-2 font-semibold text-ink-soft">{formatIntentionDay(row.date)}</td>
                    <td className="whitespace-nowrap px-2 py-2 font-bold text-secondary">{row.time}</td>
                    <td className="px-1 py-2 text-ink">{row.intention}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <a
              href="#"
              className="mt-3.5 block rounded bg-primary py-2.5 text-center font-body text-[0.76rem] font-bold uppercase tracking-wider text-white transition-colors hover:bg-primary-dark"
            >
              Zobacz wszystkie intencje
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
