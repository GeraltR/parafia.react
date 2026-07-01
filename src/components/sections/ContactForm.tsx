import { useConfig } from "../../context/configHooks";

const FIELD_CLASSES =
  "w-full rounded border border-border px-3.5 py-2.5 font-body text-[0.86rem] text-ink outline-none transition-colors focus:border-primary";
const LABEL_CLASSES =
  "mb-1.5 block font-body text-[0.78rem] font-semibold text-ink";

export function ContactForm() {
  const { contactAddresses } = useConfig();

  return (
    <section id="kontakt" className="border-t border-border bg-white py-16">
      <div className="mx-auto max-w-[640px] px-6">
        <div className="mb-8 text-center">
          <h2 className="mb-2.5 font-heading text-2xl font-black text-primary">
            Napisz do nas
          </h2>
          <p className="font-body text-[0.86rem] text-ink-soft">
            Masz pytanie lub sprawę do załatwienia? Wypełnij formularz —
            odpowiemy najszybciej, jak będzie to możliwe.
            {contactAddresses.phone && (
              <>
                {" "}
                Możesz też zadzwonić:{" "}
                <a
                  href={`tel:${contactAddresses.phone.replace(/\s+/g, "")}`}
                  className="font-semibold text-primary hover:text-secondary"
                >
                  {contactAddresses.phone}
                </a>
                .
              </>
            )}
          </p>
        </div>

        <form
          onSubmit={(event) => {
            // reCAPTCHA v3
            event.preventDefault();
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="contact-name" className={LABEL_CLASSES}>
              Imię i nazwisko
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              className={FIELD_CLASSES}
            />
          </div>

          <div>
            <label htmlFor="contact-subject" className={LABEL_CLASSES}>
              Temat
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              required
              className={FIELD_CLASSES}
            />
          </div>

          <div>
            <label htmlFor="contact-message" className={LABEL_CLASSES}>
              Wiadomość
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              required
              className={FIELD_CLASSES}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded bg-primary py-3 font-body text-[0.82rem] font-bold uppercase tracking-wider text-white transition-colors hover:bg-primary-dark"
          >
            Wyślij
          </button>

          <p className="text-center font-body text-[0.7rem] text-ink-soft">
            Formularz będzie zabezpieczony przez reCAPTCHA — wysyłka zostanie
            włączona wraz z uruchomieniem API.
          </p>
        </form>
      </div>
    </section>
  );
}
