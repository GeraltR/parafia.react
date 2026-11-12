import type { ContactAddresses } from "../../types/config";

type BankAccountsContact = Pick<
  ContactAddresses,
  | "nip"
  | "bankAccountNumber"
  | "bankName"
  | "additionalBankTitle"
  | "additionalBankNumber"
  | "additionalBankName"
  | "additionalBankIsActive"
>;

function BankAccount({ title, number, bankName }: { title: string; number: string; bankName: string | null }) {
  return (
    <div>
      <p className="font-semibold">{title}</p>
      <p>{number}</p>
      {bankName && <p>{bankName}</p>}
    </div>
  );
}

export function BankAccountsInfo({ contact }: { contact: BankAccountsContact }) {
  const showAdditional = contact.additionalBankIsActive && Boolean(contact.additionalBankNumber);

  if (!contact.nip && !contact.bankAccountNumber && !showAdditional) {
    return null;
  }

  return (
    <div className="grid gap-3 font-body text-[0.82rem] text-ink">
      {contact.nip && (
        <p>
          <span className="font-semibold">NIP:</span> {contact.nip}
        </p>
      )}
      {contact.bankAccountNumber && (
        <BankAccount
          title="Nr rachunku parafii:"
          number={contact.bankAccountNumber}
          bankName={contact.bankName}
        />
      )}
      {showAdditional && contact.additionalBankNumber && (
        <BankAccount
          title={
            contact.additionalBankTitle
              ? `${contact.additionalBankTitle.trim().replace(/:+$/, "")}:`
              : "Dodatkowy rachunek:"
          }
          number={contact.additionalBankNumber}
          bankName={contact.additionalBankName}
        />
      )}
    </div>
  );
}
