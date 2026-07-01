import { Link } from "react-router-dom";
import { useConfig } from "../../context/configHooks";
import { SocialLinksRow } from "../SocialLinksRow";
import { isInternalRoute } from "../../utils/links";

const VIRTUAL_PARISH_URL_B64 =
  "aHR0cHM6Ly9hcGkucGFyYWZpYS1zemN6YWtvd2EucGwvc3pw";

export function Footer() {
  const { theme, contactAddresses, social, navbar, footer } = useConfig();

  return (
    <footer className="bg-primary text-white/70">
      <div className="px-6 py-12 md:py-14">
        <div className="mx-auto grid max-w-[1180px] gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <img
              src="/img/logo.jpg"
              alt={`Logo ${theme.title}`}
              className="mb-3 h-[46px] w-[46px] rounded-full border-2 border-secondary object-cover"
            />
            <p className="mb-3 font-heading text-[0.84rem] font-bold leading-snug text-white">
              {theme.title}
              <br />
              {theme.subtitle}
            </p>
            <div className="font-body text-[0.78rem] leading-[1.85]">
              {contactAddresses.address}
              <br />
              <a
                href={`tel:${contactAddresses.phone.replace(/\s+/g, "")}`}
                className="transition-colors hover:text-secondary"
              >
                {contactAddresses.phone}
              </a>
            </div>
            <SocialLinksRow
              visibility={contactAddresses.social}
              links={social}
              className="mt-3 flex gap-1.5"
              iconClassName="flex h-[29px] w-[29px] items-center justify-center rounded bg-white/10 transition-colors hover:bg-secondary hover:text-primary"
            />
          </div>

          <div>
            <h4 className="mb-3.5 font-body text-[0.74rem] font-bold uppercase tracking-wider text-white">
              Szybkie linki
            </h4>
            <ul className="space-y-1.5 font-body text-[0.8rem]">
              {navbar.items
                .filter((item) => item.href !== "/")
                .map((item) => (
                  <li key={`footer-nav-${item.id}`}>
                    {isInternalRoute(item.href) ? (
                      <Link
                        to={item.href}
                        className="transition-colors hover:text-secondary"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="transition-colors hover:text-secondary"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3.5 font-body text-[0.74rem] font-bold uppercase tracking-wider text-white">
              Godziny otwarcia kancelarii
            </h4>
            {footer.officeHours.map((row) => (
              <div
                key={`office-hour-${row.id}`}
                className="flex justify-between border-b border-white/10 py-1.5 font-body text-[0.78rem]"
              >
                <span>{row.day}</span>
                <span className="font-semibold text-white">{row.hours}</span>
              </div>
            ))}
            <p className="mt-2.5 font-body text-[0.72rem] text-white/50">
              {footer.officeNote}
            </p>
          </div>

          <div>
            <h4 className="mb-3.5 font-body text-[0.74rem] font-bold uppercase tracking-wider text-white">
              Znajdź nas na mapie
            </h4>
            <div className="h-[112px] overflow-hidden rounded-md">
              <iframe
                src={footer.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa dojazdu"
                className="h-full w-full border-0"
              />
            </div>
            <a
              href={footer.mapLink}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 font-body text-[0.78rem] font-semibold text-secondary transition-colors hover:text-secondary-light"
            >
              ZOBACZ DOJAZD →
            </a>
            <a
              href={atob(VIRTUAL_PARISH_URL_B64)}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="mt-2 block font-body text-[0.72rem] text-white/40 transition-colors hover:text-secondary"
            >
              wirtualna parafia
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-2 font-body text-[0.74rem] text-white/50">
          <span>{footer.copyrightText}</span>
          <div className="flex gap-3.5">
            {footer.legalLinks.map((link) => (
              isInternalRoute(link.href) ? (
                <Link
                  key={`legal-link-${link.id}`}
                  to={link.href}
                  className="transition-colors hover:text-secondary"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={`legal-link-${link.id}`}
                  href={link.href}
                  className="transition-colors hover:text-secondary"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
