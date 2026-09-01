import { useEffect, useState, type FormEvent } from "react";

import { sendContactMessage } from "../../api/contactMessage";
import { ApiError } from "../../api/configClient";
import { useConfig } from "../../context/configHooks";
import { executeRecaptcha, loadRecaptchaScript } from "../../utils/recaptcha";

const FIELD_CLASSES =
  "w-full rounded border border-border px-3.5 py-2.5 font-body text-[0.86rem] text-ink outline-none transition-colors focus:border-primary";
const LABEL_CLASSES =
  "mb-1.5 block font-body text-[0.78rem] font-semibold text-ink";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;

function ContactInfoColumn() {
  const { footer, contactAddresses } = useConfig();

  return (
    <div>
      {footer && footer.officeHours.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-3.5 font-heading text-lg font-black text-primary">
            {footer.officeTitle}
          </h3>
          {footer.officeHours.map((row) => (
            <div
              key={`contact-office-hour-${row.id}`}
              className="flex justify-between border-b border-border py-1.5 font-body text-[0.82rem] text-ink"
            >
              <span>{row.day}</span>
              <span className="font-semibold">{row.hours}</span>
            </div>
          ))}
          {footer.officeNote && (
            <p className="mt-2.5 font-body text-[0.74rem] text-ink-soft">{footer.officeNote}</p>
          )}
        </div>
      )}

      <div className="mb-6">
        <h3 className="mb-2 font-heading text-lg font-black text-primary">Adres parafii</h3>
        <p className="font-body text-[0.86rem] text-ink">{contactAddresses.address}</p>
      </div>

      {(contactAddresses.nip || contactAddresses.bankAccountNumber) && (
        <div className="grid gap-1 font-body text-[0.82rem] text-ink">
          {contactAddresses.nip && (
            <p>
              <span className="font-semibold">NIP:</span> {contactAddresses.nip}
            </p>
          )}
          {contactAddresses.bankAccountNumber && (
            <p>
              <span className="font-semibold">Nr rachunku:</span> {contactAddresses.bankAccountNumber}
              {contactAddresses.bankName && ` (${contactAddresses.bankName})`}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function ContactFormFields() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (RECAPTCHA_SITE_KEY) {
      loadRecaptchaScript(RECAPTCHA_SITE_KEY).catch(() => {});
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!RECAPTCHA_SITE_KEY) {
      setStatus("error");
      setErrorMessage("Formularz jest chwilowo niedostępny.");
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    try {
      const recaptchaToken = await executeRecaptcha(RECAPTCHA_SITE_KEY, "contact_form");
      await sendContactMessage({ name, email, subject, message, recaptchaToken });
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof ApiError && error.status === 422
          ? "Sprawdź poprawność wypełnionych pól."
          : "Nie udało się wysłać wiadomości. Spróbuj ponownie później."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="contact-name" className={LABEL_CLASSES}>
          Imię i nazwisko
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={FIELD_CLASSES}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className={LABEL_CLASSES}>
          E-mail
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={FIELD_CLASSES}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded bg-primary py-3 font-body text-[0.82rem] font-bold uppercase tracking-wider text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
      >
        {status === "loading" ? "Wysyłanie…" : "Wyślij"}
      </button>

      {status === "success" && (
        <p className="text-center font-body text-[0.8rem] font-semibold text-green-700">
          Wiadomość została wysłana. Odpowiemy najszybciej, jak to możliwe.
        </p>
      )}
      {status === "error" && errorMessage && (
        <p className="text-center font-body text-[0.8rem] font-semibold text-red-600">
          {errorMessage}
        </p>
      )}

      <p className="text-center font-body text-[0.7rem] text-ink-soft">
        Ten formularz jest chroniony przez reCAPTCHA — obowiązują Polityka prywatności i Regulamin
        Google.
      </p>
    </form>
  );
}

export function ContactForm() {
  const { contactAddresses } = useConfig();

  return (
    <section id="kontakt" className="border-t border-border bg-white py-16">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-10 text-center">
          <h2 className="mb-2.5 font-heading text-2xl font-black text-primary">
            Napisz do nas
          </h2>
          <p className="mx-auto max-w-[640px] font-body text-[0.86rem] text-ink-soft">
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

        <div className="grid gap-11 lg:grid-cols-[1fr_2fr]">
          <ContactInfoColumn />
          <ContactFormFields />
        </div>
      </div>
    </section>
  );
}
