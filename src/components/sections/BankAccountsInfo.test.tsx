import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BankAccountsInfo } from "./BankAccountsInfo";

const baseContact = {
  nip: "6320000000",
  bankAccountNumber: "12 3456 7890 1234 5678 9012 3456",
  bankName: "Bank Spółdzielczy",
  additionalBankTitle: "Taca inwestycyjna",
  additionalBankNumber: "98 7654 3210 9876 5432 1098 7654",
  additionalBankName: "Bank Drugi",
  additionalBankIsActive: true,
};

describe("BankAccountsInfo", () => {
  it("renders the parish account with its label, number and bank name", () => {
    render(<BankAccountsInfo contact={{ ...baseContact, additionalBankIsActive: false }} />);

    expect(screen.getByText("Nr rachunku parafii:")).toBeInTheDocument();
    expect(screen.getByText(baseContact.bankAccountNumber)).toBeInTheDocument();
    expect(screen.getByText(baseContact.bankName)).toBeInTheDocument();
  });

  it("renders the additional account when it is active", () => {
    render(<BankAccountsInfo contact={baseContact} />);

    expect(screen.getByText("Taca inwestycyjna:")).toBeInTheDocument();
    expect(screen.getByText(baseContact.additionalBankNumber)).toBeInTheDocument();
    expect(screen.getByText(baseContact.additionalBankName)).toBeInTheDocument();
  });

  it("hides the additional account when it is inactive", () => {
    render(<BankAccountsInfo contact={{ ...baseContact, additionalBankIsActive: false }} />);

    expect(screen.queryByText("Taca inwestycyjna:")).not.toBeInTheDocument();
    expect(screen.queryByText(baseContact.additionalBankNumber)).not.toBeInTheDocument();
  });

  it("hides the additional account when it is active but has no number", () => {
    render(<BankAccountsInfo contact={{ ...baseContact, additionalBankNumber: null }} />);

    expect(screen.queryByText("Taca inwestycyjna:")).not.toBeInTheDocument();
  });

  it("renders nothing when there is no NIP and no account to show", () => {
    const { container } = render(
      <BankAccountsInfo
        contact={{
          ...baseContact,
          nip: null,
          bankAccountNumber: null,
          additionalBankIsActive: false,
        }}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
