import { useConfig } from "../../context/configHooks";
import { useFitsOneLine } from "../../hooks/useFitsOneLine";
import { SocialLinksRow } from "../SocialLinksRow";

export function TopBar() {
  const { contactAddresses, social } = useConfig();
  const { ref, fits } = useFitsOneLine<HTMLDivElement>();

  return (
    <div className="bg-primary font-body text-[0.8rem] text-white/70">
      <div
        ref={ref}
        aria-hidden={!fits}
        className={`mx-auto flex max-w-[1180px] flex-nowrap items-center justify-between gap-4 whitespace-nowrap px-6 ${fits ? "py-[7px]" : "invisible h-0 overflow-hidden py-0"}`}
      >
        <div className="flex items-center gap-4">
          <span>📍 {contactAddresses.address}</span>
          <a href={`tel:${contactAddresses.phone.replace(/\s+/g, "")}`} className="transition-colors hover:text-secondary">
            📞 {contactAddresses.phone}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[0.76rem] opacity-65">Znajdź nas:</span>
          <SocialLinksRow
            visibility={contactAddresses.social}
            links={social}
            className="flex items-center gap-2"
            iconClassName="flex h-[26px] w-[26px] items-center justify-center rounded bg-white/10 transition-colors hover:bg-secondary hover:text-primary"
          />
        </div>
      </div>
    </div>
  );
}
